export type PointsResponse = {
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
