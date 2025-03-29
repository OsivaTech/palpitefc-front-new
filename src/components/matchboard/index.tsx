import { League } from '@/types/League'
import { MainMatchList } from '@/components/main-match-list'
import { FixtureByLeagueCategory } from '@/types/Fixture'
import { Guess } from '@/types/Guess'
import Title from '@/components/title'
import { Banner } from '@/components/matchboard/components/banenr'
import { MatchboardFilterAndFixtures } from '@/components/matchboard/components/matchboard-filter'

type MatchBoardProps = {
  fixtures: FixtureByLeagueCategory | null
  leagues: League[]
  guess: Guess[] | null
}

export const MatchBoard = ({ fixtures, leagues, guess }: MatchBoardProps) => {
  return (
    <div className="w-full h-full">
      <Banner />
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
