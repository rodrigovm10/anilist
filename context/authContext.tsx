'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { UserAuth } from '@/hooks/useRegister'
import { createContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
  user: UserAuth
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useLocalStorage<UserAuth>('user', { id: 0, name: '' })

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUser({ id: 0, name: '' })
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}
