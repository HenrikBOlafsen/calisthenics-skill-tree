import React, { useState } from 'react'
import { Node } from 'reactflow'
import {MasteryThresholds} from "./data/progressLevels"
import { imageOptions } from './utils/imageList'

type DevModalProps = {
  node: Node
  onSave: (updatedNode: Node) => void
  onClose: () => void
  onDelete: () => void
}


export default function DevNodeEditorModal({ node, onSave, onClose, onDelete }: DevModalProps) {
  const [label, setLabel] = useState(node.data.label || '')
  const [thresholds, setThresholds] = useState(
    node.data.thresholds || {
      bronze: 1,
      silver: 3,
      gold: 5,
      diamond: 10,
    }
  )
  
  const sortedImages = [...imageOptions].sort((a, b) => a.name.localeCompare(b.name))

  const [selectedImageName, setSelectedImageName] = useState(
    node.data.imageUrl
      ? sortedImages.find((img) => img.url === node.data.imageUrl)?.name ?? ''
      : ''
  )

  const selectedImageUrl = sortedImages.find((img) => img.name === selectedImageName)?.url



  const handleThresholdChange = (level: keyof typeof thresholds, value: string) => {
    const num = parseFloat(value)
    if (!isNaN(num)) {
      setThresholds((prev: MasteryThresholds) => ({ ...prev, [level]: num }))
    }
  }

  const handleSubmit = () => {
    const updatedNode: Node = {
      ...node,
      data: {
        ...node.data,
        label,
        imageUrl: selectedImageUrl ?? '',
        thresholds,
      },
    }    
    onSave(updatedNode)
    onClose()
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Edit Node</h2>

        <label>Label:</label>
        <input value={label} onChange={(e) => setLabel(e.target.value)} style={styles.input} />

        <label>Image:</label>
        <input
          type="text"
          value={selectedImageName}
          onChange={(e) => setSelectedImageName(e.target.value)}
          list="image-suggestions"
          style={styles.input}
        />
        <datalist id="image-suggestions">
          {sortedImages.map((img) => (
            <option key={img.name} value={img.name}>{img.url}</option>
          ))}
        </datalist>
        
        {selectedImageUrl && (
          <img src={selectedImageUrl} alt="preview" style={{ width: '50%', maxHeight: 80, marginTop: 8 }} />
        )}
        
        <br />

        <label>Thresholds:</label>
        {['bronze', 'silver', 'gold', 'diamond'].map((level) => (
          <div key={level}>
            <label>{level}: </label>
            <input
              type="number"
              value={thresholds[level as keyof typeof thresholds]}
              onChange={(e) => handleThresholdChange(level as keyof typeof thresholds, e.target.value)}
              style={styles.input}
            />
          </div>
        ))}

        <div style={{ marginTop: 20 }}>
          <button onClick={handleSubmit} style={styles.save}>Save</button>
          <button onClick={onClose} style={styles.cancel}>Cancel</button>
          <button onClick={onDelete} style={styles.delete}>🗑️ Delete</button>
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
    width: 300,
    textAlign: 'left',
  },
  input: {
    width: '60%',
    marginBottom: 8,
    padding: 6,
    fontSize: 14,
  },
  save: {
    padding: '8px 14px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    marginRight: 10,
  },
  cancel: {
    padding: '8px 14px',
    backgroundColor: '#aaa',
    color: 'white',
    border: 'none',
    borderRadius: 6,
  },
  delete: {
    padding: '8px 14px',
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    marginTop: 10,
    width: '100%',
  },
}
