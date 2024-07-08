'use client'
import { CustomSelect } from '@/components/custom-select/custom-select'
import { useAuth } from '@/context/useAuth'
import { League } from '@/types/League'
import { Separator } from '@radix-ui/react-separator'
import { CalendarDays } from 'lucide-react'

import { mothersMock } from '../../mocks/mothersMock'

import Image from 'next/image'
import { GuessResponse } from '@/types/api/responses/GessResponse'
import { PointsResponse } from '@/types/api/responses/PointsResponse'

type MyPointsPageProps = {
  leagues: League[]
  guess: GuessResponse | null
  points: PointsResponse | null
}

const MyPointsPage = ({ leagues, guess, points }: MyPointsPageProps) => {
  const { user } = useAuth()

  const renderHeaderMyPoints = () => {
    return (
      <>
        <div className="flex justify-start items-end gap-3 ml-6  pt-6 mb-6">
          {user?.team.image && (
            <Image src={user?.team?.image} height={32} width={32} alt="" />
          )}
          <span className="h-full">{user?.name}</span>
        </div>

        <Separator className="mb-6 border border-white/50 pl-4" />

        <div className="flex items-center gap-3 pb-2">
          <div className="min-w-[71px] mx-auto">
            <CustomSelect
              title="Meses"
              data={mothersMock.map((l) => ({
                id: l.id.toString(),
                name: l.name,
              }))}
              /* onValueChange={(value: string) =>
          setFilter((old) => ({ ...old, selectedLeague: value })) } */
            />
          </div>

          <CustomSelect
            title="Campeonatos"
            data={leagues.map((l) => ({ id: l.id.toString(), name: l.name }))}
            /* onValueChange={(value: string) =>
          setFilter((old) => ({ ...old, selectedLeague: value })) } */
          />
        </div>
      </>
    )
  }

  const renderContentCard = () => {
    return (
      <>
        <div className="w-full bg-app-background mt-2 h-full rounded-md placeholder:uppercase text-white px-[20px] py-[12px] font-medium text-xs ">
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <div className="relative  gap-2 flex justify-center items-center">
                {user?.team.image && (
                  <Image
                    src={user?.team?.image}
                    height={20}
                    width={20}
                    alt=""
                  />
                )}
                <div>Premier League</div>
              </div>
            </div>
            <div className="flex  items-center">23/05 Terça 17:00</div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col gap-2 justify-between flex-1">
              <div className="relative h-[40px] w-[40px] self-center">
                {user?.team.image && (
                  <Image
                    src={user?.team?.image}
                    height={35}
                    width={35}
                    alt=""
                  />
                )}
              </div>
              <span className="text-xs text-center w-full">
                Tottenham Hotspur
              </span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <span className="text-center text-4xl">3</span>
              <span className="text-center text-4xl">x</span>
              <span className="text-center text-4xl">3</span>
            </div>

            <div className="flex flex-col gap-2 justify-between flex-1">
              <div className="relative h-[40px] w-[40px] self-center">
                {user?.team.image && (
                  <Image
                    src={user?.team?.image}
                    height={35}
                    width={35}
                    alt=""
                  />
                )}
              </div>
              <span className="text-xs text-center w-full">
                Universidad Católica
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <span className="text-sm text-center text-gray-400 w-full">
              Seu palpite 3 X 3
            </span>
          </div>

          <Separator className="mt-2 mb-2 border border-white/50 pl-4" />

          <div className="flex justify-between">
            <span className="text-sm">Placar exato</span>
            <span className="text-sm">+ 10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Palpite antecipado</span>
            <span className="text-sm">+ 1</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm">Total</span>
            <span className="text-sm">+ 11</span>
          </div>
        </div>
      </>
    )
  }
  console.log('points', points)
  console.log('guess', guess)
  return (
    <>
      {renderHeaderMyPoints()}

      <span className="text-sm flex items-center gap-2 font-medium mt-6">
        <CalendarDays size={16} />
        23/05/2024
      </span>

      {renderContentCard()}
      {renderContentCard()}

      <div className="fixed bottom-1 w-full max-w-[500px] ">
        <div className="w-full bg-app-background h-[38px] text-white px-[20px] py-[12px] font-medium text-xs">
          <div className="flex justify-between">
            <div>TOTAL DE PONTOS</div>
            <div>24</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyPointsPage
