import React, { useState } from 'react'

type PRModalProps = {
  label: string
  initialValue?: number
  onSave: (value: number) => void
  onClose: () => void
}

export default function PRModal({ label, initialValue, onSave, onClose }: PRModalProps) {
  const [value, setValue] = useState(initialValue?.toString() ?? '')

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
        <h2>{label}</h2>
        <p>Current PR: {initialValue ?? 'None'}</p>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={styles.input}
          placeholder="Enter reps or seconds"
        />
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
