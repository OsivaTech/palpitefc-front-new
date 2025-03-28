import { League } from '@/types/League'
import Image from 'next/image'
import { MainMatchList } from '@/components/main-match-list'
import { FixtureByLeagueCategory } from '@/types/Fixture'
import { Guess } from '@/types/Guess'
import { MatchboardFilterAndFixtures } from '@/components/matchboard/components/matchboard-filter'
import Title from '@/components/title'

type MatchBoardProps = {
  fixtures: FixtureByLeagueCategory | null
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
        <Title title="Principais Jogos" />
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
