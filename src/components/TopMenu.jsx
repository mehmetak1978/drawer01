import React from 'react';

const TopMenu = ({ toggleLeftMenu }) => {
  return (
    <div className="top-menu">
      <h1>React Flow Drawer</h1>
      <button onClick={toggleLeftMenu}>Menu</button>
    </div>
  );
};

export default TopMenu;
