import React, { useState } from 'react'
import { Node } from 'reactflow'
import { SkillNodeData } from './CustomNode'

type PRModalProps = {
  node: Node<SkillNodeData>
  favoriteIds: string[]
  toggleFavorite: (id: string) => void
  onSave: (value: number) => void
  onClose: () => void
}

export default function PRModal({ node, favoriteIds, toggleFavorite, onSave, onClose }: PRModalProps) {
  const [value, setValue] = useState(node.data.repsOrSeconds?.toString() ?? '')

  const handleSubmit = () => {
    const parsed = parseFloat(value)
    if (!isNaN(parsed)) {
      onSave(parsed)
      onClose()
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>



        <h2>{node.data.label}</h2>
        <p>Current PR: {node.data.repsOrSeconds ?? 'None'}</p>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={styles.input}
          placeholder="Enter reps or seconds"
        />

        <button
          onClick={() => toggleFavorite(node.id)}
          style={{
            background: 'none',
            color: favoriteIds.includes(node.id) ? '#FFD700' : 'white',
            fontSize: 36,
            border: 'none',
            padding: "0px 7px 4px 7px",
            cursor: 'pointer',
            marginBottom: 0,
            marginTop: -13,
          }}
        >
          ★
        </button>

        {(node.data.links ?? []).length > 0 && (
          <div style={{ marginBottom: 30 }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: 14 }}>Learn this move:</h4>
            <div style={{ fontSize: 14, lineHeight: 1.3 }}>
              {(node.data.links ?? []).map((url, i) => (
                <span key={i}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#90caf9', textDecoration: 'underline' }}
                  >
                    Link {i + 1}
                  </a>
                  {i < (node.data.links?.length ?? 0) - 1 && ', '}
                </span>
              ))}
            </div>
          </div>
        )}

        

        <div style={styles.buttons}>
          <button onClick={handleSubmit} style={styles.button}>Save</button>
          <button onClick={onClose} style={{ ...styles.button, backgroundColor: '#ccc' }}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'grey',
    padding: 20,
    borderRadius: 12,
    maxWidth: 300,
    textAlign: 'center',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
  },
  input: {
    width: '80%',
    marginTop: 10,
    marginBottom: 15,
    padding: 8,
    fontSize: 16,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    margin: '0 5px',
    padding: '8px 12px',
    fontSize: 14,
    cursor: 'pointer',
    backgroundColor: '#00bcd4',
    color: 'white',
    border: 'none',
    borderRadius: 6,
  },
}
