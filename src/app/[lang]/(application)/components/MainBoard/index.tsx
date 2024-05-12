import {
    Tabs,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { NewsTabContent } from "./components/NewsTabContent"
import { MatchTabContent } from "./components/MatchTabContent"
import { RankTabContent } from "./components/RankTabContent"
import { getTranslations } from "next-intl/server"
import { getFixture, getLeagues, getMyGuesses, getNews } from "@/app/[lang]/(application)/components/MainBoard/data"
import { Guess } from "@/shared/types/Guess"
import { News } from "@/shared/types/News"

export const MainBoard = async () => {
    const fixtures =  await getFixture();
    const t = await getTranslations('components.MainBoard.tabs');
    const leagues = await getLeagues();
    const guess = await getMyGuesses();
    const news = await getNews();

   
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
                <RankTabContent  />
            </Tabs>
        </main>
    )
}