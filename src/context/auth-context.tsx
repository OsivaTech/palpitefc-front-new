'use client'
import { User } from "@/shared/types/User";
import {  ReactNode, createContext, useCallback, useContext, useState } from "react";

type AuthContextType = {
    isUserLogged: () => boolean
    getUser: () => User|null
    registerUser: (user:User|null) => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: {children: ReactNode} ) {
    const [user, setUser] = useState<User| null>(null)

    const getUser = useCallback(() => {
        if(user){
            return user
        }
        return null
    }, [user])

    const registerUser = useCallback( (user:User|null) => {
        setUser(user)
    }, [setUser])

    const isUserLogged = () => {
        return user ? true : false
    }

    return (
        <AuthContext.Provider value={{ getUser, registerUser,isUserLogged  }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

