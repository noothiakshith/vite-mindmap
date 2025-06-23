import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import useNodeStore from '../store/nodestore';

function Node({ node, isSelected }) {
  const selectNode = useNodeStore((state) => state.selectNode);
  const updateNode = useNodeStore((state) => state.updateNode);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(node.title);
  const nodeRef = useRef(null);

  // When drag ends, update position
  const handleStop = (e, data) => {
    updateNode(node.id, { x: data.x, y: data.y });
  };

  // Double click to edit
  const handleDoubleClick = () => {
    setName(node.title); // load current title
    setIsEditing(true);
  };

  // Input handlers
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      finishEditing();
    }
  };

  const handleBlur = () => {
    finishEditing();
  };

  // Save title change
  const finishEditing = () => {
    const trimmed = name.trim();
    if (trimmed !== '') {
      updateNode(node.id, { title: trimmed });
    }
    setIsEditing(false);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x: node.x, y: node.y }}
      onStart={() => selectNode(node.id)}
      onStop={handleStop}
    >
      <div
        ref={nodeRef}
        onDoubleClick={handleDoubleClick}
        style={{
          position: 'absolute',
          minWidth: '180px',
          minHeight: '80px',
          padding: '16px',
          background: isSelected
            ? 'linear-gradient(to bottom right, #3b82f6, #60a5fa)'
            : 'linear-gradient(to bottom right, #ffffff, #f3f4f6)',
          color: isSelected ? '#ffffff' : '#111827',
          fontSize: '16px',
          fontWeight: 500,
          textAlign: 'center',
          borderRadius: '12px',
          border: `2px solid ${isSelected ? '#2563eb' : '#d1d5db'}`,
          boxShadow: isSelected
            ? '0 6px 20px rgba(59, 130, 246, 0.3)'
            : '0 4px 16px rgba(0, 0, 0, 0.1)',
          userSelect: 'none',
          cursor: 'move',
          transition: 'all 0.25s ease',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        ) : (
          node.title || 'Untitled'
        )}
      </div>
    </Draggable>
  );
}

export default Node;
