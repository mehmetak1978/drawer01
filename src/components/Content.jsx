import React, { useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useReactFlow,
  Controls,
  Background,
} from '@xyflow/react';
import Circle from './Circle'; // This will be our custom node

const nodeTypes = {
  circle: Circle,
};

// Wrapper component to use the useReactFlow hook
const FlowView = ({
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
  const { screenToFlowPosition } = useReactFlow();

  // We need to modify the onDrop handler in App.jsx to use the screenToFlowPosition function.
  // This requires a bit of a refactor. I'll pass the function up.
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
    // The onDrop function now needs to accept the position
    onDrop(type, position);
  };

  return (
    <div
      className="reactflow-wrapper"
      ref={reactFlowWrapper}
      style={{ width: '100%', height: '100%' }}
    >
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

const Content = (props) => {
  return (
    <div className="content">
      <ReactFlowProvider>
        <FlowView {...props} />
      </ReactFlowProvider>
    </div>
  );
};

export default Content;
