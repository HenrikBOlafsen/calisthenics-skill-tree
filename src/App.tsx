import ReactFlow from 'reactflow'
import 'reactflow/dist/style.css'
import { nodes, edges } from './data/skillTree'
import CustomNode from './CustomNode'


const nodeTypes = {
  custom: CustomNode,
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      />
    </div>
  )
}

export default App
