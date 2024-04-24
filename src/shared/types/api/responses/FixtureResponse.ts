import { MatchResponse } from "./MatchResponse"

export type FixtureResponse = {
    id: number
    name: string
    start: string
    leagueId: number
    finished: boolean
    homeTeam: MatchResponse
    awayTeam: MatchResponse
}