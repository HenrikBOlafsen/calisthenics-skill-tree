export const nodes = [
    {
      id: 'pushup',
      position: { x: 0, y: 0 },
      data: { label: 'Push-Up' },
      type: 'default'
    },
    {
      id: 'diamond_pushup',
      position: { x: 250, y: 100 },
      data: { label: 'Diamond Push-Up' },
      type: 'default'
    },
    {
      id: 'decline_pushup',
      position: { x: 250, y: -100 },
      data: { label: 'Decline Push-Up' },
      type: 'default'
    }
]
  
export const edges = [
    {
        id: 'e1',
        source: 'pushup',
        target: 'diamond_pushup',
        markerEnd: {
        type: 'arrowclosed',
        },
    },
    {
        id: 'e2',
        source: 'pushup',
        target: 'decline_pushup',
        markerEnd: {
        type: 'arrowclosed',
        },
    },
]
  
  