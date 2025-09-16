import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { Resizable } from 're-resizable';

const ItemTypes = {
  CIRCLE: 'circle',
};

const Circle = ({ id, top, left, width, height, onSelectCircle, updateCircle, linkingState, startLinking }) => {
  const isTemplate = top === undefined || left === undefined;
  const [isHovered, setIsHovered] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CIRCLE,
    item: isTemplate ? { type: 'new-circle' } : { id, top, left, width, height, type: 'existing-circle' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isTemplate && onSelectCircle) {
      onSelectCircle({ id, top, left, width, height });
    }
  };

  const handleArrowClick = (e, direction) => {
    e.stopPropagation();
    startLinking(id, direction);
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
        onResizeStop={(e, direction, ref, d) => {
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
          <div className="arrow top" onClick={(e) => handleArrowClick(e, 'top')}></div>
          <div className="arrow right" onClick={(e) => handleArrowClick(e, 'right')}></div>
          <div className="arrow bottom" onClick={(e) => handleArrowClick(e, 'bottom')}></div>
          <div className="arrow left" onClick={(e) => handleArrowClick(e, 'left')}></div>
        </>
      )}
    </div>
  );
};

export default Circle;
