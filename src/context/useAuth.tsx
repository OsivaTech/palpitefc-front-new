
'use client'
import React, { ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import { User } from '@/types/User';
import { getSelf } from '@/http/user';

export const AuthContext = createContext<{
    user: User | null;
    isAuthenticated: boolean;
    registerUser: (user: User) => void;
}>({} as any);

export const AuthProvider= ({ children, token }:{children:ReactNode, token?: string}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const cookies = useCookies();

    useEffect(() => {
        const loadUser = async () => {
            if(isAuthenticated){
                setUser(await getSelf())
            }
        }
        if(token){
            setIsAuthenticated(true);
            loadUser();
        }else{
            setIsAuthenticated(false);
        }
    }, [cookies, isAuthenticated, token])

  
    
    const registerUser = useCallback((user: User) => {
        setUser(user);
        setIsAuthenticated(true);
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, registerUser, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};