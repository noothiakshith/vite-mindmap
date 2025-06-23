import React, { useRef } from 'react';
import useNodeStore from '../store/nodestore';
import Node from './Node';

function Canvas() {
  const allNodes = useNodeStore((state) => state.nodes);
  const selectedNodeId = useNodeStore((state) => state.selectedNodeId);
  const addNode = useNodeStore((state) => state.addNode);

  // ➕ Add a node at fixed position for drag testing
  const handleAddClick = () => {
    addNode('Draggable Node', 100, 100);
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden select-none">
      {/* Add Button */}
      <button
        onClick={handleAddClick}
        className="absolute top-4 left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded shadow"
      >
        + Add Node
      </button>

      {/* Render All Nodes */}
      {allNodes.map((node) => (
        <Node
          key={node.id}
          node={node}
          isSelected={selectedNodeId === node.id}
        />
      ))}

      {/* Info */}
      <p className="absolute bottom-4 left-4 z-50 bg-white text-sm p-2 rounded shadow">
        Click the button, then drag the node around
      </p>
    </div>
  );
}

export default Canvas;
