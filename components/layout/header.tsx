"use client"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { NotificationsDropdown } from "@/components/modals/notifications-dropdown"
import { TrofeoIcon, WCIcon } from "@/components/icons/header-icons"
import { useAuth } from "@/hooks/useAuth"
import { GradientButton } from "@/components/ui/gradient-button"

export function Header() {
  const { isAuthenticated, login, logout } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MobileSidebar />
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="w-5 h-5" />
          </Button>
          <div className="hidden lg:flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <NotificationsDropdown />
          <Button variant="outline" size="sm" className="border-purple-500 text-purple-600 hover:bg-purple-50">
            <TrofeoIcon />
            <span className="ml-2">Concursar ahora</span>
          </Button>
          <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-md border border-gray-200">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-gray-800">WC</span>
            </div>
            <span className="text-sm font-medium text-gray-800">15</span>
            <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}
