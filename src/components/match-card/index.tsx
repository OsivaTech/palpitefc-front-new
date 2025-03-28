'use client'
import { CustomButton } from '@/components/custom-button'
import { Input } from '@/components/ui/input'
import { Fixture } from '@/types/Fixture'
import { Team } from '@/types/Team'
import { format, formatISO, isAfter } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { useCallback, useState, useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useToast } from '@/components/ui/use-toast'
import { makeAGuess } from '@/http/gesses'
import { APP_LINKS } from '@/constants'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/useAuth'
import { Guess } from '@/types/Guess'
import { cn } from '@/lib/utils'

export const MatchCard = ({
  fixture,
  guess,
}: {
  fixture: Fixture
  guess: Guess[]
}) => {
  const guessed = guess?.find((g) => g.fixtureId === fixture.id) ?? null

  const [homeScore, setHomeScore] = useState<number | null>(
    guessed?.homeTeam.goals ?? null,
  )
  const [awayScore, setAwayScore] = useState<number | null>(
    guessed?.awayTeam.goals ?? null,
  )
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('components.guess-card')
  const tCommon = useTranslations('common')
  const router = useRouter()
  const locale = useLocale()
  const { toast } = useToast()
  const { isAuthenticated } = useAuth()
  const gameAlreadyStarted = isAfter(new Date(), fixture.start)

  const handleHomeScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 99) {
      return
    }
    setHomeScore(Number(e.target.value))
  }

  const handleAwayScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 99) {
      return
    }
    setAwayScore(Number(e.target.value))
  }

  const handleClear = () => {
    setHomeScore(null)
    setAwayScore(null)
  }

  const checkIfCanBeVoted = useCallback(() => {
    const gameStart = formatISO(fixture.start)
    const now = formatISO(new Date())

    if (isAfter(now, gameStart)) {
      return false
    }
    return true
  }, [fixture.start])

  const handleGuess = useCallback(async () => {
    if (!checkIfCanBeVoted()) {
      toast({
        title: tCommon('error'),
        description: tCommon('genericErrorMessage'),
        variant: 'destructive',
      })
      return
    }
    console.log('isAuthenticated', isAuthenticated)

    if (!isAuthenticated) {
      router.push(`${locale}/${APP_LINKS.SIGNIN()}`)
      return
    }

    try {
      startTransition(async () => {
        const response = await makeAGuess({
          fixtureId: fixture.id,
          homeTeam: {
            id: fixture.homeTeam.id,
            goals: homeScore ?? 0,
          },
          awayTeam: {
            id: fixture.awayTeam.id,
            goals: awayScore ?? 0,
          },
        })
        console.log(response)

        router.refresh()

        if (!response) {
          toast({
            title: tCommon('error'),
            description: tCommon('genericErrorMessage'),
            variant: 'destructive',
          })
        } else {
          toast({
            title: tCommon('success'),
            description: tCommon('genericSuccessMessage'),
            variant: 'default',
          })
        }
      })
    } catch {
      toast({
        title: t('common.error'),
        description: 'Somentes numeros são permitidos',
        variant: 'destructive',
      })
    }
  }, [
    awayScore,
    checkIfCanBeVoted,
    fixture.awayTeam.id,
    fixture.homeTeam.id,
    fixture.id,
    homeScore,
    isAuthenticated,
    locale,
    router,
    t,
    tCommon,
    toast,
  ])

  return (
    <div
      className={cn(
        'flex flex-col border border-app-secondary bg-[#232323]/40 rounded-lg ',
        ' py-4 px-6 space-y-6 justify-between  flex-shrink-0 relative',
        'h-[221px] lg:w-[407px] w-[90vw]',
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px]">{fixture.statusHumanized}</span>
        <span className="text-[10px]">
          {format(fixture.start, 'dd/MM EE HH:mm', { locale: ptBR })}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <TeamShield team={fixture.homeTeam} />
        <div className="flex items-end  text-white mt-2 mx-4">
          <Input
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-10 border-2 focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-white dark:text-white bg-app-background text-xl px-1 text-center "
            maxLength={2}
            placeholder="-"
            type="number"
            onChange={handleHomeScoreChange}
            value={homeScore ?? ''}
          />
          <span className=" mx-4 text-lg">X</span>
          <Input
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-10 border-2 focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-white dark:text-white bg-app-background text-xl px-1 text-center "
            maxLength={2}
            placeholder="-"
            type="number"
            onChange={handleAwayScoreChange}
            value={awayScore ?? ''}
          />
        </div>
        <TeamShield team={fixture.awayTeam} />
      </div>

      {!guessed ? (
        <CardBottom
          handleClear={handleClear}
          handleGuess={handleGuess}
          isPending={isPending}
        />
      ) : (
        <div></div>
      )}
      {gameAlreadyStarted && (
        <div className="absolute flex items-center justify-center bottom-0 left-0 right-0 bg-app-background/70 rounded-lg p-2 h-full w-full">
          <p className="text-white text-2xl font-bold">
            {t('gameAlreadyStarted')}
          </p>
        </div>
      )}
    </div>
  )
}

const TeamShield = ({ team }: { team: Team }) => {
  return (
    <div className="flex flex-col items-center gap-2 flex-1 w-[100px]">
      <div className="relative w-[50px] h-[50px]">
        <Image
          src={team.image}
          alt={team.name}
          fill
          className="object-contain"
        />
      </div>
      <span className="text-white text-sm text-center">{team.name}</span>
    </div>
  )
}

const CardBottom = ({
  handleClear,
  handleGuess,
  isPending,
}: {
  handleClear: () => void
  handleGuess: () => void
  isPending: boolean
}) => {
  const t = useTranslations('components.match-card')

  return (
    <div className="flex gap-2 items-center justify-between">
      <CustomButton
        variant="primary"
        className="w-full uppercase flex-1 lg:flex-none"
        onClick={handleClear}
      >
        {t('clear')}
      </CustomButton>
      <CustomButton
        variant="secondary"
        className="w-full uppercase  flex-2 lg:flex-1"
        onClick={handleGuess}
        isLoading={isPending}
      >
        {t('submit')}
      </CustomButton>
    </div>
  )
}
