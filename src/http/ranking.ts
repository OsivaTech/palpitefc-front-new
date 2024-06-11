'use server'
import { get } from "@/lib/api";
import { RankingsEndpoint } from "@/lib/endpoints";
import { RankingResponse } from "@/types/api/responses/RankResponse";

export async function getRank() {
    try{
        const response = await get(RankingsEndpoint, {}, false)

        const ranks : RankingResponse[] = await response.json();

        return ranks
    }catch(error){
        console.log(error)
        return null
    }
}