import {
    Tabs,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { NewsTabContent } from "./components/NewsTabContent"
import { MatchTabContent } from "./components/MatchTabContent"
import { RankTabContent } from "./components/RankTabContent"
import { Guess } from "@/shared/types/Guess"
import { News } from "@/shared/types/News"
import { useTranslations } from "next-intl"
import { GuessResponse } from "@/shared/types/api/responses/GessResponse"
import { League } from "@/shared/types/League"
import { FixtureResponse } from "@/shared/types/api/responses/FixtureResponse"
import { NewsResponse } from "@/shared/types/api/responses/NewsResponse"
import { RankingResponse } from "@/shared/types/api/responses/RankResponse"


type MainBoardProps = {
    fixtures : FixtureResponse | null 
    leagues: League[]
    guess: GuessResponse | null
    news: NewsResponse | null
    rankings: RankingResponse[] | null
}
export const MainBoard =  ({fixtures, leagues, guess, news, rankings}: MainBoardProps) => {
    const t = useTranslations("components.MainBoard.tabs")

    return (
        <main className="w-full">
            <Tabs defaultValue="match" className="max-w-[800px] ml-auto mr-auto">
                <TabsList className="p-0 grid w-full grid-cols-3 text-white bg-app-background border-b border-b-white rounded-none">
                    <TabsTrigger  value="match">{t('match.title')}</TabsTrigger>
                    <TabsTrigger value="news">{t('news.title')}</TabsTrigger>
                    <TabsTrigger value="rank">{t('rank.title')}</TabsTrigger>
                </TabsList>
                <MatchTabContent data={fixtures} leagues={leagues} guess={guess as unknown as Guess[]} />
                <NewsTabContent data={news as unknown as News[]} />
                <RankTabContent data={rankings as RankingResponse[]}  />
            </Tabs>
        </main>
    )
}