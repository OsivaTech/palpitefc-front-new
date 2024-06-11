'use server'
import { get } from "@/lib/api"
import { FixturesEndpoint } from "@/lib/endpoints"
import { FixtureResponse } from "@/types/api/responses/FixtureResponse"

export async function getFixture(){
    try {
        const response = await get(FixturesEndpoint,{
            cache: 'no-cache'
        }, false)
        
        const fixture: FixtureResponse = await response.json()
        if(!fixture){
            return [] as FixtureResponse
        }
        
        return fixture
    }catch{
        return null
    }
}
