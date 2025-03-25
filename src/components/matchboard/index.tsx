import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'
import { FixtureResponse } from '@/types/api/responses/FixtureResponse'
import { League } from '@/types/League'
import { GuessResponse } from '@/types/api/responses/GessResponse'
import { NewsResponse } from '@/types/api/responses/NewsResponse'
import { RankingResponse } from '@/types/api/responses/RankResponse'
import { Guess } from '@/types/Guess'
import { News } from '@/types/News'
import { MatchTabContent } from '@/components/matchboard-match-tab'
import { NewsTabContent } from '@/components/matchboard-news-tab'
import { RankTabContent } from '@/components/matchboard-rank-tab'
import { Advertisament } from '@/types/Advertisament'
import { Team } from '@/types/Team'
import Image from 'next/image'
import { MainMatchList } from '@/components/main-match-list'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

type MatchBoardProps = {
  fixtures: FixtureResponse | null
  leagues: League[]
  guess: GuessResponse | null
  news: NewsResponse | null
  rankings: RankingResponse[] | null
  advertisament: Advertisament[] | null
  teams: Team[]
}
export const MatchBoard = ({
  fixtures,
  leagues,
  guess,
  news,
  rankings,
  advertisament,
  teams,
}: MatchBoardProps) => {
  const t = useTranslations('components.matchboard-tab')

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
      <div className="flex mt-10 ml-4 items-center space-x-4">
        <div className="bg-white/10 border border-app-secondary rounded-lg p-2 h-[40px] flex items-center gap-2">
          <Search className="w-4 h-4 text-white" />
          <Input
            placeholder="Pesquisar"
            className="bg-transparent  text-white placeholder:text-white border-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-full"
          />
        </div>
        <Button variant="primary" className="bg-white/10 ">
          Ao Vivo
        </Button>
      </div>
      {/* <Tabs
        defaultValue="match"
        className="max-w-[800px]  min-h-full ml-auto mr-auto"
      >
        <TabsList className="p-0 grid w-full grid-cols-3 text-white bg-app-background border-b border-b-white rounded-none">
          <TabsTrigger value="match">{t('match.title')}</TabsTrigger>
          <TabsTrigger value="news">{t('news.title')}</TabsTrigger>
          <TabsTrigger value="rank">{t('rank.title')}</TabsTrigger>
        </TabsList>
        <div>
          <MatchTabContent
            data={fixtures}
            leagues={leagues}
            guess={guess as unknown as Guess[]}
            advertisament={advertisament as unknown as Advertisament[]}
          />

          <NewsTabContent data={news as unknown as News[]} />
          <RankTabContent
            data={rankings as RankingResponse[]}
            leagues={leagues}
            teams={teams}
          />
        </div>
      </Tabs> */}
    </div>
  )
}
