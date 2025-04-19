import React from 'react'
import { NodeProps } from 'reactflow'

type SkillNodeData = {
  label: string
  // Add more properties later like level, videoId, etc.
}

const CustomNode: React.FC<NodeProps<SkillNodeData>> = ({ data }) => {
  return (
    <div
      style={{
        padding: 10,
        border: '2px solid #333',
        borderRadius: 8,
        backgroundColor: 'white',
        color: '#111',
        fontWeight: 'bold',
        minWidth: 120,
        textAlign: 'center',
      }}
    >
      {data.label}
    </div>
  )
}

export default CustomNode
