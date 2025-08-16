interface PlayerStats {
  [key: string]: number
  timeTaken: number
  kills: number
  attacks: number
  attacksHit: number
  damageTaken: number
  damageDealt: number
}

export const $playerStats: PlayerStats = {
  timeTaken: 0,
  kills: 0,
  attacks: 0,
  attacksHit: 0,
  damageTaken: 0,
  damageDealt: 0
}
