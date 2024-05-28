'use server'

import { authorizedApi } from "@/data/api"
import { API_ROUTE } from "@/shared/constants"
import { Quiz } from "@/shared/types/Quiz"

export async function vote(pollId:number, optionId:string){
    console.log(pollId, optionId)

    try{
        const request = await authorizedApi(API_ROUTE.vote(pollId, optionId), {
            method: 'POST'
        })
        
        if(request === null){
            return false    
        }

        const vote: Quiz = await request.json()
        return vote;
    }catch{
        return false
    }
}