import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { NewsTabContent } from "./components/NewsTabContent"
import { MatchTabContent } from "./components/MatchTabContent"
import { RankTabContent } from "./components/RankTabContent"
import { getFixture } from "@/components/MainBoard/data"

export const MainBoard = async () => {
    const fixtures =  await getFixture();

    return (
        <main className="w-full">
            <Tabs defaultValue="account" className="max-w-[800px] ml-auto mr-auto">
                <TabsList className="p-0 grid w-full grid-cols-3 text-white bg-app-background border-b border-b-white rounded-none">
                    <TabsTrigger   value="match">Partidas</TabsTrigger>
                    <TabsTrigger value="news">Notícias</TabsTrigger>
                    <TabsTrigger value="rank">Rankings</TabsTrigger>
                </TabsList>
                <MatchTabContent data={fixtures} />
                <NewsTabContent />
                <RankTabContent />
            </Tabs>
        </main>
    )
}