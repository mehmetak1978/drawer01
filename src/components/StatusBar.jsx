import React from 'react';

const StatusBar = ({ selectedCircle }) => {
  return (
    <div className="status-bar">
      {selectedCircle ? (
        <>
          <span>Size: {selectedCircle.width}x{selectedCircle.height}</span>
          <span style={{ marginLeft: '20px' }}>Position: ({selectedCircle.left}, {selectedCircle.top})</span>
        </>
      ) : (
        <span>No circle selected</span>
      )}
    </div>
  );
};

export default StatusBar;
