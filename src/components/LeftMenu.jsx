import React from 'react';

const LeftMenu = ({ closeLeftMenu }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="left-menu">
      <div className="left-menu-header">
        <h3>Components</h3>
        <button onClick={closeLeftMenu} className="close-btn">&times;</button>
      </div>
      <p>Drag a circle to the canvas:</p>
      <div
        className="dnd-node"
        onDragStart={(event) => onDragStart(event, 'circle')}
        draggable
      >
        Circle
      </div>
    </div>
  );
};

export default LeftMenu;
