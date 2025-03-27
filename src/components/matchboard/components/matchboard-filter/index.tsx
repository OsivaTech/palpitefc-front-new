'use client'

import { Button } from '@/components/ui/button'
import {
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  Select,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { League } from '@/types/League'
import { MatchCard } from '@/components/match-card'
import { Guess } from '@/types/Guess'
import { FixturesByLeague } from '@/types/Fixture'
import { useState } from 'react'

export const MatchboardFilterAndFixtures = ({
  leagues,
  fixtures,
  guess,
}: {
  leagues: League[]
  fixtures: FixturesByLeague | null
  guess: Guess[] | null
}) => {
  const [search, setSearch] = useState('')
  const [live, setLive] = useState(false)
  const [league, setLeague] = useState<League | null>(null)

  const filteredFixtures =
    fixtures &&
    Object.keys(fixtures).map((league) => {
      return fixtures[parseInt(league)].fixtures.filter((fixture) => {
        return (
          fixture.homeTeam.name.toLowerCase().includes(search.toLowerCase()) ||
          fixture.awayTeam.name.toLowerCase().includes(search.toLowerCase()) ||
          fixture.league.name.toLowerCase().includes(search.toLowerCase())
        )
      })
    })

  return (
    <>
      <div className="flex mt-10 ml-4 items-center space-x-4 pb-4">
        <div className="bg-white/10 border border-app-secondary rounded-lg p-2 h-[40px] flex items-center gap-2 lg:w-[400px]">
          <Search className="w-4 h-4 text-white" />
          <Input
            placeholder="Pesquisar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent  text-white placeholder:text-white border-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-full"
          />
        </div>
        <Button variant="primary" className="bg-white/10 ">
          Ao Vivo
        </Button>
        <Select>
          <SelectTrigger className="bg-white/10 border border-app-secondary rounded-lg p-2 h-[40px] flex items-center gap-2 lg:w-[400px]">
            <SelectValue placeholder="Campeonatos" />
          </SelectTrigger>
          <SelectContent className="bg-app-background">
            {leagues.map((league) => (
              <SelectItem key={league.id} value={league.name}>
                {league.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Fixtures */}
      {filteredFixtures &&
        filteredFixtures.map((fixture) => (
          <div key={fixture[0]?.league.id}>
            {fixture.length !== 0 && (
              <div className="text-white text-lg bg-[#0087D521]/10 w-full pl-4 py-1">
                {fixture[0]?.league.name}
              </div>
            )}
            <div className="flex gap-2 overflow-x-auto py-4 pl-4">
              {fixture.map((fixture) => (
                <MatchCard
                  key={fixture.id}
                  fixture={fixture}
                  guess={guess ?? []}
                />
              ))}
            </div>
          </div>
        ))}
    </>
  )
}
