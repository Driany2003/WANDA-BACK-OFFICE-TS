"use client"

import { useAuth } from "@/hooks/useAuth"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { Footer } from "./footer"
import { GuestHeader } from "./guest-header"
import { GuestFooter } from "./guest-footer"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth()

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  // Si el usuario está autenticado, mostrar layout completo con sidebar
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 overflow-hidden">
            <Header />
            <div className="container mx-auto px-4 lg:px-6 py-8">{children}</div>
          </main>
        </div>
        <Footer />
      </div>
    )
  }

  // Si no está autenticado, mostrar layout de usuario no logueado
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <GuestHeader />
      <main className="flex-1">
        {children}
      </main>
      <GuestFooter />
    </div>
  )
} 