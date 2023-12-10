import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';

const initialNodes: Node[] = []; // initial nodes
const initialEdges: Edge[] = []; // initial edges

const DiagramWindow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [newNodeName, setNewNodeName] = useState(`Node ${nodes.length + 1}`);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const addNode = useCallback(() => {
    const newNode: Node = {
      id: uuidv4(),
      data: { label: newNodeName || `Node ${nodes.length + 1}` },
      position: reactFlowInstance ? reactFlowInstance.project({ x: 100, y: 100 }) : { x: 100, y: 100 },
    };
    setNodes((nds) => nds.concat(newNode));
    setNewNodeName(`Node ${nodes.length + 2}`);
  }, [newNodeName, nodes, setNodes, reactFlowInstance]);

  const onLoad = useCallback((rfi: ReactFlowInstance) => {
    setReactFlowInstance(rfi);
  }, []);

  const deleteNode = useCallback(() => {
    const selectedNodes = nodes.filter((node) => node.selected);
    const newNodes = nodes.filter((node) => !node.selected);
    setNodes(newNodes);
    // Remove edges connected to the deleted nodes
    const connectedEdges = edges.filter((edge) =>
      selectedNodes.some((node) => edge.source === node.id || edge.target === node.id)
    );
    setEdges((eds) => eds.filter((edge) => !connectedEdges.includes(edge)));
  }, [nodes, edges, setNodes, setEdges]);

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <input
          value={newNodeName}
          onChange={(e) => setNewNodeName(e.target.value)}
          placeholder="Enter node name"
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
        />
        <button
          onClick={addNode}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
        >
          Add Node
        </button>
        <button
          onClick={deleteNode}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded ml-2"
        >
          Delete Node
        </button>
      </div>
      <div className="reactflow-wrapper" style={{ height: 800 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onLoad={onLoad}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default DiagramWindow;
