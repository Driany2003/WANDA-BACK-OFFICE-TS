"use client"
import { useState } from "react"
import { Bell, Menu, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NotificationsDropdown } from "@/components/modals/notifications-dropdown"
import { useIsMobile } from "@/hooks/use-mobile"

interface HeaderProps {
  onToggleSidebar?: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const isMobile = useIsMobile()

  const handleToggleSidebar = () => {
    console.log("Header - Toggle sidebar clicked, onToggleSidebar exists:", !!onToggleSidebar)
    if (onToggleSidebar) {
      onToggleSidebar()
    }
  }

  console.log("Header - isMobile:", isMobile, "onToggleSidebar exists:", !!onToggleSidebar)

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

      {/* Barra de búsqueda */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Buscar..."
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-gray-300"
          />
        </div>
      </div>

      {/* Acciones del usuario */}
      <div className="flex items-center gap-3">
        {/* Notificaciones */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative text-gray-600 hover:text-gray-800"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </Button>

        {/* Usuario */}
        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
          <User className="w-5 h-5" />
        </Button>
      </div>

      {/* Dropdown de notificaciones */}
      {showNotifications && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <NotificationsDropdown />
        </div>
      )}
    </header>
  )
}
