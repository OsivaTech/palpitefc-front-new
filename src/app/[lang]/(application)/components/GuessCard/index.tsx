'use client'
import { LockKeyhole, X } from 'lucide-react';
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslations } from "use-intl";
import { parseISO, format, Day } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {  useCallback, useState, useTransition } from "react";
import { makeAGuess } from '@/app/[lang]/(application)/components/GuessCard/data';
import { GuessCardProps, GuessForm, GuessCardContentType } from '@/app/[lang]/(application)/components/GuessCard/type';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/Spinner';

export const GuessCard = ( {
    fixture,
    guess
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
            homeTeam: guess?.homeTeam?.goal.toString(), 
            awayTeam: guess?.awayTeam?.goal.toString()
        })
    const [isPending, startTransition] = useTransition();

    const onSubmit = useCallback( async () =>  {
        try{
            const response = await makeAGuess({
                fixtureId: fixture.id,
                homeTeam: {
                    id: fixture.homeTeam.id,
                    goal: parseInt(guessForm.homeTeam)
                },
                awayTeam: {
                    id: fixture.awayTeam.id,
                    goal: parseInt(guessForm.awayTeam)
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
    },[fixture.awayTeam.id, fixture.homeTeam.id, fixture.id, guessForm.awayTeam, guessForm.homeTeam, router, t, toast])

    const handleChange = useCallback((evt: any, team: string) => {
        setGuessForm(old => ({...old, [team]: evt.target.value}))
    },[])
    
    return (
        <Card className="bg-[#2D3745] h-[148px] w-[376px] py-3 px-3 border-0 border-b">
            <CardContent className="flex flex-col p-0 gap-2" >
                <div className="flex justify-between items-center text-xs  ">
                    <div className="flex w-full items-center gap-2">
                        {guess && (

                            <span className="text-[#FFFFFF]/50 flex items-center gap-1 ">
                            <LockKeyhole size={14}  />
                            {t('components.GuessCard.myGuesses')}
                        </span>
                        )}
                        <span className="text-white">{fixture?.name}</span>
                    </div>
                    <span className="text-white min-w-[114px]">{`${day} ${dayOfWeekFormated} ${time}`}</span>
                </div>

                <div className="flex justify-between items-center text-white ">
                    <GuessCardContent disabled={!!guess} value={guessForm} onChange={(evt) => handleChange(evt, 'homeTeam')}  match={fixture.homeTeam} />
                        <div className="flex justify-center items-center  ">
                            <X className="self-center   mx-3 " />
                        </div>
                    <GuessCardContent disabled={!!guess} value={guessForm} match={fixture.awayTeam} reverse={true} onChange={(evt) => handleChange(evt, 'awayTeam')} />
                </div>
            </CardContent>
            <CardFooter className="flex justify-center items-center mt-2">
                <Button type='submit' onClick={onSubmit} disabled={isPending} className={cn(!!guess && 'hidden', "gap-2 h-6 w-48 bg-green-500 hover:bg-green-700 ")}>
                    {isPending && (<Spinner size='xs' /> )}
                    {t('components.GuessCard.guess')}
                </Button>
            </CardFooter>
        </Card>
    )
}


export const GuessCardContent = ({match, reverse,onChange, value, ...rest}: GuessCardContentType) => {
    return (
        <div className={cn("flex flex-1 justify-between items-center gap-3 ", reverse && 'flex-row-reverse',)} >
            <div className="flex flex-col items-center justify-center ">
                <Image src={match.image} width={50} height={50} alt=""  />
                <span className="text-xs text-center" >{match.name}</span>
            </div>
            <Input 
                className="w-10 text-black text-xl px-2 text-center"
                maxLength={2}   
                placeholder="0"
                onChange={onChange}
                value={reverse? value?.awayTeam : value?.homeTeam}
                {...rest}
                />
        </div>
    )
}