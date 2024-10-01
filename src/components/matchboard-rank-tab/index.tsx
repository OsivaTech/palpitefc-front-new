'use client'
import { CustomSelect } from '@/components/custom-select/custom-select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { APP_LINKS, RANKING_TYPE } from '@/constants'
import { League } from '@/types/League'
import { RankingResponse } from '@/types/api/responses/RankResponse'
import { useState } from 'react'
import Image from 'next/image'
import { Team } from '@/types/Team'
import { useLocale, useTranslations } from 'use-intl'
import { useAuth } from '@/context/useAuth'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

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
  const ts = useTranslations('components.subscription')
  const { user } = useAuth()
  const { push } = useRouter()
  const locale = useLocale()

  const generalRank = {
    value: Math.max(...data.map((d) => d.info.month || 0)).toString(),
    type: RANKING_TYPE.MONTH,
  }
  const vipRank = {
    value: Math.max(...data.map((d) => d.info.week || 0)).toString(),
    type: RANKING_TYPE.WEEKVIP,
  }

  const weeks = data
    .filter((d) => d.type === RANKING_TYPE.WEEK)
    .sort((a, b) => (a.info.week || 0) - (b.info.week || 0))
    .map((d) => ({
      id: d.info.week?.toString() || '',
      name: `${t('rank.vip.week')} ${d.info.week}`,
    }))

  const [generalFilter, setGeneralFilter] = useState<{
    value: null | string
    type: string
  }>({
    value: generalRank.value,
    type: generalRank.type,
  })

  const [vipFilter, setVipFilter] = useState<{
    value: null | string
    type: string
  }>({
    value: vipRank.value,
    type: vipRank.type,
  })

  const generalFilteredContent =
    generalFilter.type === generalRank.type
      ? data
          .filter((d) => d.type === generalFilter.type)
          .filter((m) => m.info.month?.toString() === generalFilter.value)[0]
      : data?.filter((d) => d.type === generalFilter.type)[0]

  const vipFilteredContent =
    vipFilter.type === vipRank.type
      ? data
          .filter((d) => d.type === vipFilter.type)
          .filter((m) => m.info.week?.toString() === vipFilter.value)[0]
      : data?.filter((d) => d.type === vipFilter.type)[0]

  const onGeneralFilterChange = (value: string, type: string) => {
    if (value === '0') {
      setGeneralFilter({ type: generalRank.type, value: generalRank.value })
    } else {
      setGeneralFilter({ type, value })
    }
  }

  const onVipFilterChange = (value: string, type: string) => {
    if (value === '0') {
      setVipFilter({ type: vipRank.type, value: vipRank.value })
    } else {
      setVipFilter({ type, value })
    }
  }

  return (
    <TabsContent value="rank">
      <Tabs defaultValue="general">
        <TabsList className="text-white bg-app-background flex gap-2">
          <TabsTrigger
            value="general"
            className="px-2 py-1 w-24 text-white font-semibold rounded-lg hover:bg-[#3a4a5a] data-[state=active]:bg-[#3a4a5a]"
            style={{ borderBottom: 'none' }}
          >
            {t('rank.general.tabTitle')}
          </TabsTrigger>
          <TabsTrigger
            value="vip"
            className="px-2 py-1 w-24 text-white font-semibold rounded-lg hover:bg-[#3a4a5a] data-[state=active]:bg-[#3a4a5a]"
            style={{ borderBottom: 'none' }}
          >
            {t('rank.vip.tabTitle')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="flex flex-col items-center justify-center gap-3 pb-2">
            <h2 className="font-semibold">
              {t('rank.general.title')}
              {generalFilter.value !== '0'
                ? ' ' +
                  month
                    .filter((x) => x.id === generalFilter.value)[0]
                    .name.toLowerCase()
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
        </TabsContent>
        <TabsContent value="vip">
          {user && user.isSubscribed ? (
            <div>
              <div className="flex flex-col items-center justify-center gap-3 pb-2">
                <h2 className="font-semibold">
                  {t('rank.vip.title')}
                  {vipFilter.value !== '0'
                    ? ' ' +
                      weeks
                        .filter((x) => x.id === vipFilter.value)[0]
                        .name.toLowerCase()
                    : ''}
                </h2>
                {generalFilter.value !== '0' && (
                  <div className="min-w-[71px]">
                    <CustomSelect
                      title={t('rank.filterText.week')}
                      data={weeks}
                      onValueChange={(value: string) =>
                        onVipFilterChange(value, vipRank.type)
                      }
                    />
                  </div>
                )}
              </div>
              {renderPlacings(vipFilteredContent)}
            </div>
          ) : (
            <div className="flex flex-col gap-4 px-4 text-center">
              <p>
                Você pode ganhar até R$ 2.000, por mês! Assine agora o Palpite
                VIP, por apenas R$ 9,99/mês.
              </p>
              <div className="gap-2">
                <p className="font-bold">Prêmios semanais:</p>
                <ul className="text-center">
                  <li>1º lugar: R$ 250</li>
                  <li>2º lugar: R$ 150</li>
                  <li>3º lugar: R$ 100</li>
                </ul>
              </div>
              <p>Clique no botão abaixo para assinar.</p>
              <Button
                onClick={() => push(`/${locale}/${APP_LINKS.SUBSCRIPTION()}`)}
                className="text-xl font-bold text-white bg-blue-500 rounded-full border border-white"
              >
                {ts('title')}
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </TabsContent>
  )

  function renderPlacings(content: RankingResponse) {
    return (
      <div className="text-white mx-auto p-2">
        <div className="flex justify-center gap-4 mb-4">
          {content?.placings ? generatePlaceCard(content, 1) : null}
          {content?.placings ? generatePlaceCard(content, 0) : null}
          {content?.placings ? generatePlaceCard(content, 2) : null}
        </div>
        <div className="mt-4">
          {content?.placings.slice(3).map((place) => (
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
    )
  }

  function generatePlaceCard(content: RankingResponse, place: number) {
    const isFirstPlace = place === 0
    const sizeClass = isFirstPlace ? 'w-28 h-36' : 'w-24 h-28'
    const imageSizeClass = isFirstPlace ? 'w-10 h-10' : 'w-8 h-8'
    const textSizeClass = isFirstPlace ? 'text-xl' : 'text-lg'
    const placeNumberSizeClass = isFirstPlace
      ? 'text-2xl w-12 h-12'
      : 'text-xl w-10 h-10'
    const placeNumberMarginClass = isFirstPlace ? '-mt-8' : '-mt-7'

    return (
      <div className="flex flex-col items-center">
        <div
          className={`bg-[#2D3745] text-white text-center text-nowrap px-2 py-2 ${sizeClass} rounded-lg flex flex-col items-center shadow-md clip-custom`}
        >
          <div
            className={`relative flex justify-center items-center mb-2 ${imageSizeClass}`}
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
            />
          </div>
          <span className={isFirstPlace ? '' : 'text-xs'}>
            {content?.placings[place]?.name}
          </span>
          <span className={`font-bold ${textSizeClass}`}>
            {content?.placings[place]?.points}
          </span>
        </div>
        <div
          className={`bg-[#C0C0C0] text-gray-900 z-0 rounded-full border-4 border-[#2D3745] flex items-center justify-center font-bold shadow-md ${placeNumberSizeClass} ${placeNumberMarginClass}`}
        >
          {place + 1}
        </div>
      </div>
    )
  }
}
