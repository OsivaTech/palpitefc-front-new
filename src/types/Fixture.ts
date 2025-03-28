import { LEAGUE_CATEGORY } from '@/constants'
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
  statusHumanized: string
}

export type FixturesByLeague = {
  [leagueId: number]: {
    leagueName: string
    fixtures: FixtureResponse
  }
}

export type FixtureByLeagueCategory = {
  [LEAGUE_CATEGORY.BRASIL]: {
    leagueDescription: string
    leagues: FixturesByLeague
  }
  [LEAGUE_CATEGORY.INTERNATIONAL]: {
    leagueDescription: string
    leagues: FixturesByLeague
  }
}
