'use client'
import { useAuth } from '@/context/useAuth'
import { League } from '@/types/League'
import { CalendarDays, Search } from 'lucide-react'
import { mothersMock } from '../../mocks/mothersMock'
import { APP_LINKS, POINT_TYPE } from '@/constants'
import { useEffect, useState, useRef } from 'react'
import { useLocale } from 'next-intl'
import { useSearchParams, useRouter } from 'next/navigation'
import { formatDate } from '@/utils/formatDate'
import { ResultCard } from '../result-card'
import { Points } from '@/types/Points'
import { Input } from '@/components/ui/input'
import { CustomButton } from '@/components/custom-button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useToast } from '@/components/ui/use-toast' // Importa o hook useToast

type MyPointsPageProps = {
  leagues: League[]
  points: Points[] | null
}

const MyPointsPage = ({ points }: MyPointsPageProps) => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const locale = useLocale()
  const searchParams = useSearchParams()
  const fixtureId = searchParams.get('fixtureId') // Lê o parâmetro "fixtureId" da URL
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}) // Referências para os cards
  const { toast } = useToast() // Usa o hook useToast

  const [filterMonths, setFilterMonths] = useState({
    selectedMoths: (new Date().getMonth() + 1).toString(),
    hasFilter: true,
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [isAnnualFilter, setIsAnnualFilter] = useState(false)
  const [uniqueDates, setUniqueDates] = useState<string[]>()
  const [pointsFilter, setPointsFilter] = useState<Points[] | null>(points)
  const [totalPoints, setTotalPoints] = useState<number>(0)
  const [selectedLeague, setSelectedLeague] = useState('todos')

  const functionFilterPoints = () => {
    const filteredPoints =
      points?.filter((point: Points) => point.points.length > 0) || []

    const leagueFilteredPoints =
      selectedLeague === 'todos'
        ? filteredPoints
        : filteredPoints.filter(
            (point: Points) => point.league.name === selectedLeague,
          )

    const dateFilteredPoints = isAnnualFilter
      ? leagueFilteredPoints
      : leagueFilteredPoints.filter(
          (point: Points) =>
            new Date(point.fixture.start).getMonth() + 1 ===
            Number(filterMonths.selectedMoths),
        )

    const searchFilteredPoints = dateFilteredPoints.filter(
      (point: Points) =>
        point.fixture.homeTeam.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        point.fixture.awayTeam.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        point.league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        point.points.some((p) =>
          POINT_TYPE[p.type.code]
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        ),
    )

    const dates = searchFilteredPoints.map((point: Points) =>
      formatDate(point.fixture.start, 'yyyy-MM-dd'),
    )

    const uniqueDates = Array.from(new Set(dates))

    const totalPointsSum = searchFilteredPoints
      ?.filter(
        (point: Points) =>
          point.points.length > 0 &&
          uniqueDates.includes(formatDate(point.fixture.start, 'yyyy-MM-dd')),
      )
      .map((point: Points) => {
        return point.points.reduce(
          (acc, currentValue) => acc + currentValue.value,
          0,
        )
      })
      .reduce((acc, currentTotalPoints) => acc + currentTotalPoints, 0)

    setPointsFilter(searchFilteredPoints)
    setUniqueDates(uniqueDates)
    setTotalPoints(totalPointsSum)
  }

  useEffect(() => {
    functionFilterPoints()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterMonths, searchTerm, isAnnualFilter, selectedLeague])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/${APP_LINKS.SIGNIN()}`)
    }
  }, [isAuthenticated, locale, router])

  // Rola para o card correspondente ao fixtureId
  useEffect(() => {
    if (fixtureId && pointsFilter) {
      if (cardRefs.current[fixtureId]) {
        // Rola para o card correspondente ao fixtureId
        cardRefs.current[fixtureId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      } else {
        // Verifica se o fixtureId existe no pointsFilter
        const fixtureExists = pointsFilter.some(
          (point) => point.fixture.id === Number(fixtureId),
        )

        if (!fixtureExists) {
          // Exibe o toast se o fixtureId não for encontrado
          toast({
            title: 'Que pena!',
            description: 'Você não pontuou nesse jogo',
            variant: 'default',
          })

          // Rola para o topo da página
          window.scrollTo({ top: 0, behavior: 'instant' })
        }
      }
    }
  }, [fixtureId, pointsFilter, toast])

  const renderHeaderMyPoints = () => {
    const months = mothersMock.map((month) => ({
      label: month.name,
      value: month.id,
    }))
    return (
      <div className="flex flex-col items-center mx-2">
        <div className="flex flex-wrap w-full justify-center gap-4">
          <div className="bg-white/10 border border-app-secondary rounded-lg p-4 w-[150px] md:w-[300px] h-[40px] flex items-center">
            <Search className="w-4 h-4 text-white" />
            <Input
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-white placeholder:text-white/70 border-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-full"
            />
          </div>
          <div className="text-center w-[150px] md:w-[200px]">
            <Select
              onValueChange={(value) => setSelectedLeague(value)}
              value={selectedLeague}
            >
              <SelectTrigger className="bg-white/10 border border-app-secondary rounded-lg p-4 h-[40px] flex items-center gap-2">
                <SelectValue placeholder="Campeonatos" />
              </SelectTrigger>
              <SelectContent className="bg-app-background">
                <SelectItem value={'todos'}>Todos</SelectItem>
                {points
                  ?.map((point: Points) => point.league)
                  .filter(
                    (league, index, self) =>
                      index === self.findIndex((l) => l.id === league.id),
                  )
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((league: League) => (
                    <SelectItem key={league.id} value={league.name}>
                      {league.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-center md:w-[200px]">
            <Select
              onValueChange={(value) => {
                setFilterMonths((prev) => ({
                  ...prev,
                  selectedMoths: value,
                }))
                setIsAnnualFilter(false) // Desmarca o filtro anual ao selecionar um mês
              }}
              value={filterMonths.selectedMoths}
            >
              <SelectTrigger className="bg-white/10 border border-app-secondary rounded-lg p-4 h-[40px] flex items-center gap-1">
                <SelectValue placeholder="Mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Mês</SelectLabel>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                    {months.map((month) => (
                      <SelectItem
                        key={month.value}
                        value={month.value.toString()}
                      >
                        {month.label}
                      </SelectItem>
                    ))}
                  </div>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <CustomButton
            variant={isAnnualFilter ? 'secondary' : 'primary'}
            className={`bg-white/10 h-[40px] w-[100px] ${
              isAnnualFilter ? 'text-black' : ''
            }`}
            onClick={() => {
              setIsAnnualFilter(!isAnnualFilter)
              setFilterMonths((old) => ({
                ...old,
                selectedMoths: !isAnnualFilter
                  ? '' // Limpa o mês ao ativar o filtro anual
                  : (new Date().getMonth() + 1).toString(), // Seleciona o mês atual ao desativar o filtro anual
                hasFilter: !isAnnualFilter,
              }))
            }}
          >
            {'Anual'}
          </CustomButton>
        </div>
      </div>
    )
  }

  return (
    <>
      {renderHeaderMyPoints()}
      <div className="text-app-background text-lg bg-app-secondary w-full px-4 py-1 my-6 flex justify-between">
        <p className="font-bold">Total de pontos:</p>
        <p>{totalPoints}</p>
      </div>
      {uniqueDates?.map((date) => (
        <div key={date}>
          <span className="text-white text-base bg-[#0087D521]/10 w-full pl-4 py-1 flex items-center gap-2 max-h-[36px]">
            <CalendarDays size={16} />
            {formatDate(date, 'dd/MM/yyyy')}
          </span>

          <div className="flex gap-2 overflow-x-auto py-4 px-2 ">
            {pointsFilter
              ?.filter(
                (point: Points) =>
                  formatDate(point.fixture.start, 'dd/MM/yyyy') ===
                  formatDate(date, 'dd/MM/yyyy'),
              )
              .map((point: Points) => (
                <div
                  key={point.fixture.id}
                  className="flex"
                  ref={(el) => {
                    cardRefs.current[point.fixture.id] = el // Associa a referência ao card
                  }}
                >
                  <ResultCard points={point} />
                </div>
              ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default MyPointsPage
