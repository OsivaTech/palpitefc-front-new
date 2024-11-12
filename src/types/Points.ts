export type Team = {
  id: number
  goals: number
  name?: string // Opcional, pois não está presente em todos os objetos Team
  image?: string // Opcional, pelo mesmo motivo acima
}

export type Fixture = {
  id: number
  name: string
  start: string // ou Date, se você estiver trabalhando com objetos Date
  leagueId: number
  finished: boolean
  homeTeam: Team
  awayTeam: Team
}

export type League = {
  id: number
  name: string
  image: string
}

export type Guess = {
  id: number
  userId: number
  fixtureId: number
  homeTeam: Omit<Team, 'name' | 'image'> // Omitindo 'name' e 'image', pois não estão presentes
  awayTeam: Omit<Team, 'name' | 'image'>
}

export type PointType = {
  code: string
  description: string
}

export type Point = {
  value: number
  type: PointType
}

export type Points = {
  guess: Guess
  fixture: Fixture
  league: League
  points: Point[]
}
