'use server'

import { LoginFormData } from "@/components/LoginForm/type";
import { api } from "@/data/api";
import { createSession } from "@/lib/session";
import { API_ROUTE } from "@/shared/constants";
import { LoginResponse } from "@/shared/types/api/responses/LoginResponse";


export async function login({email, password}: LoginFormData){

    const response = await api(API_ROUTE.login, {
        body: JSON.stringify({email, password}),
        method: 'POST'
    })
    
    const {accessToken, user}: LoginResponse = await response.json()
    
    if(!accessToken || !user){
        throw new Error('Error')
    }

    createSession(accessToken)

    return user
}