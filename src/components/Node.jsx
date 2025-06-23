import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import useNodeStore from '../store/nodestore';

function Node({ node, isSelected }) {
  const selectNode = useNodeStore((state) => state.selectNode);
  const updateNode = useNodeStore((state) => state.updateNode);

  const nodeRef = useRef(null);

  const handleStop = (e, data) => {
    updateNode(node.id, { x: data.x, y: data.y });
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
        }}
      >
        {node.title || 'Untitled'}
      </div>
    </Draggable>
  );
}

export default Node;
