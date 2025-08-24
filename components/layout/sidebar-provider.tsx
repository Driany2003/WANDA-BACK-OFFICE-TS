"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { useIsMobile } from "@/hooks/use-mobile"

interface SidebarProviderProps {
  children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const isMobile = useIsMobile()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    console.log("Toggle sidebar clicked, current state:", isSidebarOpen, "isMobile:", isMobile)
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Cerrar sidebar automáticamente al cambiar de ruta en móvil
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false)
    }
  }, [pathname, isMobile, isSidebarOpen])

  // Debug logs
  useEffect(() => {
    console.log("SidebarProvider - isMobile:", isMobile, "isSidebarOpen:", isSidebarOpen)
  }, [isMobile, isSidebarOpen])

  return (
    <div className="flex h-screen bg-gray-100 relative overflow-hidden">
      {/* Sidebar - Solo visible en pantallas grandes o cuando está abierto en móvil */}
      {(!isMobile || isSidebarOpen) && (
        <Sidebar onClose={toggleSidebar} />
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative w-full min-w-0">
        {/* Header */}
        <Header onToggleSidebar={toggleSidebar} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 relative px-3 sm:px-4 lg:px-6 xl:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
