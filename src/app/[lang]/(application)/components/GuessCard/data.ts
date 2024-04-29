'use server'
import { authorizedApi } from "@/data/api";
import { API_ROUTE } from "@/shared/constants";
import { GuessesRequest } from "@/shared/types/api/resquests/GuessesRequest";

export async function makeAGuess(guess: GuessesRequest){
    try{
        await authorizedApi(API_ROUTE.guesses, {
            body: JSON.stringify(guess),
            method: "POST"
        } )
        return true
    }catch{
        return false
    }
}