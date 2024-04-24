import { FixtureResponse } from "../../../../shared/types/api/responses/FixtureResponse"
import { GessCard } from "../../../GessCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select"
import { TabsContent } from "../../../ui/tabs"

const mockData = {
    "id": 1035463,
    "name": "Premier League",
    "start": "2024-04-24T15:45:00.000Z",
    "leagueId": 39,
    "finished": false,
    "homeTeam": {
      "id": 2339,
      "gol": 0,
      "teamId": 39,
      "gameId": 1035463,
      "name": "Wolves",
      "image": "https://media.api-sports.io/football/teams/39.png"
    },
    "awayTeam": {
      "id": 2340,
      "gol": 0,
      "teamId": 35,
      "gameId": 1035463,
      "name": "Bournemouth",
      "image": "https://media.api-sports.io/football/teams/35.png"
    }
  } as FixtureResponse

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
                <div className="pt-5 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center items-center gap-2 max-h-[500px] overflow-auto">
                    <GessCard fixture={mockData} />
                    <GessCard fixture={mockData} />
                    <GessCard fixture={mockData} />
                    <GessCard fixture={mockData} />
                    <GessCard fixture={mockData} />
                    <GessCard fixture={mockData} />
                    <GessCard fixture={mockData} />
                    <GessCard fixture={mockData} />
                    <GessCard fixture={mockData} />
                </div>
            </TabsContent>
        </div>
    )
}