'use client'

import { ChevronDown } from 'lucide-react';
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslations } from "use-intl";
import { parseISO, format, Day } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCallback, useState, useTransition } from "react";
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { GuessCardProps, GuessForm, GuessCardContentType } from '@/components/guess-card/type';
import { useAuth } from '@/context/useAuth';
import { makeAGuess } from '@/http/gesses';
import { Spinner } from '@/components/spinner';
import { APP_LINKS } from '@/constants';

export const GuessCard = ( {
    fixture,
    guess,
    league
}: GuessCardProps ) => {
    const router = useRouter()
    const t = useTranslations()
    const startDate = parseISO(fixture.start)
    const dayOfWeek = format(startDate, 'i') === '7' ? 0 : format(startDate, 'i')
    const dayOfWeekFormated =  ptBR.localize.day(dayOfWeek as unknown as Day, {
        width: "abbreviated"
    })
    const day = format(startDate, 'dd/MM')
    const time = format(startDate, 'H:mm')
    const {toast} = useToast()
    const [guessForm, setGuessForm] = useState<GuessForm>(
        { 
            homeTeam: guess?.homeTeam?.goals.toString() || '' , 
            awayTeam: guess?.awayTeam?.goals.toString()  || ''
        })
    const [isPending, startTransition] = useTransition();
    const [isCoppalsed, setIsCollapsed] = useState(true)
    const {isAuthenticated} = useAuth()

    const locale = useLocale()

    const onSubmit = useCallback( async () =>  {
        if(!isAuthenticated) {
            router.push(`${locale}/${APP_LINKS.SIGNIN()}`)
            return;
        }
        try{
            const response = await makeAGuess({
                fixtureId: fixture.id,
                homeTeam: {
                    id: fixture.homeTeam.id,
                    goals: parseInt(guessForm.homeTeam)
                },
                awayTeam: {
                    id: fixture.awayTeam.id,
                    goals: parseInt(guessForm.awayTeam)
                }
            });
            
            startTransition(() => {
                router.refresh()
            });

            if(!response){
                toast({
                    title: t('common.error'),
                    description: t('common.genericErrorMessage'),
                    variant: 'destructive'
                })
            }
        }catch{
            toast({
                title: t('common.error'),
                description: "Somentes numeros são permitidos",
                variant: 'destructive'
            })
        }
    },[fixture.awayTeam.id, fixture.homeTeam.id, fixture.id, guessForm.awayTeam, guessForm.homeTeam, isAuthenticated, locale, router, t, toast])

    const handleChange = useCallback((evt: any, team: string) => {
        setGuessForm(old => ({...old, [team]: evt.target.value}))
    },[])
    
    return (
    <>
        {!isCoppalsed && (
            <Card className="bg-[#2D3745]   px-4 py-2 border-0 border-b font-medium flex flex-col justify-between">
                <span className='font-semibold text-sm' >{t('components.guess-card.title')}</span> 
                <div className='h-[1px] bg-slate-300 my-2' />
                <CardContent className="flex flex-col p-0 gap-2 justify-center" >
                    <div className="flex justify-between items-center text-xs  ">
                        <div className="flex w-full items-center gap-2 justify-start">
                            {/* {guess && (

                                <span className="text-[#FFFFFF]/50 flex items-center gap-1 ">
                                <LockKeyhole size={14}  />
                                {t('components.GuessCard.myGuesses')}
                            </span>
                            )} */}
                            <div className='w-5 h-5 relative flex justify-center items-center'>
                                <Image fill src={league.image}  alt='league shield'/>
                            </div>
                            <span className="text-white">{fixture.name}</span>
                        </div>
                        <span className="text-white min-w-[114px]">{`${day} ${dayOfWeekFormated} ${time}`}</span>
                    </div>

                    <div className="flex justify-between items-center text-white   mx-auto ">
                        <GuessCardContent disabled={!!guess} value={guessForm} onChange={(evt) => handleChange(evt, 'homeTeam')}  match={fixture.homeTeam} />
                            <span className="self-center mx-8 flex justify-center items-center text-lg font-extrabold">
                                X
                            </span>
                        <GuessCardContent disabled={!!guess} value={guessForm} match={fixture.awayTeam} reverse={true} onChange={(evt) => handleChange(evt, 'awayTeam')} />
                    </div>
                </CardContent>
                
                <CardFooter className="flex flex-col justify-center items-center p-0 mt-8 ">
                    <Button type='submit' onClick={onSubmit} disabled={!(guessForm.awayTeam.length > 0 && guessForm.homeTeam.length > 0)}
                            className={cn(!!guess && 'hidden', "uppercase gap-2 bg-white w-full h-[30px] hover:bg-none disabled:text-[#A4A4AC] disabled:bg-[#E9E9EF] ")}>
                        {isPending && (<Spinner size='xs' /> )}
                        {t('components.guess-card.submit')}
                    </Button>
                    <Button variant='ghost' onClick={() => setIsCollapsed(true)}  
                            className={cn(!!guess && 'hidden', " dark:text-white uppercase hover:bg-transparent w-full  ")}>
                        {t("common.cancel")}
                    </Button>
                </CardFooter>
            </Card>
        )}
        {isCoppalsed && (
            <Card onClick={() => setIsCollapsed(false)} className='flex gap-2 py-3 px-2 bg-[#2D3745] cursor-pointer max-h-[51px]'>
                <div className='flex justify-start items-center' >
                    <span className='min-[320px]:w-[90px] min-[375px]:w-[130px] min-[425px]:w-[150px] overflow-hidden text-ellipsis text-nowrap'>
                        {fixture.homeTeam.name}
                    </span>
                    <Image src={fixture.homeTeam.image} width={25} height={25} alt=''/>
                </div>
                X
                <div className='flex justify-center flex-row-reverse items-center'>
                    <span className='min-[320px]:w-[90px] min-[375px]:w-[130px] min-[425px]:w-[150px] ml-4  overflow-hidden text-ellipsis text-nowrap'>
                        {fixture.awayTeam.name}
                    </span>
                    <Image src={fixture.awayTeam.image} width={25} height={25} alt=''/>
                </div>

                <ChevronDown className='ml-auto '/>
            </Card>
        )}
    </>

    )
}


export const GuessCardContent = ({match, reverse,onChange, value, ...rest}: GuessCardContentType) => {
    return (
        <div className={cn("flex gap-10 mt-[18px]", reverse && 'flex-row-reverse',)} >
            <div className="flex flex-col ">
                <Image src={match.image} width={40} height={40} alt=""  />
                {/* <span className="text-xs text-center" >{match.name}</span> */}
            </div>
            <Input 
                className="w-10 border dark:border-white dark:text-white bg-transparent text-xl px-2 text-center"
                maxLength={2}   
                placeholder="-"
                onChange={onChange}
                value={reverse? value?.awayTeam : value?.homeTeam}
                {...rest}
                />
        </div>
    )
}