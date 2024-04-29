import { authorizedApi } from "@/data/api"
import { API_ROUTE } from "@/shared/constants"
import { User } from "@/shared/types/User"



export async function getSelf():  Promise<User| null> {
    try{
        const response = await authorizedApi(API_ROUTE.getSelf, {
            method:'GET'
        })
        const user = await response?.json()
        
        return user
    }catch{
        return null
    }
}