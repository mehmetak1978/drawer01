import React, { useRef } from 'react';
import {
  ReactFlow,
  useReactFlow,
  Controls,
  Background,
} from '@xyflow/react';
import Circle from './Circle'; // This will be our custom node

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
}) => {
  const reactFlowWrapper = useRef(null);
  // useReactFlow hook needs to be used in a component that is a child of ReactFlowProvider.
  // Since we moved the provider to main.jsx, we can't use the hook here directly in Content.
  // A simple way to solve this is to keep the structure as it was, but this time I will ensure
  // I am actually removing the provider from Content and that the hook is called from a child.
  // The previous structure with FlowView was correct, I just failed to remove the provider from Content.
  // Let's try a slightly different structure. The main component will be the one using the hook.

  // The hook cannot be used in the same component that renders the provider.
  // So the structure in main.jsx is <Provider><App/></Provider>.
  // App renders Content. Content can now use the hook.

  const { screenToFlowPosition } = useReactFlow();

  const handleDrop = (event) => {
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
  };

  return (
    <div className="content" ref={reactFlowWrapper}>
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
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Content;
