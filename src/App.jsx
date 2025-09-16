import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TopMenu from './components/TopMenu';
import LeftMenu from './components/LeftMenu';
import Content from './components/Content';
import StatusBar from './components/StatusBar';
import './App.css';

function App() {
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(true); // Open by default for now
  const [circles, setCircles] = useState([]);
  const [selectedCircle, setSelectedCircle] = useState(null);

  const toggleLeftMenu = () => {
    setIsLeftMenuOpen(!isLeftMenuOpen);
  };

  const addCircle = (item, left, top) => {
    const newCircle = {
      ...item,
      id: Date.now(),
      left,
      top,
      width: 100,
      height: 100,
    };
    setCircles(prev => [...prev, newCircle]);
  };

  const updateCircle = (id, newProps) => {
    setCircles(prev => prev.map(c => c.id === id ? { ...c, ...newProps } : c));
  };

  const [links, setLinks] = useState([]);
  const [linkingState, setLinkingState] = useState(null); // { sourceId, sourceDirection }

  const handleSelectCircle = (circle) => {
    if (linkingState) {
      completeLinking(linkingState.sourceId, linkingState.sourceDirection, circle.id);
    } else {
      setSelectedCircle(circle);
    }
  };

  const startLinking = (sourceId, sourceDirection) => {
    setLinkingState({ sourceId, sourceDirection });
  };

  const completeLinking = (sourceId, sourceDirection, targetId) => {
    if (sourceId === targetId) {
      setLinkingState(null);
      return; // Prevent linking to self
    }
    const newLink = {
      id: `link-${Date.now()}`,
      source: { id: sourceId, direction: sourceDirection },
      target: { id: targetId },
    };
    setLinks(prev => [...prev, newLink]);
    setLinkingState(null);
  };

  const cancelLinking = () => {
    setLinkingState(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <TopMenu toggleLeftMenu={toggleLeftMenu} />
        <div className="main-container">
          {isLeftMenuOpen && <LeftMenu closeLeftMenu={toggleLeftMenu} />}
          <Content
            circles={circles}
            addCircle={addCircle}
            updateCircle={updateCircle}
            onSelectCircle={handleSelectCircle}
            links={links}
            linkingState={linkingState}
            startLinking={startLinking}
            cancelLinking={cancelLinking}
          />
        </div>
        <StatusBar selectedCircle={selectedCircle} />
      </div>
    </DndProvider>
  );
}

export default App;
