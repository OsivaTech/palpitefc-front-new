export type GuessResponse = {
  id: number
  userId: number
  fixtureId: number
  homeTeam: {
    id: number
    goal: number
  }
  awayTeam: {
    id: number
    goal: number
  }
}
