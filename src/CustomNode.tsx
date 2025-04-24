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

  const metalShadows: Record<typeof level, string | undefined> = {
    locked: undefined,
    bronze: '0 0 8px #cd7f32, inset 0 0 4px #8a4b1f',
    silver: '0 0 8px #c0c0c0, inset 0 0 4px #888',
    gold:   '0 0 8px #ffd700, inset 0 0 4px #b8860b',
    diamond:'0 0 12px #9AC5DB, inset 0 0 6px #5cc5f9',
  }

  const masteryGradients: Record<string, string | undefined> = {
    bronze: 'linear-gradient(45deg, #8d5524, #cd7f32, #a0522d)',
    silver: 'linear-gradient(45deg, #aaa, #eee, #bbb)',
    gold:   'linear-gradient(45deg,rgb(212, 186, 37),rgb(189, 156, 27), #ffea70)',
    diamond:'linear-gradient(45deg, #aeeaff, #e0ffff, #9AC5DB)',
    locked: undefined,
  }
  
  const borderColor = masteryColors[level]
  const boxShadow = metalShadows[level]

  return (
    <div style={{ margin: -3 }}>
      <div
        style={{
          padding: 10,
          border: `5px solid ${borderColor}`,
          borderRadius: 8,
          background: masteryGradients[level]
          ? `${masteryGradients[level]}, white`
          : 'white',
        backgroundOrigin: 'border-box',
        backgroundClip: masteryGradients[level]
          ? 'padding-box, border-box'
          : 'border-box',
          color: '#111',
          fontWeight: 'bold',
          minWidth: 120,
          maxWidth: 170,
          textAlign: 'center',
          position: 'relative',
          boxShadow,
          transition: 'box-shadow 0.3s ease-in-out',
          overflow: 'hidden',
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
    
      </div>

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
