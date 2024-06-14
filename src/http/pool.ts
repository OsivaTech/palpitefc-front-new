'use server'
import { get, post } from "@/lib/api";
import { PoolsEndpoint, VoteEndpoint } from "@/lib/endpoints";
import { Quiz } from "@/types/Quiz";
import { QuizResponse } from "@/types/api/responses/QuizResponse";

export async function vote(pollId:number, optionId:string){
    try{
        const request = await post(VoteEndpoint(pollId, optionId), {}, true)
        console.log(request)
        if(request === null){
            return false    
        }
        const vote: Quiz = await request.json()
        return vote;
    }catch(error){
        console.log(error)
        return false
    }
}

export async function getQuiz(isLogged:boolean){
    try{
        let response;
        if(isLogged){
            response = await get(PoolsEndpoint,{},true)
        }else{
            response = await get(PoolsEndpoint, {}, false)
        }
        const quiz: QuizResponse = await response!.json()
        return quiz
    }catch(error){
        console.error('Error', error)
    }
}