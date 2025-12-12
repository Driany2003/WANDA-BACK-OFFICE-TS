"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      // Rutas públicas que no requieren autenticación
      const publicRoutes = ['/login', '/forgot-password']
      const isPublicRoute = publicRoutes.includes(pathname)

      // Si es una ruta pública, permitir acceso
      if (isPublicRoute) {
        setIsChecking(false)
        return
      }

      // Si no está autenticado y no es ruta pública, redirigir al login
      if (!isAuthenticated()) {
        router.push('/login')
        return
      }

      // Si está autenticado, permitir acceso
      setIsChecking(false)
    }

    checkAuth()
  }, [pathname, router])

  // Mostrar loading mientras se verifica la autenticación
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[#6137E5] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

