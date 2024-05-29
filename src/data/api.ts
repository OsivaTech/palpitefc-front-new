'use server'
import { env } from "@/env"
import { decrypt } from "@/lib/session"
import { cookies } from "next/headers"

export async function api(path: string, init?: RequestInit){
    const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
    const url = new URL(path, baseUrl)

    return fetch(url, {...init,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    })
}

export async function authorizedApi(path: string, init?: RequestInit){
    const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
    const url = new URL(path, baseUrl)
    const session = await cookies().get('session')
    
    if(!session) {
        return null
    }
    
    const decryptedToken = await decrypt(session.value)

    if(!decryptedToken?.token){
        return null
    }
    
    return fetch(url, {...init,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${decryptedToken.token}`
        }
    })
}
