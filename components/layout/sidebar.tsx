"use client"
import { usePathname } from "next/navigation"
import { SidebarNav } from "./sidebar-nav"
import Link from "next/link"
import Image from "next/image"
import { useIsMobile } from "@/hooks/use-mobile"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { memo } from "react"

interface SidebarProps {
  onClose?: () => void
}

export const Sidebar = memo(function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  return (
    <>
      {/* Overlay para móvil */}
      {isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          text-white flex-shrink-0 flex flex-col z-50
          ${isMobile 
            ? 'fixed left-0 top-0 h-full transform transition-transform duration-300 ease-in-out' 
            : 'relative'
          }
        `}
        style={{ 
          backgroundColor: '#FBFBFB',
          width: '276px',
          transform: isMobile ? 'translateX(0)' : 'none'
        }}
      >
        {/* Header del sidebar con botón de cerrar en móvil */}
        <div className="flex items-center justify-between h-20 lg:h-24 mb-6 lg:mb-8 mt-20 px-4">
          <Link href="/concursos" className="flex items-center gap-2 font-semibold">
            <Image 
              src="/WC.png" 
              alt="WC Logo" 
              width={200} 
              height={142} 
              className="drop-shadow-lg"
              priority
            />
            <span className="sr-only">Gaming Platform</span>
          </Link>
          
          {/* Botón de cerrar solo en móvil */}
          {isMobile && onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 lg:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
        
        <SidebarNav />
      </aside>
    </>
  )
})
