'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Fixture } from '@/types/Fixture'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const MainMatchCard = ({ fixture }: { fixture: Fixture }) => {
  return (
    <div
      className={cn(
        'w-full h-full bg-app-background rounded-xl border border-app-secondary p-4 max-w-[350px] relative space-y-2 flex-shrink-0',
      )}
    >
      <Image
        src="/assets/main-match-card.png"
        fill
        className="absolute top-0 left-0 opacity-30 object- z-0"
        alt=""
      />
      <div className="flex items-center justify-between z-10 relative">
        <span className="text-xs">{fixture.league.name}</span>
        <span className="text-xs">
          {format(fixture.start, 'dd/MM EE HH:mm', { locale: ptBR })}
        </span>
      </div>
      <div className="flex items-center justify-evenly z-10 relative h-[100px]">
        <div className="relative w-[70px] h-[70px]">
          <Image
            src={fixture.homeTeam.image}
            alt=""
            className="object-contain"
            layout="fill"
          />
        </div>

        <div className="relative w-[50px] h-[100px]">
          <Image
            src="/assets/vs.png"
            alt=""
            className="object-contain"
            layout="fill"
          />
        </div>

        <div className="relative w-[70px] h-[70px]">
          <Image
            src={fixture.awayTeam.image}
            alt=""
            className="object-contain"
            layout="fill"
          />
        </div>
      </div>
      <div className="flex items-center justify-center z-10 relative mt-3"></div>
    </div>
  )
}
