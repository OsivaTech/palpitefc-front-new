import { Fixture } from "@/shared/types/Fixture";
import { Guess } from "@/shared/types/Guess";
import { Match } from "@/shared/types/Match";
import { ChangeEventHandler } from "react";

export type GuessCardContentType = {
    match: Match, 
    reverse?: boolean,
    onChange: ChangeEventHandler<HTMLInputElement> 
    value?: GuessForm
    disabled?: boolean
}
export type GuessCardProps = {
    fixture: Fixture
    guess: Guess
 }

export type GuessForm = {homeTeam: string, awayTeam: string}