'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useTranslations } from 'next-intl'
import { TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, X } from 'lucide-react'
import { format } from 'date-fns'
import { Fixture } from '@/types/Fixture'
import { League } from '@/types/League'
import { Guess } from '@/types/Guess'
import { CustomSelect } from '@/components/custom-select/custom-select'
import { GuessCard } from '@/components/guess-card'
import { FormatedFixture } from '@/components/matchboard-match-tab/types'
import { Advertisament } from '@/types/Advertisament'
import { BannerFixed } from '../bannerFixed'

type MatchTabContentProps = {
  data: Fixture[] | null
  leagues: League[]
  guess: Guess[]
  advertisament: Advertisament[]
}

export const MatchTabContent = ({
  data,
  leagues,
  guess,
  advertisament,
}: MatchTabContentProps) => {
  const { toast } = useToast()
  const t = useTranslations()
  const [selectedFixture, setSelectedfixture] = useState<Fixture | null>(null)
  const [filter, setFilter] = useState({
    selectedLeague: '0',
    onlyGuesses: false,
  })

  useEffect(() => {
    if (data === null) {
      toast({
        title: t('common.error'),
        description: t('components.matchboard-tab.match.error'),
        variant: 'destructive',
      })
    }
  }, [data, toast, t])

  const filteredOption = data
    ?.filter((d) =>
      filter.onlyGuesses ? guess?.find((g) => g.fixtureId === d.id) : d,
    )
    ?.filter((d) =>
      filter.selectedLeague === '0'
        ? d
        : d.leagueId.toString() === filter.selectedLeague,
    )
    .map((f) => ({ ...f, startDateFormated: format(f.start, 'dd/MM/yyyy') }))

  function groupBy(
    property: keyof FormatedFixture,
    collection?: FormatedFixture[],
  ) {
    if (!collection) return []
    let i = 0
    let val
    let index
    const values = []
    const result = []
    for (; i < collection?.length; i++) {
      val = collection[i][property]
      index = values.indexOf(val)
      if (index > -1) result[index].push(collection[i])
      else {
        values.push(val)
        result.push([collection[i]])
      }
    }
    return result
  }

  const groupByStartDate = groupBy('startDateFormated', filteredOption)

  let globalIndex = 0
  const BANNER_INTERVAL = 5

  return (
    // FILTER
    <div>
      <TabsContent value="match" className="py-3 px-2 overflow-hidden">
        <div className="flex items-center gap-3 pb-2">
          {filter.onlyGuesses && (
            <Badge
              onClick={() =>
                setFilter((old) => ({ ...old, onlyGuesses: false }))
              }
              className="cursor-pointer p-0"
            >
              <X size={20} />
            </Badge>
          )}
          <Badge
            onClick={() => setFilter((old) => ({ ...old, onlyGuesses: true }))}
            variant={filter.onlyGuesses ? 'default' : 'outline'}
            className="flex justify-center items-center h-7 min-w-28 cursor-pointer border-white"
          >
            {t('components.matchboard-tab.match.myGuesses')}
          </Badge>
          <CustomSelect
            title="Campeonatos"
            data={leagues.map((l) => ({ id: l.id.toString(), name: l.name }))}
            onValueChange={(value: string) =>
              setFilter((old) => ({ ...old, selectedLeague: value }))
            }
          />
        </div>

        <div className="pt-5 flex flex-col justify-center items-start gap-2 overflow-auto h-4/6">
          {groupByStartDate.map((g, index) => (
            <React.Fragment key={index}>
              <span className="text-sm flex items-center gap-2 font-medium mb-2">
                <CalendarDays size={16} />
                {g[0].startDateFormated}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-3 w-full">
                {g?.map((fixture) => (
                  <Fragment key={fixture.id}>
                    <GuessCard
                      key={fixture.id}
                      fixture={fixture}
                      league={
                        leagues.filter((l) => l.id === fixture.leagueId)[0]
                      }
                      guess={guess?.find((g) => g.fixtureId === fixture.id)}
                      setSelectedfixture={setSelectedfixture}
                      selectedFixture={selectedFixture}
                    />
                    {++globalIndex % BANNER_INTERVAL === 0 && ( // Passo 2 e 3: Incremente e verifique se deve mostrar o BannerFixed
                      <BannerFixed
                        key={`banner-${globalIndex}`}
                        item={
                          advertisament[
                            Math.floor((globalIndex - 1) / BANNER_INTERVAL) %
                              advertisament.length
                          ]
                        }
                      />
                    )}
                  </Fragment>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </TabsContent>
    </div>
  )
}
