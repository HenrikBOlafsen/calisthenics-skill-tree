import React from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { getMasteryLevel, MasteryThresholds } from './data/progressLevels'

const masteryColors = {
  locked: '#fff',
  bronze: '#cd7f32',
  silver: '#c0c0c0',
  gold: '#d4af37',
  diamond: '#9AC5DB',
}

type SkillNodeData = {
  id: string
  label: string
  thresholds: MasteryThresholds
  imageUrl?: string
  repsOrSeconds?: number
}

const CustomNode: React.FC<NodeProps<SkillNodeData>> = ({ data }) => {

  const level = getMasteryLevel(data.repsOrSeconds, data.thresholds)

  const borderColor = masteryColors[level]

  return (
    <div
      style={{
        padding: 10,
        border: `5px solid ${borderColor}`,
        borderRadius: 8,
        backgroundColor: 'white',
        color: '#111',
        fontWeight: 'bold',
        minWidth: 120,
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div style={{ marginBottom: 6 }}>{data.label}</div>
  
      {data.imageUrl && (
        <img
          src={data.imageUrl}
          alt={data.label}
          style={{ borderRadius: 6, objectFit: 'cover', maxHeight: 100 }}
        />
      )}
  
      <Handle
        type="source"
        position={Position.Top}
        style={{ opacity: 0 }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        style={{ opacity: 0 }}
      />
    </div>
  )  
}

export default CustomNode
