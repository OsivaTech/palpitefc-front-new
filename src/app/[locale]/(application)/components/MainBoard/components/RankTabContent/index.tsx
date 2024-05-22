'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TabsContent } from "@/components/ui/tabs"
import { RANKING_TYPE } from "@/shared/constants"
import { RankingResponse } from "@/shared/types/api/responses/RankResponse"
import { useState } from "react"


type RankTabContentProp = {
    data: RankingResponse[]
}
export const RankTabContent = ({data}:RankTabContentProp) => {
    const [filter, setFilter] = useState(
        {
            league: null,
            type: null
        }
    )
    
    const filteredContent = data.filter(d => d.type === RANKING_TYPE.YEAR)[0]

    return (
        <TabsContent value="rank">
            <div className="h-fit overflow-auto relative">
                <Table className="bg-white text-black px-1">
                    <TableHeader className="font-medium text-xs text-black" >
                        <TableRow className="text-black border-b border-none">
                            <TableHead className="text-black w-[50%]">Nome</TableHead>
                            <TableHead className="text-black">Pontos</TableHead>
                            <TableHead className="text-black">Classificação</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="font-normal text-sm">
                        {filteredContent.placings.map(p => (
                            <TableRow key={p.id} className="border-b border-black">
                                <TableCell >{p.name}</TableCell >
                                <TableCell >{p.points}</TableCell >
                                <TableCell >{p.place}</TableCell >
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </TabsContent>
    )
}