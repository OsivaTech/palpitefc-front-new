'use client'
import { Fixture } from "@/shared/types/Fixture"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useTranslations } from 'next-intl'
import { League } from "@/shared/types/League"
import { TabsContent } from "@/components/ui/tabs"
import { GuessCard } from "@/app/[locale]/(application)/components/GuessCard"
import { Guess } from "@/shared/types/Guess"
import { Badge } from "@/components/ui/badge"
import { CustomSelect } from "@/components/CustomSelect/custom-select"
import { X } from "lucide-react"

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
        ?.filter(d => filter.onlyGuesses ? guess?.find(g => g.fixtureId === d.id) : d )
        ?.filter(d => filter.selectedLeague === '0' ? d : d.leagueId.toString() === filter.selectedLeague)
        
    
    return (
        //FILTER
        <div>
            <TabsContent value="match" className="py-3 px-2">
                <div className="flex items-center gap-3 pb-2">
                    {filter.onlyGuesses && (
                        <Badge onClick={() => setFilter(old => ({...old, onlyGuesses: false }))}  className="cursor-pointer p-0" ><X size={20} /></Badge>
                    )}
                    <Badge onClick={() => setFilter(old => ({...old, onlyGuesses: true }))} variant={filter.onlyGuesses ? 'default': 'outline' }  className="flex justify-center items-center h-7 min-w-28 cursor-pointer border-white" >{t("components.MainBoard.tabs.match.filter.myGuesses")}</Badge>
                    <CustomSelect title="Campeonatos"  data={leagues.map(l => ({id: l.id.toString(), name: l.name}))} onValueChange={(value: string) => setFilter(old => ({...old, selectedLeague: value}))} />
                  
                </div>

                <div className="pt-5 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center items-start max-h-[500px] gap-2 overflow-auto">
                   {filteredOption?.map( fixture => (
                       <GuessCard key={fixture.id} fixture={fixture} league={leagues.filter(l => l.id === fixture.leagueId)[0]} guess={guess?.find(g => g.fixtureId === fixture.id) } />
                   ))}
                </div>
            </TabsContent>
        </div>
    )
}