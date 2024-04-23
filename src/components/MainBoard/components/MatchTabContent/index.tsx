import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select"
import { TabsContent } from "../../../ui/tabs"


export const MatchTabContent = () => {
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
            </TabsContent>
        </div>
    )
}