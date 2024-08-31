'use client'
import { CustomSelect } from '@/components/custom-select/custom-select'
import { TabsContent } from '@/components/ui/tabs'
import { RANKING_TYPE } from '@/constants'
import { League } from '@/types/League'
import { RankingResponse } from '@/types/api/responses/RankResponse'
import { useState } from 'react'
import Image from 'next/image'
import { Team } from '@/types/Team'
import { useTranslations } from 'use-intl'

type RankTabContentProp = {
  data: RankingResponse[]
  leagues: League[]
  teams: Team[]
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

export const RankTabContent = ({ data, teams }: RankTabContentProp) => {
  const t = useTranslations('components.matchboard-tab')
  const activeRank = {
    value: data.findLast((d) => d.info.month)?.info.month?.toString() || '0',
    type: RANKING_TYPE.MONTH,
  }

  const [filter, setFilter] = useState<{ value: null | string; type: string }>({
    value: activeRank.value,
    type: activeRank.type,
  })

  const filteredContent =
    filter.type === activeRank.type
      ? data
          .filter((d) => d.type === filter.type)
          .filter((m) => m.info.month?.toString() === filter.value)[0]
      : data?.filter((d) => d.type === filter.type)[0]

  const onFilterChange = (value: string, type: string) => {
    if (value === '0') {
      setFilter({ type: activeRank.type, value: activeRank.value })
    } else {
      setFilter({ type, value })
    }
  }

  return (
    <TabsContent value="rank">
      <div className="flex flex-col items-center justify-center gap-3 pb-2 pt-3">
        <h2 className="font-semibold">
          {t('rank.pageTitle')}
          {filter.value !== '0'
            ? ' ' +
              month.filter((x) => x.id === filter.value)[0].name.toLowerCase()
            : ''}
        </h2>
        {filter.value !== '0' && (
          <div className="min-w-[71px]">
            <CustomSelect
              title={t('rank.filterText.month')}
              data={month}
              onValueChange={(value: string) =>
                onFilterChange(value, activeRank.type)
              }
            />
          </div>
        )}
      </div>
      <div className="text-white mx-auto p-2">
        <div className="flex justify-center gap-4 mb-4">
          {filteredContent?.placings ? generatePlaceCard(1) : null}
          {filteredContent?.placings ? generateFirstPlaceCard() : null}
          {filteredContent?.placings ? generatePlaceCard(2) : null}
        </div>
        <div className="mt-4">
          {filteredContent?.placings.slice(3).map((place) => (
            <div
              key={place.id}
              className="flex justify-between items-center bg-[#2D3745] text-white px-4 py-2 rounded-lg mb-2 "
            >
              <div className="flex items-center">
                <span className="text-lg font-bold mr-2">{place.place}º</span>
                <div className="w-6 h-6 relative flex justify-center items-center mr-2">
                  <Image
                    fill
                    src={
                      teams.filter(
                        (team) =>
                          team.id.toString() === place.teamId.toString(),
                      )[0]?.image
                    }
                    alt={place.name}
                    className="w-8 h-8"
                  />
                </div>
                <span>{place.name}</span>
              </div>
              <span className="font-bold">{place.points}</span>
            </div>
          ))}
        </div>
      </div>
    </TabsContent>
  )

  function generateFirstPlaceCard() {
    return (
      <div className="flex flex-col items-center">
        <div className="bg-[#2D3745] text-white text-center text-nowrap px-2 py-2 w-28 h-36 rounded-lg flex flex-col items-center clip-custom">
          <div className="w-10 h-10 relative flex justify-center items-center mb-2">
            <Image
              fill
              src={
                teams.filter(
                  (team) =>
                    team.id.toString() ===
                    filteredContent?.placings[0]?.teamId.toString(),
                )[0]?.image
              }
              alt=""
            />
          </div>
          <span>{filteredContent?.placings[0]?.name}</span>
          <span className="text-xl font-bold">
            {filteredContent?.placings[0]?.points}
          </span>
        </div>
        <div className="bg-[#C0C0C0] text-gray-900 text-2xl z-0 w-12 h-12 rounded-full border-4 border-[#2D3745] flex items-center justify-center font-bold -mt-8 shadow-md">
          1
        </div>
      </div>
    )
  }

  function generatePlaceCard(place: number) {
    return (
      <div className="flex flex-col items-center">
        <div className="bg-[#2D3745] text-white text-center text-nowrap px-2 py-2 w-24 h-28 rounded-lg flex flex-col items-center shadow-md clip-custom">
          <div className="w-8 h-8 relative flex justify-center items-center mb-2">
            <Image
              fill
              src={
                teams.filter(
                  (team) =>
                    team.id.toString() ===
                    filteredContent?.placings[place]?.teamId.toString(),
                )[0]?.image
              }
              alt=""
            />
          </div>
          <span className="text-xs">
            {filteredContent?.placings[place]?.name}
          </span>
          <span className="text-lg font-bold">
            {filteredContent?.placings[place]?.points}
          </span>
        </div>
        <div className="bg-[#C0C0C0] text-gray-900 text-xl z-0 w-10 h-10 rounded-full border-4 border-[#2D3745] flex items-center justify-center font-bold -mt-7 shadow-md">
          {place + 1}
        </div>
      </div>
    )
  }
}
