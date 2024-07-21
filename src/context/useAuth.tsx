'use client'

import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useCookies } from 'next-client-cookies'
import { User } from '@/types/User'
import { getSelf } from '@/http/user'

export const AuthContext = createContext<{
  user: User | null
  isAuthenticated: boolean
  registerUser: (user: User) => void
  forceReload: () => void
}>(
  {} as {
    user: User | null
    isAuthenticated: boolean
    registerUser: (user: User) => void
    forceReload: () => void
  },
)

export const AuthProvider = ({
  children,
  token,
}: {
  children: ReactNode
  token?: string
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!token
  })
  const cookies = useCookies()

  const forceReload = async () => {
    setUser(await getSelf())
  }

  useEffect(() => {
    const loadUser = async () => setUser(await getSelf())

    if (token) {
      setIsAuthenticated(true)
      loadUser()
    } else {
      setIsAuthenticated(false)
    }
  }, [cookies, isAuthenticated, token])

  const registerUser = useCallback((user: User) => {
    setUser(user)
    setIsAuthenticated(true)
  }, [])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, registerUser, user, forceReload }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return React.useContext(AuthContext)
}
