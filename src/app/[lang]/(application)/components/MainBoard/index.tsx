import {
    Tabs,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { NewsTabContent } from "./components/NewsTabContent"
import { MatchTabContent } from "./components/MatchTabContent"
import { RankTabContent } from "./components/RankTabContent"
import { getTranslations } from "next-intl/server"
import { getFixture, getLeagues, getMyGuesses } from "@/app/[lang]/(application)/components/MainBoard/data"

export const MainBoard = async () => {
    const fixtures =  await getFixture();
    const t = await getTranslations('components.MainBoard.tabs');
    const leagues = await getLeagues()
    const guess = await getMyGuesses();
    
    return (
        <main className="w-full">
            <Tabs defaultValue="account" className="max-w-[800px] ml-auto mr-auto">
                <TabsList className="p-0 grid w-full grid-cols-3 text-white bg-app-background border-b border-b-white rounded-none">
                    <TabsTrigger  value="match">{t('match.title')}</TabsTrigger>
                    <TabsTrigger value="news">{t('news.title')}</TabsTrigger>
                    <TabsTrigger value="rank">{t('rank.title')}</TabsTrigger>
                </TabsList>
                <MatchTabContent data={fixtures} leagues={leagues} guess={guess} />
                <NewsTabContent />
                <RankTabContent />
            </Tabs>
        </main>
    )
}