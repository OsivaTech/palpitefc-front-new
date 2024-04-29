'use server'
import { api, authorizedApi } from "@/data/api";
import { API_ROUTE } from "@/shared/constants";
import { League } from "@/shared/types/League";
import { FixtureResponse } from "@/shared/types/api/responses/FixtureResponse";
import { GuessResponse } from "@/shared/types/api/responses/GessResponse";


export async function getFixture(){
    try {
        const response = await api(API_ROUTE.getFixture,{
            method: 'GET'
        })
        
        const fixture: FixtureResponse = await response.json()
        
        if(!fixture){
            return [] as FixtureResponse
        }
        
        return fixture
    }catch{
        return null
    }
}

export async function getMyGuesses(){
    try{
        const response = await authorizedApi(API_ROUTE.getMyGuesses, {
            method: 'GET',
        })

        const myGuesses: GuessResponse = await response?.json()
        return myGuesses
    }catch(error){
        console.log(error)
        return null
    }
} 

export async function getLeagues(){
    try{
        const response = await api(API_ROUTE.legues, {
            method: 'GET'
        })

        const leagues: League[] = await response.json()

        return leagues
    }catch{
        return [] as League[]
    }
    
}