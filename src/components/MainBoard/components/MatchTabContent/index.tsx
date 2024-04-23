import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select"
import { TabsContent } from "../../../ui/tabs"


export const MatchTabContent = () => {
    return (
        //FILTER
        <div>
            <TabsContent value="match" className="py-3 px-2">
                <Select>
                    <SelectTrigger className="w-full bg-app-background border-1 rounded-full">
                        <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent className="bg-app-background text-white">
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </TabsContent>
        </div>
    )
}