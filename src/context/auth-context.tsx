'use client'

import { env } from "@/env";
import { API_ROUTE } from "@/shared/constants";
import { User } from "@/shared/types/User";
import { useLocale } from "next-intl";
import {  ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import Cookie  from 'universal-cookie'

type AuthContextType = {
    isUserLogged: () => boolean
    getUser: () => User|null
    registerUser: (user:User|null, accessToken: string) => void
    signOut: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children, token}: {children: ReactNode, token?: Promise<string|undefined>} ) {
    const [user, setUser] = useState<User| null>(null)

    useEffect(() => {
        const cookies = new Cookie();
        
        const fetchUser = async () => {
            const loadedToken = await token

            if(!loadedToken){
                return 
            }
           try{

               const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
               const response = await fetch(`${baseUrl}${API_ROUTE.getSelf}`, {
                   headers: {
                       "Authorization": `Bearer ${await token}`
                    },
                    method: "GET"
                })
                console.log(response)
                const user: User = await response?.json()
                
                cookies.set('token', loadedToken)
                setUser(user)
            }catch{
                cookies.remove('token')
            }
        }
        fetchUser()
    }, [token])

    const getUser = useCallback(() => {
        if(user){
            return user
        }
        return null
    }, [user])

    const registerUser = useCallback( (user:User|null, accessToken:string) => {
        setUser(user)
        const cookies = new Cookie();
        cookies.set('token', accessToken)
    }, [setUser])

    const signOut = useCallback(() => {
        setUser(null)
        const cookies = new Cookie();
        cookies.remove('token')
    }, [])

    const isUserLogged = () => {
        return user ? true : false
    }

    return (
        <AuthContext.Provider value={{ getUser, registerUser ,isUserLogged, signOut  }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

