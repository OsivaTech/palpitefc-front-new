'use server'

import { api } from "@/data/api"
import { API_ROUTE } from "@/shared/constants"
import { SignupRequest } from "@/shared/types/api/resquests/SignupRequest"

export async function createUser(user: SignupRequest){
    const response = await api(API_ROUTE.signUp, {
        method: 'POST',
        body: JSON.stringify(user)
    })
    console.log(response)
}