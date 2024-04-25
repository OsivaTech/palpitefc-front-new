import { Fixture } from "@/shared/types/Fixture"
import { FixtureResponse } from "../../../../shared/types/api/responses/FixtureResponse"
import { GessCard } from "../../../GessCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select"
import { TabsContent } from "../../../ui/tabs"


type MatchTabContentProps = {
    data: Fixture[]
}
export const MatchTabContent = ({data}:MatchTabContentProps ) => {
    return (
        //FILTER
        <div>
            <TabsContent value="match" className="py-3 px-2">
                <Select>
                    <SelectTrigger className="w-full bg-app-background text-white ring-offset-0 active:border-1 rounded-full">
                        <SelectValue className="placeholder:tex-twhite" placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent className="bg-app-background text-white">
                        <SelectItem value="1">Brasileirão</SelectItem>
                        <SelectItem value="2">Libertadores</SelectItem>
                    </SelectContent>
                </Select>
                <div className="pt-5 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center items-center gap-2 max-h-[500px] overflow-auto">
                   {data?.map( fixture => (
                       <GessCard key={fixture.id} fixture={fixture} />
                   ))}
                </div>
            </TabsContent>
        </div>
    )
}