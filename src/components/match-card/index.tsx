'use client'
import { CustomButton } from '@/components/custom-button'
import { Input } from '@/components/ui/input'
import { Fixture } from '@/types/Fixture'
import { Team } from '@/types/Team'
import { format, formatISO, isAfter } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { useCallback, useState, useTransition, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useToast } from '@/components/ui/use-toast'
import { makeAGuess } from '@/http/gesses'
import { APP_LINKS, MATCH_STATUS } from '@/constants'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/useAuth'
import { Guess } from '@/types/Guess'
import { cn } from '@/lib/utils'

const BlinkingText = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <span className={className}>{isVisible ? children : ''}</span>
}

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
            description: tCommon('guessSuccessMessage'),
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
        ' py-4 px-4 justify-between  flex-shrink-0 relative',
        'h-[221px] lg:w-[407px] w-[90vw]',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-1">
          {guessed ? (
            <Image
              src="/assets/palpite-ball.svg"
              alt={t('guessed-match')}
              width={12}
              height={12}
              title={t('guessed-match')}
            />
          ) : null}
          <span className="text-xs">
            {fixture.statusHumanized}
            {MATCH_STATUS.IN_PLAY.includes(fixture.status) && (
              <BlinkingText className="text-xs text-app-secondary">
                {' '}
                {fixture.elapsed}
                {"'"}
              </BlinkingText>
            )}
          </span>
        </div>
        <span className="text-xs">
          {format(fixture.start, 'dd/MM EE HH:mm', { locale: ptBR })}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <TeamShield team={fixture.homeTeam} />
        <div className="flex flex-col items-center gap-2 text-white">
          <div className="flex flex-row items-center gap-2">
            {renderScoreInputs({
              homeScore,
              awayScore,
              fixture,
              handleHomeScoreChange,
              handleAwayScoreChange,
            })}
          </div>
        </div>
        <TeamShield team={fixture.awayTeam} />
      </div>
      {getMatchGuess(guess, fixture)}
      {renderCardBottom()}
    </div>
  )

  function renderCardBottom() {
    if (!guessed && MATCH_STATUS.SCHEDULED.includes(fixture.status)) {
      return (
        <CardBottom
          handleClear={handleClear}
          handleGuess={handleGuess}
          isPending={isPending}
        />
      )
    }

    if (guessed && MATCH_STATUS.FINISHED.includes(fixture.status)) {
      return (
        <CustomButton
          variant="secondary"
          onClick={() =>
            router.push(
              `${locale}/${APP_LINKS.MYPOINTS()}?fixtureId=${fixture.id}`,
            )
          }
        >
          Ver pontos
        </CustomButton>
      )
    }

    return <div></div>
  }
}

const TeamShield = ({ team }: { team: Team }) => {
  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <div className="relative w-[50px] h-[50px]">
        <Image
          src={team.image}
          alt={team.name}
          fill
          className="object-contain"
        />
      </div>
      <span className="text-white text-xs text-center break-words">
        {team.name}
      </span>
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
        className="w-1/3 uppercase flex-1 lg:flex-none bg-[#D9D9D917]"
        onClick={handleClear}
      >
        {t('clear')}
      </CustomButton>
      <CustomButton
        variant="secondary"
        className="w-2/3 uppercase flex-2 lg:flex-1"
        onClick={handleGuess}
        isLoading={isPending}
      >
        {t('submit')}
      </CustomButton>
    </div>
  )
}

function renderScoreInputs({
  homeScore,
  awayScore,
  fixture,
  handleHomeScoreChange,
  handleAwayScoreChange,
}: {
  homeScore: number | null
  awayScore: number | null
  fixture: Fixture
  handleHomeScoreChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAwayScoreChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return isFixtureInProgressOrFinished(fixture) ? (
    <div className="flex flex-row items-center gap-4">
      <span className="text-5xl">{fixture.homeTeam.goals}</span>
      <span className="text-3xl">×</span>
      <span className="text-5xl">{fixture.awayTeam.goals}</span>
    </div>
  ) : (
    <>
      <Input
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-10 border-2 focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-white dark:text-white bg-transparent text-xl px-1 text-center "
        maxLength={2}
        placeholder="-"
        type="number"
        onChange={handleHomeScoreChange}
        value={
          isFixtureInProgressOrFinished(fixture)
            ? fixture.homeTeam.goals
            : (homeScore ?? '')
        }
      />
      <span className="text-3xl">×</span>
      <Input
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-10 border-2 focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-white dark:text-white bg-transparent text-xl px-1 text-center"
        maxLength={2}
        placeholder="-"
        type="number"
        onChange={handleAwayScoreChange}
        value={
          isFixtureInProgressOrFinished(fixture)
            ? fixture.awayTeam.goals
            : (awayScore ?? '')
        }
      />
    </>
  )
}

function getMatchGuess(guess: Guess[], fixture: Fixture) {
  const guessed = guess.find((x: Guess) => x.fixtureId === fixture.id)

  return guessed && isFixtureInProgressOrFinished(fixture) ? (
    <span className="text-xs text-[#FFFFFFB5] text-center">
      Seu palpite {guessed.homeTeam.goals} × {guessed.awayTeam.goals}
    </span>
  ) : null
}

function isFixtureInProgressOrFinished(fixture: Fixture) {
  return [...MATCH_STATUS.IN_PLAY, ...MATCH_STATUS.FINISHED].includes(
    fixture.status,
  )
}
