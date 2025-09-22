import React from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';

const handleStyle = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  border: '1px solid white',
};

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
      {/* Target handles (for incoming connections) */}
      <Handle type="target" position={Position.Top} style={{ ...handleStyle, background: '#555' }} />
      <Handle type="target" position={Position.Right} style={{ ...handleStyle, background: '#555' }}/>
      <Handle type="target" position={Position.Bottom} style={{ ...handleStyle, background: '#555' }}/>
      <Handle type="target" position={Position.Left} style={{ ...handleStyle, background: '#555' }}/>

      {/* Source handles (for outgoing connections) */}
      <Handle type="source" position={Position.Top} style={{ ...handleStyle, background: 'white', top: '-5px' }} />
      <Handle type="source" position={Position.Right} style={{ ...handleStyle, background: 'white', right: '-5px' }}/>
      <Handle type="source" position={Position.Bottom} style={{ ...handleStyle, background: 'white', bottom: '-5px' }}/>
      <Handle type="source" position={Position.Left} style={{ ...handleStyle, background: 'white', left: '-5px' }}/>
    </div>
  );
};

export default Circle;
