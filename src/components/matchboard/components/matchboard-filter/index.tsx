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
import {
  Fixture,
  FixtureByLeagueCategory,
  FixturesByLeague,
} from '@/types/Fixture'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { LEAGUE_CATEGORY, MATCH_STATUS } from '@/constants'
import Image from 'next/image'

export const MatchboardFilterAndFixtures = ({
  leagues,
  fixtures,
  guess,
}: {
  leagues: League[]
  fixtures: FixtureByLeagueCategory | null
  guess: Guess[] | null
}) => {
  const [search, setSearch] = useState('')
  const t = useTranslations('common')
  const [liveFilter, setLiveFilter] = useState(false)

  const nacionais = fixtures?.[LEAGUE_CATEGORY.BRASIL]
  const internacionais = fixtures?.[LEAGUE_CATEGORY.INTERNATIONAL]

  const filterFixtures = (fixtures: FixturesByLeague) => {
    return Object.keys(fixtures).map((league) => {
      return fixtures[parseInt(league)].fixtures
        .filter((fixture: Fixture) => {
          return (
            fixture.homeTeam.name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            fixture.awayTeam.name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            fixture.league.name.toLowerCase().includes(search.toLowerCase())
          )
        })
        .filter((fixture: Fixture) => {
          if (liveFilter) {
            return MATCH_STATUS.IN_PLAY.includes(fixture.status)
          }
          return true
        })
    })
  }

  const nacionaisFilteredFixtures = filterFixtures(nacionais?.leagues)
  const internacionaisFilteredFixtures = filterFixtures(internacionais?.leagues)

  const handleLiveFilter = () => {
    setLiveFilter(!liveFilter)
  }

  return (
    <>
      <div className="flex flex-col md:flex-row mt-10 ml-4 items-center space-x-4 pb-4">
        <div className="bg-white/10 border border-app-secondary rounded-lg p-2 h-[40px] flex items-center gap-2 lg:w-[400px]">
          <Search className="w-4 h-4 text-white" />
          <Input
            placeholder="Pesquisar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent  text-white placeholder:text-white border-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-full"
          />
        </div>
        <Button
          variant={liveFilter ? 'secondary' : 'primary'}
          className="bg-white/10"
          onClick={handleLiveFilter}
        >
          {t('live')}
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

      {nacionaisFilteredFixtures && nacionaisFilteredFixtures.length !== 0 && (
        <div className="text-app-background text-lg bg-app-secondary w-full pl-4 py-1 flex items-center gap-2">
          <div className="h-[24px] w-[24px] rounded-full flex items-center justify-center">
            <Image
              src="/assets/brasil.svg"
              alt="Nacionais"
              width={24}
              height={24}
            />
          </div>
          {nacionais?.leagueDescription}
        </div>
      )}
      {/* Fixtures Nacionais */}
      {nacionaisFilteredFixtures &&
        nacionaisFilteredFixtures.map((fixture: Fixture[]) => (
          <div key={fixture[0]?.league.id}>
            {fixture.length !== 0 && (
              <div className="text-white text-lg bg-[#0087D521]/10 w-full pl-4 py-1">
                {fixture[0]?.league.name}
              </div>
            )}
            <div className="flex gap-2 overflow-x-auto py-4 pl-4">
              {fixture.map((fixture: Fixture) => (
                <MatchCard
                  key={fixture.id}
                  fixture={fixture}
                  guess={guess ?? []}
                />
              ))}
            </div>
          </div>
        ))}
      {nacionaisFilteredFixtures && nacionaisFilteredFixtures.length === 0 && (
        <div className="text-app-background text-lg bg-app-secondary w-full pl-4 py-1 flex items-center gap-2">
          <div className="h-[24px] w-[24px] rounded-full flex items-center justify-center">
            <Image
              src="/assets/internacional.svg"
              alt="Internacionais"
              width={24}
              height={24}
              className="stroke-app-background fill-app-background"
            />
          </div>
          {internacionais?.leagueDescription}
        </div>
      )}
      {/* Fixtures Internacionais */}
      {internacionaisFilteredFixtures &&
        internacionaisFilteredFixtures.map((fixture: Fixture[]) => (
          <div key={fixture[0]?.league.id}>
            {fixture.length !== 0 && (
              <div className="text-white text-lg bg-[#0087D521]/10 w-full pl-4 py-1">
                {fixture[0]?.league.name}
              </div>
            )}
            <div className="flex gap-2 overflow-x-auto py-4 pl-4">
              {fixture.map((fixture: Fixture) => (
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
