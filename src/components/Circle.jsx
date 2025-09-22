import React from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';

const Circle = ({ data, selected }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <NodeResizer isVisible={selected} minWidth={50} minHeight={50} />
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#aaddff',
          border: `2px solid ${selected ? '#007bff' : '#1a192b'}`,
          borderRadius: '50%',
        }}
      />
      <Handle type="source" position={Position.Top} style={{ top: '-5px' }} />
      <Handle type="source" position={Position.Right} style={{ right: '-5px' }}/>
      <Handle type="source" position={Position.Bottom} style={{ bottom: '-5px' }}/>
      <Handle type="source" position={Position.Left} style={{ left: '-5px' }}/>
    </div>
  );
};

export default Circle;
