'use server'
import { get } from "@/lib/api"
import { LeaguesEndpoint } from "@/lib/endpoints"
import { League } from "@/types/League"

export async function getLeagues(){
    try{
        const response = await get(LeaguesEndpoint, {cache: 'no-cache'}, false)
        const leagues: League[] = await response.json()

        return leagues || []
    }catch{
        return [] as League[]
    }
}
