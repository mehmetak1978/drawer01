import React, { useState, useCallback, useMemo } from 'react';
import {
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import TopMenu from './components/TopMenu';
import LeftMenu from './components/LeftMenu';
import Content from './components/Content';
import StatusBar from './components/StatusBar';
import CustomEdge from './components/CustomEdge';

const initialNodes = [];

const edgeTypes = {
  custom: CustomEdge,
};

function App() {
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'custom' }, eds)),
    [setEdges],
  );

  const toggleLeftMenu = () => {
    setIsLeftMenuOpen(!isLeftMenuOpen);
  };

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  let id = 0;
  const getId = () => `dndnode_${id++}`;

  const onDrop = useCallback(
    (type, position) => {
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
        // Custom nodes need explicit size
        style: { width: 100, height: 100 },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="app">
      <TopMenu toggleLeftMenu={toggleLeftMenu} />
      <div className="main-container">
        {isLeftMenuOpen && <LeftMenu closeLeftMenu={toggleLeftMenu} />}
        <Content
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          edgeTypes={edgeTypes}
        />
      </div>
      <StatusBar selectedNode={selectedNode} />
    </div>
  );
}

export default App;
