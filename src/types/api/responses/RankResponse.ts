export interface Info {
  leagueId?: number
  year?: number
  month?: number
}

export interface Place {
  id: number
  place: number
  name: string
  teamId: number
  points: number
  guesses: number
}

export interface RankingResponse {
  type: string
  info: Info
  placings: Place[]
  yourPlace: Place
}
