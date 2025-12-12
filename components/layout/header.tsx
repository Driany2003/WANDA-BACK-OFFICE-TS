"use client"
import { useState, useCallback, memo, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { BuscarIcon, MensajeIcon, CuentaIcon } from "@/components/icons/header-icons"
import { getUserData } from "@/lib/auth"
import { authApi } from "@/lib/api"
import { useRouter } from "next/navigation"

interface HeaderProps {
  onToggleSidebar?: () => void
}

export const Header = memo(function Header({ onToggleSidebar }: HeaderProps) {
  const isMobile = useIsMobile()
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [userName, setUserName] = useState<string>('Usuario')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Obtener nombre del usuario en sesión
  useEffect(() => {
    const userData = getUserData()
    if (userData) {
      // Intentar obtener el nombre completo (nombre + apellido)
      if (userData.nombre && userData.apellido) {
        setUserName(`${userData.nombre} ${userData.apellido}`)
      } else if (userData.nombre) {
        setUserName(userData.nombre)
      } else if (userData.correo) {
        setUserName(userData.correo)
      } else if (userData.authUsername) {
        setUserName(userData.authUsername)
      } else if (userData.suscNombre) {
        setUserName(userData.suscNombre)
      }
    }
  }, [])

  const handleToggleSidebar = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log("Header - Toggle sidebar clicked, onToggleSidebar exists:", !!onToggleSidebar)
    }
    if (onToggleSidebar) {
      onToggleSidebar()
    }
  }, [onToggleSidebar])

  const handleToggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev)
  }, [])

  const handleCloseDropdown = useCallback(() => {
    setIsDropdownOpen(false)
  }, [])

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  if (process.env.NODE_ENV === 'development') {
    console.log("Header - isMobile:", isMobile, "onToggleSidebar exists:", !!onToggleSidebar)
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      {/* Botón de toggle para móvil */}
      {isMobile && onToggleSidebar && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleSidebar}
          className="mr-2 text-gray-600 hover:text-gray-800"
        >
          <Menu className="w-5 h-5" />
        </Button>
      )}

      {/* Botón de búsqueda circular */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 rounded-full bg-white shadow-[0_4px_10px_rgba(219,8,110,0.15)] hover:bg-gray-50"
        >
          <BuscarIcon />
        </Button>
      </div>

      {/* Acciones del usuario */}
      <div className="flex items-center gap-3">
        {/* Mensajes */}
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-800"
        >
          <MensajeIcon />
        </Button>

        {/* Usuario con dropdown */}
        <div className="relative" ref={dropdownRef}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleToggleDropdown}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white shadow-[0_4px_10px_rgba(219,8,110,0.15)] rounded-lg px-3 py-2"
          >
            <CuentaIcon />
            <span className="text-[14px] font-medium text-[#333333]">{userName}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </Button>
          
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <>
              {/* Overlay para cerrar el dropdown */}
              <div 
                className="fixed inset-0 z-40"
                onClick={handleCloseDropdown}
              />
              
              {/* Dropdown content */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <Link 
                    href="/mi-cuenta"
                    onClick={handleCloseDropdown}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Mi Cuenta
                  </Link>
                  <button
                    onClick={() => {
                      handleCloseDropdown()
                      authApi.logout()
                      router.push('/login')
                    }}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
})
