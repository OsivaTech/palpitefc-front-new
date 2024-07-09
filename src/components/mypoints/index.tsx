'use client'
import { CustomSelect } from '@/components/custom-select/custom-select'
import { useAuth } from '@/context/useAuth'
import { League } from '@/types/League'
import { Separator } from '@radix-ui/react-separator'
import { CalendarDays } from 'lucide-react'

import { mothersMock } from '../../mocks/mothersMock'

import Image from 'next/image'
import { Point, Points } from '@/types/Points'
import { formatarData, formatarDataDDMMYYY } from '@/utils/formatData'
import { POINT_TYPE } from '@/constants'
import { useEffect, useState } from 'react'

type MyPointsPageProps = {
  leagues: League[]
  points: Points[] | null
}

const MyPointsPage = ({ leagues, points }: MyPointsPageProps) => {
  const { user } = useAuth()

  const [filterLeague, setFilterLeague] = useState({
    selectedLeague: '0',
    hasFilter: false,
  })
  const [filterMonths, setFilterMonths] = useState({
    selectedMoths: '0',
    hasFilter: false,
  })
  const [uniqueDates, setUniqueDates] = useState<string[]>()
  const [pointsFilter, setPointsFilter] = useState<Points[] | null>(points)
  const [totalPoints, setTotalPoints] = useState<number>(0)

  const functionFilterPoints = () => {
    const filteredPoints =
      points?.filter((point: Points) => point.points.length > 0) || []

    const leagueFilteredPoints = filterLeague.hasFilter
      ? filteredPoints.filter(
          (point: Points) =>
            point.fixture.leagueId === Number(filterLeague?.selectedLeague),
        )
      : filteredPoints

    const dateFilteredPoints = filterMonths.hasFilter
      ? leagueFilteredPoints.filter(
          (point: Points) =>
            new Date(point.fixture.start).getMonth() + 1 ===
            Number(filterMonths.selectedMoths),
        )
      : leagueFilteredPoints

    const dates = dateFilteredPoints.map((point: Points) =>
      point.fixture.start.slice(0, 10),
    )

    const uniqueDates = Array.from(new Set(dates))

    const totalPointsSum = leagueFilteredPoints
      ?.filter(
        (point: Points) =>
          point.points.length > 0 &&
          uniqueDates.includes(point.fixture.start.slice(0, 10)),
      )
      .map((point: Points) => {
        return point.points.reduce(
          (acc, currentValue) => acc + currentValue.value,
          0,
        )
      })
      .reduce((acc, currentTotalPoints) => acc + currentTotalPoints, 0)

    setPointsFilter(leagueFilteredPoints)
    setUniqueDates(uniqueDates)
    setTotalPoints(totalPointsSum)
  }

  useEffect(() => {
    functionFilterPoints()
  }, [filterLeague, filterMonths])

  const renderHeaderMyPoints = () => {
    return (
      <>
        <div className="flex justify-start items-end gap-3 ml-6  pt-6 mb-6">
          {user?.team.image && (
            <Image src={user?.team?.image} height={32} width={32} alt="" />
          )}
          <span className="h-full">{user?.name}</span>
        </div>

        <Separator className="mb-6 border border-white/50 pl-4" />

        <div className="flex items-center gap-3 pb-2">
          <div className="min-w-[71px] mx-auto">
            <CustomSelect
              title="Meses"
              data={mothersMock.map((l) => ({
                id: l.id.toString(),
                name: l.name,
              }))}
              onValueChange={(value: string, hasFilter) =>
                setFilterMonths((old) => ({
                  ...old,
                  selectedMoths: value,
                  hasFilter,
                }))
              }
            />
          </div>

          <CustomSelect
            title="Campeonatos"
            data={leagues.map((l) => ({ id: l.id.toString(), name: l.name }))}
            onValueChange={(value: string, hasFilter) =>
              setFilterLeague((old) => ({
                ...old,
                selectedLeague: value,
                hasFilter,
              }))
            }
          />
        </div>
      </>
    )
  }

  const renderContentCard = (point: Points) => {
    const totalValue = point.points.reduce(
      (acc, current) => acc + current.value,
      0,
    )

    return (
      <>
        <div className="w-full bg-app-background mt-2 h-full  rounded-md placeholder:uppercase text-white px-[20px] py-[12px] font-medium text-xs">
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <div className="relative  gap-2 flex justify-center items-center">
                {point.league.image && (
                  <Image
                    src={point.league.image}
                    height={20}
                    width={20}
                    alt=""
                  />
                )}
                <div>{point.league.name}</div>
              </div>
            </div>
            <div className="flex  items-center">
              {formatarData(point.fixture.start)}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2 justify-between flex-1">
              <div className="relative h-[40px] w-[40px] self-center">
                {point.fixture.homeTeam.image && (
                  <Image
                    src={point.fixture.homeTeam.image}
                    height={40}
                    width={40}
                    alt=""
                  />
                )}
              </div>
              <span className="text-xs text-center w-full">
                {point.fixture.homeTeam.name}
              </span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <span className="text-center text-4xl">
                {point.fixture.homeTeam.goals}
              </span>
              <span className="text-center text-4xl">x</span>
              <span className="text-center text-4xl">
                {point.fixture.awayTeam.goals}
              </span>
            </div>

            <div className="flex flex-col gap-2 justify-between flex-1">
              <div className="relative h-[40px] w-[40px] self-center">
                {point.fixture.awayTeam.image && (
                  <Image
                    src={point.fixture.awayTeam.image}
                    height={40}
                    width={40}
                    alt=""
                  />
                )}
              </div>
              <span className="text-xs text-center w-full">
                {point.fixture.awayTeam.name}
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <span className="text-sm text-center text-gray-400 w-full">
              Seu palpite {point.guess.homeTeam.goals} X{' '}
              {point.guess.awayTeam.goals}
            </span>
          </div>

          <Separator className="mt-2 mb-2 border border-white/50 pl-4" />

          {point.points.map((point: Point) => (
            <>
              <div className="flex justify-between">
                <span className="text-sm">{POINT_TYPE[point.type]}</span>
                <span className="text-sm">+ {point.value}</span>
              </div>
            </>
          ))}

          <div className="flex justify-between mt-2">
            <span className="text-sm">Total</span>
            <span className="text-sm">+ {totalValue}</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {renderHeaderMyPoints()}

      {uniqueDates?.map((date) => (
        <>
          <span className="text-sm flex items-center gap-2 font-medium mt-6">
            <CalendarDays size={16} />
            {formatarDataDDMMYYY(date)}
          </span>

          {pointsFilter
            ?.filter(
              (point: Points) =>
                formatarDataDDMMYYY(point.fixture.start) ===
                formatarDataDDMMYYY(date),
            )
            .map((point: Points) => <>{renderContentCard(point)}</>)}
        </>
      ))}

      <div className="fixed bottom-1 w-full max-w-[500px] ">
        <div className="w-full bg-app-background h-[38px] text-white px-[20px] py-[12px] -ml-3 -mb-1 font-medium text-xs">
          <div className="flex justify-between">
            <div>TOTAL DE PONTOS</div>
            <div>{totalPoints}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyPointsPage
