import React from 'react';

const TopMenu = ({ toggleLeftMenu }) => {
  return (
    <div className="top-menu">
      <h1>React Drawer App</h1>
      <button onClick={toggleLeftMenu}>Menu</button>
    </div>
  );
};

export default TopMenu;
