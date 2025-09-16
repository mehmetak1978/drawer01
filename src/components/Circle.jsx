import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { Resizable } from 're-resizable';

const ItemTypes = {
  CIRCLE: 'circle',
};

const Circle = ({ id, top, left, width, height, onSelectCircle, updateCircle, linkingState, startLinking }) => {
  const isTemplate = top === undefined || left === undefined;
  const [isHovered, setIsHovered] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CIRCLE,
    item: isTemplate ? { type: 'new-circle' } : { id, top, left, width, height, type: 'existing-circle' },
    canDrag: !isResizing,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleClick = (e) => {
    e.stopPropagation();
    const direction = e.target.dataset.direction;
    if (direction) {
      startLinking(id, direction);
      return;
    }

    if (!isTemplate && onSelectCircle) {
      onSelectCircle({ id, top, left, width, height });
    }
  };

  if (isTemplate) {
    return (
      <div
        ref={drag}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'lightblue',
          border: '1px solid blue',
          margin: '10px',
          cursor: 'grab',
          opacity: isDragging ? 0.5 : 1,
        }}>
      </div>
    );
  }

  const style = {
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
    width: `${width}px`,
    height: `${height}px`,
    opacity: isDragging ? 0.5 : 1,
    cursor: linkingState ? 'crosshair' : 'move',
    zIndex: isHovered || isDragging ? 10 : 1,
  };

  const elementRef = useRef(null);
  drag(elementRef);

  return (
    <div
      ref={elementRef}
      style={style}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Resizable
        size={{ width, height }}
        onResizeStart={() => setIsResizing(true)}
        onResizeStop={(e, direction, ref, d) => {
          setIsResizing(false);
          updateCircle(id, {
            width: width + d.width,
            height: height + d.height,
          });
        }}
        lockAspectRatio={true}
        style={{
          background: isHovered ? '#aaddff' : 'lightblue',
          borderRadius: '50%',
          border: linkingState && linkingState.sourceId === id ? '2px dashed #000' : '1px solid blue',
          width: '100%',
          height: '100%',
        }}
      >
        <div style={{ width: '100%', height: '100%', borderRadius: '50%' }}></div>
      </Resizable>
      {isHovered && !linkingState && (
        <>
          <div className="arrow top" data-direction="top"></div>
          <div className="arrow right" data-direction="right"></div>
          <div className="arrow bottom" data-direction="bottom"></div>
          <div className="arrow left" data-direction="left"></div>
        </>
      )}
    </div>
  );
};

export default Circle;
