import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';

const useNodeStore = create((set) => ({
  // 📦 State
  nodes: [],
  selectedNodeId: '',

  // ➕ Add Node
  addNode: (title, x, y) =>
    set((state) => {
      console.log("Adding node:", title, x, y);
      const newNode = {
        id: uuidv4(),
        title,
        x,
        y,
      };
      const updatedNodes = [...state.nodes, newNode];
      console.log("New node list:", updatedNodes);
      return { nodes: updatedNodes };
    }),

  // ❌ Remove Node
  removeNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((el) => el.id !== id),
    })),

  // 🔄 Update Node
  updateNode: (id, updatedInfo) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, ...updatedInfo } : node
      ),
    })),

  // 🎯 Select Node
  selectNode: (id) =>
    set(() => ({
      selectedNodeId: id,
    })),

  // 🚫 Deselect Node
  deselectNode: () =>
    set(() => ({
      selectedNodeId: '',
    })),
}));

export default useNodeStore;
