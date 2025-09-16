import React from 'react';
import Circle from './Circle';

const LeftMenu = ({ closeLeftMenu }) => {
  return (
    <div className="left-menu">
      <div className="left-menu-header">
        <h3>Components</h3>
        <button onClick={closeLeftMenu} className="close-btn">&times;</button>
      </div>
      <p>Drag a circle to the canvas:</p>
      <Circle />
    </div>
  );
};

export default LeftMenu;
