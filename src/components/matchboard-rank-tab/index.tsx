'use client'
import { CustomSelect } from '@/components/custom-select/custom-select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TabsContent } from '@/components/ui/tabs'
import { RANKING_TYPE } from '@/constants'
import { League } from '@/types/League'
import { RankingResponse } from '@/types/api/responses/RankResponse'
import { useState } from 'react'

type RankTabContentProp = {
  data: RankingResponse[]
  leagues: League[]
}

const month = [
  { id: '1', name: 'Janeiro' },
  { id: '2', name: 'Fevereiro' },
  { id: '3', name: 'Março' },
  { id: '4', name: 'Abril' },
  { id: '5', name: 'Maio' },
  { id: '6', name: 'Junho' },
  { id: '7', name: 'Julho' },
  { id: '8', name: 'Agosto' },
  { id: '9', name: 'Setembro' },
  { id: '10', name: 'Outubro' },
  { id: '11', name: 'Novembro' },
  { id: '12', name: 'Dezembro' },
]

export const RankTabContent = ({ data, leagues }: RankTabContentProp) => {
  const [filter, setFilter] = useState<{ value: null | string; type: string }>({
    value: null,
    type: RANKING_TYPE.YEAR,
  })

  const filteredContent =
    filter.type === RANKING_TYPE.MONTH
      ? data
          .filter((d) => d.type === filter.type)
          .filter((m) => m.info.month?.toString() === filter.value)[0]
      : data?.filter((d) => d.type === filter.type)[0]

  const currentUser = filteredContent?.yourPlace

  const onFilterChange = (value: string, type: string) => {
    if (value === '0') {
      setFilter({ type: RANKING_TYPE.YEAR, value: null })
    } else {
      setFilter({ type, value })
    }
  }

  return (
    <TabsContent value="rank">
      <div className="flex items-center gap-3 pb-2 pt-3">
        {filter.type !== RANKING_TYPE.LEAGUE && filter.value !== '0' && (
          <div className="min-w-[71px]">
            <CustomSelect
              title="Mês"
              data={month}
              onValueChange={(value: string) =>
                onFilterChange(value, RANKING_TYPE.MONTH)
              }
            />
          </div>
        )}
        {filter.type !== RANKING_TYPE.MONTH && filter.value !== '0' && (
          <CustomSelect
            title="Campeonatos"
            data={leagues.map((l) => ({ id: l.id.toString(), name: l.name }))}
            onValueChange={(value: string) =>
              onFilterChange(value, RANKING_TYPE.LEAGUE)
            }
          />
        )}
      </div>
      <div className="h-fit overflow-auto relative">
        <Table className="bg-white text-black px-1">
          <TableHeader className="font-medium text-xs text-black">
            <TableRow className="text-black border-b border-none">
              <TableHead className="text-black w-[50%]">Nome</TableHead>
              <TableHead className="text-black">Pontos</TableHead>
              <TableHead className="text-black">Classificação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-normal text-sm relative">
            {currentUser && (
              <TableRow className=" sticky border-b border-black h-8 bg-[#2D3745] font-semibold text-white text-sm">
                <TableCell className="p-0 pl-[10px]">
                  {currentUser.name}
                </TableCell>
                <TableCell className="p-0">{currentUser.points}</TableCell>
                <TableCell className="p-0">{currentUser.place}</TableCell>
              </TableRow>
            )}
            {filteredContent?.placings?.map((p) => (
              <TableRow key={p.id} className="border-b border-black h-8">
                <TableCell className="p-0 pl-[10px]">{p.name}</TableCell>
                <TableCell className="p-0">{p.points}</TableCell>
                <TableCell className="p-0">{p.place}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TabsContent>
  )
}
