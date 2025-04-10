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
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { LEAGUE_CATEGORY, MATCH_STATUS } from '@/constants'
import Image from 'next/image'
import { DatePicker } from '@/components/date-picker'
import { format, parseISO } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'
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
  const [previousDate, setPreviousDate] = useState<Date | null>(new Date())
  const router = useRouter()
  const today = new Date().toDateString()
  const searchParams = useSearchParams()
  const queryDate = searchParams.get('date')
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    queryDate ? parseISO(queryDate) : new Date(),
  )
  const isLiveButtonDisabled = selectedDate?.toDateString() !== today

  const filterFixtures = (fixtures: FixturesByLeague) => {
    return Object.keys(fixtures).map((league) => {
      return fixtures[parseInt(league)].fixtures
        .filter((fixture: Fixture) => {
          // Filtra pelo texto de busca
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
          // Filtra pelo status "Ao Vivo"
          if (liveFilter) {
            return MATCH_STATUS.IN_PLAY.includes(fixture.status)
          }
          return true
        })
        .filter((fixture: Fixture) => {
          // Filtra pelo campeonato selecionado
          if (selectedLeague === 'todos') {
            return true
          }
          return fixture.league.name === selectedLeague
        })
        .filter((fixture: Fixture) => {
          // Filtra pela data selecionada
          if (selectedDate) {
            const fixtureDate = new Date(fixture.start).toDateString()
            const selectedDateString = selectedDate.toDateString()
            return fixtureDate === selectedDateString
          }
          return true
        })
    })
  }

  const nacionaisFilteredFixtures = filterFixtures(nacionais?.leagues ?? {})
  const internacionaisFilteredFixtures = filterFixtures(
    internacionais?.leagues ?? {},
  )

  const handleLiveFilter = () => {
    if (!liveFilter) {
      // Armazena a data atual antes de ativar o filtro "Ao Vivo"
      setPreviousDate(selectedDate)
      // setSelectedDate(null)
    } else {
      // Restaura a data anterior ao desativar o filtro "Ao Vivo"
      setSelectedDate(previousDate)
    }
    setLiveFilter(!liveFilter)
  }

  const handleDateChange = (date: Date | null) => {
    liveFilter && setLiveFilter(false) // Desativa o filtro "Ao Vivo" ao selecionar uma data
    setSelectedDate(date)
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd')
      router.push(`?date=${formattedDate}`)
    } else {
      router.push('?') // Remove the date query parameter if no date is selected
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row mt-10 mx-2 items-center gap-4 pb-4">
        <div className="flex w-full gap-4 items-center lg:justify-evenly">
          <div className="bg-white/10 border border-app-secondary rounded-lg p-4 h-[40px] flex items-center gap-1 w-1/2">
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
              <SelectContent className="bg-app-background max-w-[300px]">
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
            className="bg-white/10 h-[40px] lg:max-w-[100px]"
            onClick={handleLiveFilter}
            disabled={isLiveButtonDisabled} // Desativa o botão se a data selecionada não for hoje
          >
            {t('live')}
          </CustomButton>
          <DatePicker
            // disabled={liveFilter}
            placeholder="Selecione uma data"
            selected={selectedDate}
            onSelect={(date) => handleDateChange(date ?? null)}
          />
        </div>
      </div>

      {nacionaisFilteredFixtures.every((fixture) => fixture.length === 0) &&
        internacionaisFilteredFixtures.every(
          (fixture) => fixture.length === 0,
        ) && (
          <div className="text-center text-white mt-6">
            Nenhuma partida encontrada.
          </div>
        )}

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
              <div className="flex gap-2 overflow-x-auto py-4 px-2 ">
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
              <div className="flex gap-2 overflow-x-auto py-4 px-2">
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
