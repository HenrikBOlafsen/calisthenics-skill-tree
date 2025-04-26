import React from 'react'
import { useReactFlow, Node } from 'reactflow'

type Props = {
  favoriteIds: string[]
  nodes: Node[]
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
  onClose: () => void
}

export default function FavoritesPanel({ favoriteIds, nodes, setNodes, onClose }: Props) {
  const { setCenter } = useReactFlow()

  // Build and sort favorite nodes by label
  const favoriteNodes = favoriteIds
    .map((id) => nodes.find((n) => n.id === id))
    .filter((n): n is Node => !!n) // filter out undefined
    .sort((a, b) => a.data.label.localeCompare(b.data.label))

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: 200,
      background: '#222',
      color: 'white',
      padding: 12,
      overflowY: 'auto',
      zIndex: 999,
    }}>
      <h4>⭐ Favorites</h4>
      <button onClick={onClose} style={{ marginBottom: 10 }}>Close</button>
      {favoriteNodes.map((node) => (
        <div key={node.id} style={{ marginBottom: 8 }}>
          <button
            onClick={() => {
              setCenter(node.position.x, node.position.y, {
                zoom: 1.2,
                duration: 800,
              })
              setNodes((nds) =>
                nds.map((n) =>
                  n.id === node.id ? { ...n, selected: true } : { ...n, selected: false }
                )
              )
            }}
            style={{
              background: '#444',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              padding: '4px 8px',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
            }}
          >
            {node.data.label}
          </button>
        </div>
      ))}
    </div>
  )
}
