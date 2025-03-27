import { FixtureResponse } from '@/types/api/responses/FixtureResponse'
import { League } from '@/types/League'
import { Match } from '@/types/Match'

export type Fixture = {
  id: number
  name: string
  start: string
  league: League
  finished: boolean
  homeTeam: Match
  awayTeam: Match
  status: string
}

export type FixturesByLeague = {
  [leagueId: number]: {
    leagueName: string
    fixtures: FixtureResponse
  }
}
