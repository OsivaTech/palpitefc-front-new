import { Fixture } from "@/shared/types/Fixture";
import { Guess } from "@/shared/types/Guess";
import { League } from "@/shared/types/League";
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
    guess: Guess | undefined
    league: League
 }

export type GuessForm = {homeTeam: string, awayTeam: string}