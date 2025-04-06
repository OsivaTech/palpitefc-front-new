'use client'

import { CustomSelect } from '@/components/custom-select/custom-select'
import { RANKING_TYPE } from '@/constants'
import { RankingResponse } from '@/types/api/responses/RankResponse'
import { useState } from 'react'
import Image from 'next/image'
import { Team } from '@/types/Team'
import { useTranslations } from 'use-intl'

type RankTabContentProp = {
  data: RankingResponse[]
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

export const RankingsPage = ({ data, teams }: RankTabContentProp) => {
  const t = useTranslations('components.matchboard-tab')

  const generalRank = {
    value: Math.max(...data.map((d) => d.info.month || 0)).toString(),
    type: RANKING_TYPE.MONTH,
  }

  const [generalFilter, setGeneralFilter] = useState<{
    value: null | string
    type: string
  }>({
    value: generalRank.value,
    type: generalRank.type,
  })

  const generalFilteredContent =
    generalFilter.type === generalRank.type
      ? data
          .filter((d) => d.type === generalFilter.type)
          .filter((m) => m.info.month?.toString() === generalFilter.value)[0]
      : data?.filter((d) => d.type === generalFilter.type)[0]

  const onGeneralFilterChange = (value: string, type: string) => {
    if (value === '0') {
      setGeneralFilter({ type: generalRank.type, value: generalRank.value })
    } else {
      setGeneralFilter({ type, value })
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="font-semibold">
          {t('rank.general.title')}
          {generalFilter.value !== '0'
            ? ' ' +
              month
                .filter((x) => x.id === generalFilter.value)[0]
                ?.name?.toLowerCase()
            : ''}
        </h2>
        {generalFilter.value !== '0' && (
          <div className="min-w-[71px]">
            <CustomSelect
              title={t('rank.filterText.month')}
              data={month}
              onValueChange={(value: string) =>
                onGeneralFilterChange(value, generalRank.type)
              }
            />
          </div>
        )}
      </div>
      {renderPlacings(generalFilteredContent)}
    </>
  )

  function renderPlacings(content: RankingResponse) {
    return (
      <div className="text-white mx-auto p-2 lg:container">
        <div className="flex justify-center">
          {content?.placings ? generatePlaceCard(content, 1) : null}
          {content?.placings ? generatePlaceCard(content, 0) : null}
          {content?.placings ? generatePlaceCard(content, 2) : null}
        </div>
        <div className="mt-4">
          {content?.placings.slice(3).map((place) => (
            <div
              key={place.id}
              className="flex justify-between items-center border border-app-secondary bg-[#2323235C] text-white px-4 py-2 rounded-lg mb-2 "
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
                    className="object-contain"
                  />
                </div>
                <span>{place.name}</span>
              </div>
              <span className="font-bold">{place.points}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  function generatePlaceCard(content: RankingResponse, place: number) {
    const isFirstPlace = place === 0
    const sizeClass = isFirstPlace ? 'w-36 h-36' : 'w-28 h-28'
    const imageSizeClass = isFirstPlace ? 'w-10 h-10' : 'w-8 h-8'
    const textSizeClass = isFirstPlace ? 'text-base' : 'text-xs'
    const placeNumberSizeClass = isFirstPlace
      ? 'text-2xl mt-[-38px] w-[50px] h-[50px]'
      : 'text-xl mt-[-29px] w-[38px] h-[38px]'

    return (
      <div className="flex flex-col items-center">
        <div
          className={`${sizeClass} flex flex-col items-center gap-1`}
          style={{
            backgroundImage: 'url(/assets/medal.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
          }}
        >
          <div
            className={`relative flex justify-center items-center mt-2 ${imageSizeClass}`}
          >
            <Image
              fill
              src={
                teams.filter(
                  (team) =>
                    team.id.toString() ===
                    content?.placings[place]?.teamId.toString(),
                )[0]?.image
              }
              alt=""
              className="object-contain"
            />
          </div>
          <span className={textSizeClass}>
            {content?.placings[place]?.name}
          </span>
          <span className={`${textSizeClass}`}>
            {content?.placings[place]?.points}
          </span>
        </div>
        <div
          className={`bg-[#2323235C] text-white rounded-full border border-app-secondary/70 flex items-center justify-center font-bold ${placeNumberSizeClass}`}
        >
          {place + 1}
        </div>
      </div>
    )
  }
}
