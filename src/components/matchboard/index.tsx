import { League } from '@/types/League'
import Image from 'next/image'
import { MainMatchList } from '@/components/main-match-list'
import { FixturesByLeague } from '@/types/Fixture'
import { Guess } from '@/types/Guess'
import { MatchboardFilterAndFixtures } from '@/components/matchboard/components/matchboard-filter'
type MatchBoardProps = {
  fixtures: FixturesByLeague | null
  leagues: League[]
  guess: Guess[] | null
}
export const MatchBoard = ({ fixtures, leagues, guess }: MatchBoardProps) => {
  return (
    <div className="w-full h-full">
      <div className="relative w-full h-[300px] z-0">
        <Image
          src="/assets/capa.png"
          alt=""
          fill
          className="object-cover md:object-fill lg:object-fill xl:object-fill z-0"
        />
      </div>
      <section className="-mt-14 z-50 relative gap-2">
        <div className="h-[30px] lg:w-[300px] w-[200px] bg-app-secondary text-app-background flex items-center justify-center font-bold rounded-br-md rounded-tr-md mb-2">
          Principais Jogos
        </div>
        <MainMatchList />
      </section>
      <MatchboardFilterAndFixtures
        leagues={leagues}
        fixtures={fixtures}
        guess={guess}
      />
    </div>
  )
}
