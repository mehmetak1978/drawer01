import React from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';

const Circle = ({ data, selected }) => {
  return (
    <>
      <NodeResizer isVisible={selected} minWidth={50} minHeight={50} />
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#aaddff',
          border: `1px solid ${selected ? '#007bff' : '#1a192b'}`,
          borderRadius: '50%',
        }}
      >
        <Handle type="source" position={Position.Top} />
        <Handle type="source" position={Position.Right} />
        <Handle type="source" position={Position.Bottom} />
        <Handle type="source" position={Position.Left} />
      </div>
    </>
  );
};

export default Circle;
