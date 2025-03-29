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
      <div className="relative w-screen max-w-full h-auto">
        <Image
          src="/assets/capa-widescreen.png"
          alt="Descrição da imagem"
          layout="responsive"
          width={1920}
          height={1080}
          className="object-cover max-w-full max-h-full hidden sm:block"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <Image
          src="/assets/capa.png"
          alt="Descrição da imagem"
          layout="responsive"
          width={1920}
          height={1080}
          className="object-cover max-w-full max-h-full block sm:hidden"
          style={{ maxWidth: '100%', height: 'auto' }}
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
