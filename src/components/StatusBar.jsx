import React from 'react';

const StatusBar = ({ selectedNode }) => {
  return (
    <div className="status-bar">
      {selectedNode ? (
        <>
          <span>
            Selected: {selectedNode.id}
          </span>
          <span style={{ marginLeft: '20px' }}>
            Size: {selectedNode.width ? `${Math.round(selectedNode.width)}x${Math.round(selectedNode.height)}` : 'auto'}
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
