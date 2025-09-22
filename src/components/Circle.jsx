import React, { useState } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';

const Circle = ({ data, selected }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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

      {isHovered && (
        <>
          {/* Target handles (for incoming connections) */}
          <Handle type="target" position={Position.Top} className="custom-handle" />
          <Handle type="target" position={Position.Right} className="custom-handle" />
          <Handle type="target" position={Position.Bottom} className="custom-handle" />
          <Handle type="target" position={Position.Left} className="custom-handle" />

          {/* Source handles (for outgoing connections) */}
          <Handle type="source" position={Position.Top} className="custom-handle" />
          <Handle type="source" position={Position.Right} className="custom-handle" />
          <Handle type="source" position={Position.Bottom} className="custom-handle" />
          <Handle type="source" position={Position.Left} className="custom-handle" />
        </>
      )}
    </div>
  );
};

export default Circle;
