import { useCallback, useState } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  NodeChange,
  EdgeChange,
  MarkerType
} from 'reactflow'
import 'reactflow/dist/style.css'
import CustomNode from './CustomNode'
import PRModal from './PRModal'
import DevNodeEditorModal from './DevNodeEditorModal'
import { getStoredPRs, setStoredPR } from './utils/storage'
import skillTreeDataRaw from './data/skillTreeData.json'


const devMode = false

const nodeTypes = {
  custom: CustomNode,
}

export default function App() {

  const storedPRs = getStoredPRs()
  
  const [nodes, setNodes] = useState<Node[]>(() =>
    skillTreeDataRaw.nodes.map((node) => ({
      ...node,
      type: 'custom',
      data: {
        ...node.data,
        id: node.id, // restore data.id here only in memory
        repsOrSeconds: storedPRs[node.id] ?? undefined,
      },
    }))
  )
  
  const [edges, setEdges] = useState<Edge[]>(() =>
    skillTreeDataRaw.edges.map((edge) => ({
      ...edge,
      type: 'default',
      markerEnd: { type: MarkerType.ArrowClosed, width: 25, height: 25 },
    }))
  )
  

  const [modalNode, setModalNode] = useState<Node | null>(null)

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )



  const handleSavePR = (value: number) => {
    if (!modalNode) return
    setStoredPR(modalNode.id, value)
    setNodes((nds) =>
      nds.map((n) =>
        n.id === modalNode.id
          ? { ...n, data: { ...n.data, repsOrSeconds: value } }
          : n
      )
    )
  }

  const getNextNodeId = (): string => {
    const existingIds = nodes.map((n) => n.id)
    let index = 1
    while (existingIds.includes(`new_node_${index}`)) {
      index++
    }
    return `new_node_${index}`
  }

  const handleAddNode = () => {
    const id = getNextNodeId()
    const label = id.replace(/_/g, ' ') // e.g. "New Node 4"
  
    const newNode: Node = {
      id,
      type: 'custom',
      position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 },
      data: {
        id,
        label,
      },
    }
  
    setNodes((prev) => [...prev, newNode])
  }
  

  const [editingNode, setEditingNode] = useState<Node | null>(null)



  const handleExport = () => {
    const cleanNodes = nodes.map(({ id, position, data }) => ({
      id,
      position,
      data: {
        label: data.label,
        imageUrl: data.imageUrl,
        thresholds: data.thresholds,
      },
    }))
  
    const cleanEdges = edges.map(({ id, source, target }) => ({
      id,
      source,
      target,
    }))
  
    const exportData = JSON.stringify({ nodes: cleanNodes, edges: cleanEdges }, null, 2)
    const blob = new Blob([exportData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'skilltree.json'
    a.click()
    URL.revokeObjectURL(url)
  }
  

  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          onNodesChange={devMode ? handleNodesChange : undefined}
          onEdgesChange={devMode ? handleEdgesChange : undefined}
          onConnect={
            devMode
              ? (params) => setEdges((eds) => addEdge(params, eds))
              : undefined
          }
          onNodeClick={(_, node) => {
            if (devMode) {
              setEditingNode(node)
            } else {
              setModalNode(node)
            }
          }}
        />

        {modalNode && (
          <PRModal
            label={modalNode.data.label}
            initialValue={modalNode.data.repsOrSeconds}
            onSave={handleSavePR}
            onClose={() => setModalNode(null)}
          />
        )}

        {editingNode && devMode && (
          <DevNodeEditorModal
            node={editingNode}
            onClose={() => setEditingNode(null)}
            onSave={(updatedNode) => {
              setNodes((nodes) =>
                nodes.map((n) => (n.id === updatedNode.id ? updatedNode : n))
              )
            }}
            onDelete={() => {
              // Remove node
              setNodes((nodes) => nodes.filter((n) => n.id !== editingNode.id))
              // Remove related edges
              setEdges((edges) =>
                edges.filter(
                  (e) => e.source !== editingNode.id && e.target !== editingNode.id
                )
              )
              // Close modal
              setEditingNode(null)
            }}
          />
        )}



        {devMode && (
          <button
            onClick={handleExport}
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              padding: '10px 16px',
              fontSize: 14,
              borderRadius: 6,
              backgroundColor: '#00bcd4',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 6px rgba(0,0,0,0.2)',
            }}
          >
            Export Skill Tree JSON
          </button>
        )}

        {devMode && (
          <button
            onClick={handleAddNode}
            style={{
              position: 'absolute',
              bottom: 60,
              left: 20,
              padding: '10px 16px',
              fontSize: 14,
              borderRadius: 6,
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 6px rgba(0,0,0,0.2)',
            }}
          >
            ➕ Add Node
          </button>
        )}

      </div>
    </ReactFlowProvider>
  )
}
