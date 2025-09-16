import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import Circle from './Circle';

const ItemTypes = {
  CIRCLE: 'circle',
};

const getLinkEndpoint = (circle, direction) => {
  const { left, top, width, height } = circle;
  const cx = left + width / 2;
  const cy = top + height / 2;

  switch (direction) {
    case 'top': return { x: cx, y: top };
    case 'right': return { x: left + width, y: cy };
    case 'bottom': return { x: cx, y: top + height };
    case 'left': return { x: left, y: cy };
    default: return { x: cx, y: cy }; // Center for target
  }
};

const Content = ({ circles, addCircle, updateCircle, onSelectCircle, links, linkingState, startLinking, cancelLinking }) => {
  const ref = useRef(null);

  const handleContentClick = () => {
    if (linkingState) {
      cancelLinking();
    }
  };

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CIRCLE,
    drop: (item, monitor) => {
      const contentRect = ref.current?.getBoundingClientRect();
      if (!contentRect) return;

      if (item.type === 'new-circle') {
        const clientOffset = monitor.getClientOffset();
        const left = Math.round(clientOffset.x - contentRect.left);
        const top = Math.round(clientOffset.y - contentRect.top);
        addCircle(item, left, top);
      } else if (item.type === 'existing-circle') {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        updateCircle(item.id, { left, top });
      }
    },
  }));

  drop(ref);

  return (
    <div ref={ref} className="content" style={{ position: 'relative', flex: 1 }} onClick={handleContentClick}>
      {circles && circles.map(circle => (
        <Circle
          key={circle.id}
          {...circle}
          updateCircle={updateCircle}
          onSelectCircle={onSelectCircle}
          linkingState={linkingState}
          startLinking={startLinking}
        />
      ))}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
          </marker>
        </defs>
        {links.map(link => {
          const sourceCircle = circles.find(c => c.id === link.source.id);
          const targetCircle = circles.find(c => c.id === link.target.id);
          if (!sourceCircle || !targetCircle) return null;

          const startPos = getLinkEndpoint(sourceCircle, link.source.direction);
          const endPos = getLinkEndpoint(targetCircle, 'center');

          return (
            <line
              key={link.id}
              x1={startPos.x} y1={startPos.y}
              x2={endPos.x} y2={endPos.y}
              stroke="black"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default Content;
