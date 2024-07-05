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

type MatchBoardProps = {
  fixtures: FixtureResponse | null
  leagues: League[]
  guess: GuessResponse | null
  news: NewsResponse | null
  rankings: RankingResponse[] | null
}
export const MatchBoard = ({
  fixtures,
  leagues,
  guess,
  news,
  rankings,
}: MatchBoardProps) => {
  const t = useTranslations('components.matchboard-tab')

  return (
    <div className="w-full overflow-auto h-full">
      <Tabs
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
          />
          <NewsTabContent data={news as unknown as News[]} />
          <RankTabContent
            data={rankings as RankingResponse[]}
            leagues={leagues}
          />
        </div>
      </Tabs>
    </div>
  )
}
