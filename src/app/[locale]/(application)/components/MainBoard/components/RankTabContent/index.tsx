'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TabsContent } from "@/components/ui/tabs"
import { RankingResponse } from "@/shared/types/api/responses/RankResponse"


type RankTabContentProp = {
    data: RankingResponse[]
}
export const RankTabContent = ({data}:RankTabContentProp) => {
    return (
        <TabsContent value="rank">
            
            
            <div className="">
            <Table className="bg-white text-black ">
                <TableHeader className="font-medium text-xs text-black" >
                    <TableRow className="text-black">
                        <TableHead className="text-black w-[50%]">Nome</TableHead>
                        <TableHead className="text-black">Pontos</TableHead>
                        <TableHead className="text-black">Classificação</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="font-normal text-sm">
                </TableBody>
            </Table>
                
                
                
                {data.map(d => (
                    <span key={d.info.leagueId}>{d.info.leagueId}</span>
                ))}
            </div>
        </TabsContent>
    )
}