import { api } from "@/data/api";
import { API_ROUTE } from "@/shared/constants";
import { FixtureResponse } from "@/shared/types/api/responses/FixtureResponse";


export async function getFixture(){

    const response = await api(API_ROUTE.getFixture,{
        method: 'GET'
    })

    const fixture: FixtureResponse = await response.json()
    
    if(!fixture){
        return [] as FixtureResponse
    }

    return fixture
}