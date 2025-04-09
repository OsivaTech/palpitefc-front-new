'use client'
import { Point, Points } from '@/types/Points'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Separator } from '../ui/separator'
import { POINT_TYPE } from '@/constants'

export const ResultCard = ({ points: pointList }: { points: Points }) => {
  const { fixture, guess, league, points } = pointList
  const totalValue = points.reduce((acc, current) => acc + current.value, 0)
  return (
    <div
      className={cn(
        'flex flex-col border border-app-secondary bg-[#232323]/40 rounded-lg',
        'py-4 px-4 justify-between flex-shrink-0 relative',
        'h-[221px] md:w-[407px] w-[90vw]',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-2">
          {league.image && (
            <Image
              src={league.image}
              alt={league.name}
              width={20}
              height={20}
              className="object-contain"
            />
          )}
          <span className="text-xs">{league.name}</span>
        </div>
        <span className="text-xs">
          {format(fixture.start, 'dd/MM EE HH:mm', { locale: ptBR })}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <TeamShield team={fixture.homeTeam} />
        <div className="flex flex-col items-center gap-2 text-white">
          <div className="flex flex-row items-center gap-2">
            <span className="text-5xl">{fixture.homeTeam.goals}</span>
            <span className="text-3xl">×</span>
            <span className="text-5xl">{fixture.awayTeam.goals}</span>
          </div>
        </div>
        <TeamShield team={fixture.awayTeam} />
      </div>

      {guess && (
        <span className="text-xs text-[#FFFFFFB5] text-center">
          Seu palpite {guess.homeTeam.goals} × {guess.awayTeam.goals}
        </span>
      )}
      <Separator className="mt-2 mb-2 border border-white/50 pl-4" />

      {points.map((point: Point) => (
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

const TeamShield = ({ team }: { team: Points['fixture']['homeTeam'] }) => {
  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <div className="relative w-[50px] h-[50px]">
        <Image
          src={team.image}
          alt={team.name}
          fill
          className="object-contain"
        />
      </div>
      <span className="text-white text-xs text-center break-words">
        {team.name}
      </span>
    </div>
  )
}
