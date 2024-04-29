'use client'
import { Fixture } from "@/shared/types/Fixture"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useTranslations } from 'next-intl'
import { League } from "@/shared/types/League"
import { API_ROUTE } from "@/shared/constants"
import { authorizedApi } from "@/data/api"
import { TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GuessCard } from "@/app/[lang]/(application)/components/GuessCard"
import { Guess } from "@/shared/types/Guess"
import { Badge } from "@/components/ui/badge"

type MatchTabContentProps = {
    data: Fixture[] | null
    leagues: League[]
    guess: Guess[]
}

export const MatchTabContent = ({data, leagues, guess}:MatchTabContentProps ) => {
    const { toast } = useToast()
    const t = useTranslations()
    const [filter, setFilter] = useState({
        selectedLeague: '0',
        onlyGuesses: false
    })
    
    useEffect(() => {
        if(data === null){
            toast({
                title: t('common.error'),
                description: t('components.MainBoard.tabs.match.errorMessage'),
              })
        }
    }, [data, toast, t])

    const filteredOption = data
        ?.filter(d => filter.onlyGuesses ? guess.find(g => g.fixtureId === d.id) : d )
        ?.filter(d => filter.selectedLeague === '0' ? d : d.leagueId.toString() === filter.selectedLeague)
    
    return (
        //FILTER
        <div>
            <TabsContent value="match" className="py-3 px-2">
                <div className="flex items-center gap-3 pb-2">
                    <Badge onClick={() => setFilter(old => ({...old, onlyGuesses: true }))} variant={filter.onlyGuesses ? 'default': 'outline' }  className="flex justify-center items-center h-7 min-w-28 cursor-pointer" >{t("components.MainBoard.tabs.match.filter.myGuesses")}</Badge>
                    <Badge onClick={() => setFilter(old => ({...old, onlyGuesses: false }))} variant={filter.onlyGuesses ? 'outline': 'default' }  className="h-7 cursor-pointer" >{t("common.all")}</Badge>
                    <Select  value={filter.selectedLeague} onValueChange={value => setFilter(old => ({...old, selectedLeague: value}))}>
                        <SelectTrigger  className="border border-white h-7 w-full bg-app-background text-white ring-offset-0 active:border-1 rounded-full">
                            <SelectValue className="placeholder:tex-twhite" placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent className="bg-app-background text-white">
                            <SelectItem  value='0'>Todos</SelectItem>

                            {leagues.map(league => (
                                <SelectItem key={league.id} value={league.id.toString()}>{league.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="pt-5 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center items-start max-h-[500px] gap-2 overflow-auto">
                   {filteredOption?.map( fixture => (
                       <GuessCard key={fixture.id} fixture={fixture} guess={guess.find(g => g.fixtureId === fixture.id) } />
                   ))}
                </div>
            </TabsContent>
        </div>
    )
}