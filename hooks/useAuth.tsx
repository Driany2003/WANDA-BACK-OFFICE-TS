"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Manejar redirecciones automáticas desde la raíz
  useEffect(() => {
    if (!isLoading && pathname === '/') {
      if (isAuthenticated) {
        router.replace('/concursos')
      } else {
        router.replace('/not-logged')
      }
    }
  }, [isAuthenticated, isLoading, pathname, router])

  const login = () => {
    setIsAuthenticated(true)
    // Redirigir a la página de concursos después del login
    router.replace('/concursos')
  }

  const logout = () => {
    setIsAuthenticated(false)
    // Redirigir a la página de usuarios no logueados después del logout
    router.replace('/not-logged')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 