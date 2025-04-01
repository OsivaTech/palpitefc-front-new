'use client'

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
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { LEAGUE_CATEGORY, MATCH_STATUS } from '@/constants'
import Image from 'next/image'
import { DatePicker } from '@/components/date-picker'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { CustomButton } from '@/components/custom-button'

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
  const [selectedLeague, setSelectedLeague] = useState('todos')
  const nacionais = fixtures?.[LEAGUE_CATEGORY.BRASIL]
  const internacionais = fixtures?.[LEAGUE_CATEGORY.INTERNATIONAL]
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const router = useRouter()

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
        .filter((fixture: Fixture) => {
          if (selectedLeague === 'todos') {
            return true
          }
          return fixture.league.name === selectedLeague
        })
    })
  }

  useEffect(() => {
    // Update URL with selected date when it changes
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd')
      const url = new URLSearchParams()
      url.set('date', formattedDate)
      router.push(`?${url.toString()}`)
    } else {
      // Remove date parameter if no date is selected
      const url = new URLSearchParams()
      url.delete('date')
      router.push(`?${url.toString()}`)
    }
  }, [selectedDate, router])

  const nacionaisFilteredFixtures = filterFixtures(nacionais?.leagues ?? {})
  const internacionaisFilteredFixtures = filterFixtures(
    internacionais?.leagues ?? {},
  )

  const handleLiveFilter = () => {
    setLiveFilter(!liveFilter)
  }

  return (
    <>
      <div className="flex flex-col md:flex-row mt-10 mx-2 items-center gap-4 pb-4">
        <div className="flex w-full gap-4 items-center lg:justify-evenly">
          <div className="bg-white/10 border border-app-secondary rounded-lg p-2 h-[40px] flex items-center gap-2 w-1/2">
            <Search className="w-4 h-4 text-white" />
            <Input
              placeholder="Pesquisar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-white placeholder:text-white/70 border-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-full"
            />
          </div>
          <div className="w-1/2 text-center">
            <Select
              onValueChange={(value) => setSelectedLeague(value)}
              value={selectedLeague}
            >
              <SelectTrigger className="bg-white/10 border border-app-secondary rounded-lg p-4 h-[40px] flex items-center gap-2">
                <SelectValue placeholder="Campeonatos" />
              </SelectTrigger>
              <SelectContent className="bg-app-background">
                <SelectItem value={'todos'}>Todos</SelectItem>
                {leagues.map((league) => (
                  <SelectItem key={league.id} value={league.name}>
                    {league.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex w-full items-center gap-2">
          <CustomButton
            variant={liveFilter ? 'secondary' : 'primary'}
            className="bg-white/10 h-[40px]"
            onClick={handleLiveFilter}
          >
            {t('live')}
          </CustomButton>
          <DatePicker
            placeholder="Selecione uma data"
            selected={selectedDate}
            onSelect={(date) => setSelectedDate(date ?? null)}
          />
        </div>
      </div>

      {nacionaisFilteredFixtures &&
        nacionaisFilteredFixtures.some((fixture) => fixture.length > 0) && (
          <div className="text-app-background text-lg bg-app-secondary w-full pl-4 py-1 flex items-center gap-2 my-6">
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
              <div className="text-white text-lg bg-[#0087D521]/10 w-full pl-4 py-1 flex items-center gap-2 max-h-[36px]">
                <Image
                  src={fixture[0]?.league.image}
                  alt="Internacionais"
                  width={24}
                  height={24}
                  className="stroke-app-background fill-app-background"
                />
                {fixture[0]?.league.name}
              </div>
            )}
            {fixture.length > 0 && (
              <div className="flex gap-2 overflow-x-auto py-4 pl-4">
                {fixture.map((fixture: Fixture) => (
                  <MatchCard
                    key={fixture.id}
                    fixture={fixture}
                    guess={guess ?? []}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      {internacionaisFilteredFixtures &&
        internacionaisFilteredFixtures.some(
          (fixture) => fixture.length > 0,
        ) && (
          <div className="text-app-background text-lg bg-app-secondary w-full pl-4 py-1 flex items-center gap-2 my-6">
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
              <div className="text-white text-lg bg-[#0087D521]/10 w-full pl-4 py-1 flex items-center gap-2 max-h-[36px]">
                <Image
                  src={fixture[0]?.league.image}
                  alt="Internacionais"
                  width={24}
                  height={24}
                  className="stroke-app-background fill-app-background"
                />
                {fixture[0]?.league.name}
              </div>
            )}
            {fixture.length > 0 && (
              <div className="flex gap-2 overflow-x-auto py-4 pl-4">
                {fixture.map((fixture: Fixture) => (
                  <MatchCard
                    key={fixture.id}
                    fixture={fixture}
                    guess={guess ?? []}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
    </>
  )
}
