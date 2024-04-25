import { Match } from "@/shared/types/Match"

export type Fixture = {
    id: number
    name: string
    start: string
    leagueId: number
    finished: boolean
    homeTeam: Match
    awayTeam: Match
}