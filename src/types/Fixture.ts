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
}
