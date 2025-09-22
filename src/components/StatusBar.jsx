import React from 'react';

const StatusBar = ({ selectedNode }) => {
  return (
    <div className="status-bar">
      {selectedNode ? (
        <>
          <span>
            Size: {Math.round(selectedNode.width)}x{Math.round(selectedNode.height)}
          </span>
          <span style={{ marginLeft: '20px' }}>
            Position: ({Math.round(selectedNode.position.x)}, {Math.round(selectedNode.position.y)})
          </span>
        </>
      ) : (
        <span>No node selected</span>
      )}
    </div>
  );
};

export default StatusBar;
