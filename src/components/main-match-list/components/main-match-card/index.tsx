import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Fixture } from '@/types/Fixture'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const MainMatchCard = ({ fixture }: { fixture: Fixture }) => {
  return (
    <div
      className={cn(
        'w-full h-full bg-app-background rounded-xl border border-app-secondary p-6 max-w-[350px] relative space-y-2 flex-shrink-0',
      )}
    >
      <Image
        src="/assets/main-match-card.png"
        fill
        className="absolute top-0 left-0 opacity-30 object- z-0"
        alt=""
      />
      <div className="flex items-center justify-between z-10 relative">
        <span className="text-[10px]">{fixture.league.name}</span>
        <span className="text-[10px]">
          {format(fixture.start, 'dd/MM EE HH:mm', { locale: ptBR })}
        </span>
      </div>
      <div className="flex items-center justify-evenly z-10 relative space-y-2">
        <div>
          <Image src={fixture.homeTeam.image} width={60} height={60} alt="" />
        </div>
        <div>
          <Image src="/assets/vs.png" width={50} height={100} alt="" />
        </div>
        <div>
          <Image src={fixture.awayTeam.image} width={60} height={60} alt="" />
        </div>
      </div>
      <div className="flex items-center justify-center z-10 relative mt-3"></div>
    </div>
  )
}
