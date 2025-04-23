export type MasteryThresholds = {
  bronze: number
  silver: number
  gold: number
  diamond: number
}

type MasteryLevel = 'locked' | 'bronze' | 'silver' | 'gold' | 'diamond'

export const masteryLevels: Record<string, MasteryThresholds> = {
  'Push-Up': { bronze: 1, silver: 5, gold: 10, diamond: 20 },
  'Diamond Push-Up': { bronze: 1, silver: 3, gold: 6, diamond: 12 },
  'Decline Push-Up': { bronze: 1, silver: 4, gold: 8, diamond: 15 },
}


export function getMasteryLevel(value: number | undefined, thresholds: any): MasteryLevel {
  if (value === undefined || !thresholds) return 'locked'

  if (value >= thresholds.diamond) return 'diamond'
  if (value >= thresholds.gold) return 'gold'
  if (value >= thresholds.silver) return 'silver'
  if (value >= thresholds.bronze) return 'bronze'

  return 'locked'
}
