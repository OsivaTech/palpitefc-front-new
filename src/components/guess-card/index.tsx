/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ChevronUp } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useTranslations } from 'use-intl'
import { parseISO, format, Day, formatISO, isAfter } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import {
  ChangeEvent,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import {
  GuessCardProps,
  GuessForm,
  GuessCardContentType,
} from '@/components/guess-card/type'
import { useAuth } from '@/context/useAuth'
import { makeAGuess } from '@/http/gesses'
import { Spinner } from '@/components/spinner'
import { APP_LINKS } from '@/constants'
import { TooltipProvider } from '@/components/ui/tooltip'

export const GuessCard = ({
  fixture,
  guess,
  league,
  setSelectedfixture,
  selectedFixture,
}: GuessCardProps) => {
  const router = useRouter()
  const t = useTranslations()
  const startDate = parseISO(fixture.start)
  const dayOfWeek = format(startDate, 'i') === '7' ? 0 : format(startDate, 'i')
  const dayOfWeekFormated = ptBR.localize.day(dayOfWeek as unknown as Day, {
    width: 'abbreviated',
  })
  const day = format(startDate, 'dd/MM')
  const time = format(startDate, 'H:mm')
  const { toast } = useToast()
  const [guessForm, setGuessForm] = useState<GuessForm>({
    homeTeam: guess?.homeTeam?.goals.toString() || '',
    awayTeam: guess?.awayTeam?.goals.toString() || '',
  })
  const [isPending, startTransition] = useTransition()
  const { isAuthenticated } = useAuth()

  const locale = useLocale()

  const checkIfCanBeVoted = useCallback(() => {
    const gameStart = formatISO(fixture.start)
    const now = formatISO(new Date())

    if (isAfter(now, gameStart)) {
      return false
    }
    return true
  }, [fixture.start])

  const onSubmit = useCallback(async () => {
    if (!checkIfCanBeVoted()) {
      toast({
        title: t('common.error'),
        description: t('components.guess-card.error'),
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
            goals: parseInt(guessForm.homeTeam),
          },
          awayTeam: {
            id: fixture.awayTeam.id,
            goals: parseInt(guessForm.awayTeam),
          },
        })

        router.refresh()

        if (!response) {
          toast({
            title: t('common.error'),
            description: t('common.genericErrorMessage'),
            variant: 'destructive',
          })
        } else {
          toast({
            title: 'Sucesso',
            description: 'Palpite enviado com sucesso',
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
    checkIfCanBeVoted,
    fixture.awayTeam.id,
    fixture.homeTeam.id,
    fixture.id,
    guessForm.awayTeam,
    guessForm.homeTeam,
    isAuthenticated,
    locale,
    router,
    t,
    toast,
  ])

  const handleChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>, team: string) => {
      setGuessForm((old) => ({ ...old, [team]: evt.target.value }))
    },
    [],
  )

  const renderCollapseOpen = useMemo(() => {
    return (
      <>
        {fixture.id === selectedFixture?.id && (
          <Card className="bg-[#2D3745] px-2 py-2 border-0 border-b font-medium flex flex-col justify-between w-full relative">
            <div className="flex justify-between">
              <span className="font-semibold text-sm">
                {t('components.guess-card.title')}
              </span>
              <ChevronUp
                size={25}
                className="cursor-pointer"
                onClick={() => setSelectedfixture(null)}
              />
            </div>
            <div className="h-[1px] bg-slate-300 my-2" />
            <CardContent className="flex flex-col p-0 gap-2 justify-center">
              <div className="flex justify-between items-center text-xs">
                <div className="flex w-full items-center gap-2 justify-start ">
                  <div className="w-5 h-5 relative flex justify-center items-center">
                    <Image fill src={league.image} alt="league shield" />
                  </div>
                  <span className="text-white">{league.name}</span>
                </div>
                <span className="flex text-white w-full self-center justify-end">{`${day} ${dayOfWeekFormated} ${time}`}</span>
              </div>

              <div className="flex justify-between items-center text-white mt-2">
                <GuessCardContent
                  disabled={!!guess}
                  value={guessForm}
                  onChange={(evt) => handleChange(evt, 'homeTeam')}
                  match={fixture.homeTeam}
                />
                <span className="self-center mx-8 flex justify-center items-center text-lg font-extrabold">
                  X
                </span>
                <GuessCardContent
                  disabled={!!guess}
                  value={guessForm}
                  match={fixture.awayTeam}
                  reverse={true}
                  onChange={(evt) => handleChange(evt, 'awayTeam')}
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-row justify-center items-center gap-4 p-0 mt-2">
              <Button
                variant="secondary"
                onClick={() => setSelectedfixture({ ...fixture, id: 0 })}
                className={cn(
                  !!guess && 'hidden',
                  'gap-2 border border-white w-1/3 h-[30px] hover:bg-none',
                )}
              >
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                onClick={onSubmit}
                disabled={
                  !(
                    guessForm.awayTeam.length > 0 &&
                    guessForm.homeTeam.length > 0
                  ) && checkIfCanBeVoted()
                }
                className={cn(
                  !!guess && 'hidden',
                  'gap-2 bg-white w-1/2 h-[30px] hover:bg-none disabled:text-[#A4A4AC] disabled:bg-[#E9E9EF] ',
                )}
              >
                {isPending && <Spinner size="xs" />}
                {t('components.guess-card.submit')}
              </Button>
            </CardFooter>
            {!checkIfCanBeVoted() && (
              <div className="top-0 left-0 absolute flex justify-center items-center w-full h-full bg-app-background/70 z-10">
                <span className="text-white text-lg z-0">
                  {t('components.guess-card.gameAlreadyStarted')}
                </span>
              </div>
            )}
          </Card>
        )}
      </>
    )
  }, [
    checkIfCanBeVoted,
    day,
    dayOfWeekFormated,
    fixture,
    guess,
    guessForm,
    handleChange,
    isPending,
    league.image,
    onSubmit,
    selectedFixture?.id,
    setSelectedfixture,
    t,
    time,
  ])

  return <TooltipProvider>{renderCollapseOpen}</TooltipProvider>
}

export const GuessCardContent = ({
  match,
  reverse,
  onChange,
  value,
  ...rest
}: GuessCardContentType) => {
  const handleChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const inputValue = evt.target.value.slice(0, 2)
      onChange({ ...evt, target: { ...evt.target, value: inputValue } })
    },
    [onChange],
  )

  return (
    <div
      className={cn(
        'flex h-full items-center justify-between w-full ',
        reverse && 'flex-row-reverse',
      )}
    >
      <div className="flex flex-col gap-2 justify-between flex-1">
        <div className="relative h-[40px] w-[40px] self-center">
          <Image src={match.image} fill className="object-contain" alt="" />
        </div>
        <span className="text-xs text-center w-full">{match.name}</span>
      </div>
      <Input
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-10 border-2 focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-white/50 dark:text-white bg-app-background text-xl px-2 text-center "
        maxLength={2}
        placeholder="-"
        type="number"
        onChange={handleChange}
        value={reverse ? value?.awayTeam : value?.homeTeam}
        {...rest}
      />
    </div>
  )
}
