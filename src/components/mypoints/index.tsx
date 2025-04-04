'use client'
import { CustomSelect } from '@/components/custom-select/custom-select'
import { useAuth } from '@/context/useAuth'
import { League } from '@/types/League'
import { Separator } from '@radix-ui/react-separator'
import { CalendarDays } from 'lucide-react'

import { mothersMock } from '../../mocks/mothersMock'

import Image from 'next/image'
import { Point, Points } from '@/types/Points'

import { APP_LINKS, POINT_TYPE } from '@/constants'
import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { formatDate } from '@/utils/formatDate'
import { useRouter } from 'next/navigation'

type MyPointsPageProps = {
  leagues: League[]
  points: Points[] | null
}

const MyPointsPage = ({ points }: MyPointsPageProps) => {
  const { isAuthenticated } = useAuth()
  const t = useTranslations()
  const router = useRouter()
  const locale = useLocale()

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

    const dateFilteredPoints = filterMonths.hasFilter
      ? filteredPoints.filter(
          (point: Points) =>
            new Date(point.fixture.start).getMonth() + 1 ===
            Number(filterMonths.selectedMoths),
        )
      : filteredPoints

    const dates = dateFilteredPoints.map((point: Points) =>
      formatDate(point.fixture.start, 'yyyy-MM-dd'),
    )

    const uniqueDates = Array.from(new Set(dates))

    const totalPointsSum = dateFilteredPoints
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

    setPointsFilter(dateFilteredPoints)
    setUniqueDates(uniqueDates)
    setTotalPoints(totalPointsSum)
  }

  useEffect(() => {
    functionFilterPoints()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterMonths])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/${APP_LINKS.SIGNIN()}`)
    }
  }, [isAuthenticated, locale, router])

  const renderHeaderMyPoints = () => {
    return (
      <div className="flex items-center gap-3 pb-2">
        <div className="min-w-[71px] mx-auto">
          <CustomSelect
            title={t('components.mypoints.month')}
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
      </div>
    )
  }

  const renderContentCard = (point: Points) => {
    const totalValue = point.points.reduce(
      (acc, current) => acc + current.value,
      0,
    )

    return (
      <div className="bg-[#2323235C] border border-app-secondary mt-2 rounded-md placeholder:uppercase text-white px-[20px] py-[12px] font-medium text-xs">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div className="relative  gap-2 flex justify-center items-center">
              {point.league.image && (
                <Image src={point.league.image} height={20} width={20} alt="" />
              )}
              <div>{point.league.name}</div>
            </div>
          </div>
          <div className="flex items-center">
            {formatDate(point.fixture.start, 'dd/MM E HH:mm')}
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
          <span className="text-sm text-center text-white/65 w-full">
            {t('components.mypoints.guess')} {point.guess.homeTeam.goals} X{' '}
            {point.guess.awayTeam.goals}
          </span>
        </div>

        <Separator className="mt-2 mb-2 border border-white/50 pl-4" />

        {point.points.map((point: Point) => (
          <div
            className="flex justify-between text-white/65"
            key={point.type.code}
          >
            <span className="text-sm">{POINT_TYPE[point.type.code]}</span>
            <span className="text-sm">+ {point.value}</span>
          </div>
        ))}

        <div className="flex justify-between mt-2 text-white/65">
          <span className="text-sm">Total</span>
          <span className="text-sm">+ {totalValue}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="px-2 max-w-[500px] mx-auto mb-6">
      {renderHeaderMyPoints()}
      <div className="flex justify-between">
        <p className="font-bold">
          Total de pontos {filterMonths.hasFilter ? 'do mês' : 'do ano'}:
        </p>
        <p>{totalPoints}</p>
      </div>
      {uniqueDates?.map((date) => (
        <div key={date}>
          <span className="text-sm flex items-center gap-2 font-medium mt-6">
            <CalendarDays size={16} />
            {formatDate(date, 'dd/MM/yyyy')}
          </span>

          {pointsFilter
            ?.filter(
              (point: Points) =>
                formatDate(point.fixture.start, 'dd/MM/yyyy') ===
                formatDate(date, 'dd/MM/yyyy'),
            )
            .map((point: Points) => (
              <div key={point.fixture.id}>{renderContentCard(point)}</div>
            ))}
        </div>
      ))}
    </div>
  )
}

export default MyPointsPage
