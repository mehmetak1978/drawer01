import React, { useCallback } from 'react';
import {
  ReactFlow,
  useReactFlow,
  Controls,
  Background,
} from '@xyflow/react';
import Circle from './Circle';

const nodeTypes = {
  circle: Circle,
};

const Content = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onDrop,
  onDragOver,
  edgeTypes,
}) => {
  const { screenToFlowPosition } = useReactFlow();

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      onDrop(type, position);
    },
    [screenToFlowPosition, onDrop],
  );

  return (
    <div className="content">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onDrop={handleDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Content;
