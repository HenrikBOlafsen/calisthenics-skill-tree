export function getStoredPRs(): Record<string, number> {
  return JSON.parse(localStorage.getItem('skillTreePRs') || '{}')
}

export function setStoredPR(id: string, value: number) {
  const current = getStoredPRs()
  current[id] = value
  localStorage.setItem('skillTreePRs', JSON.stringify(current))
}
