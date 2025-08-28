"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { SIDEBAR_ITEMS } from "@/lib/constants"
import { CerrarSesion } from "@/components/icons/sidebar-icons"

export function SidebarNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Aquí podrías agregar lógica para limpiar el estado de autenticación
    console.log("Cerrando sesión...")
    router.push('/login')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Navegación principal */}
      <div className="flex-1 pl-2 pr-2 mt-20">
        <nav className="space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon
            const IconBlanco = item.iconBlanco
            const isActive = pathname === item.href
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center justify-start gap-3 py-3 transition-colors rounded-xl pl-3 ${
                  isActive ? "bg-white shadow-md" : "hover:bg-white/10"
                }`}
                style={{ 
                  color: isActive ? 'transparent' : '#8969EC',
                  width: isActive ? '261px' : '100%',
                  height: isActive ? '72px' : 'auto'
                }}
              >
                <div className="flex-shrink-0">
                  {isActive ? <Icon /> : (IconBlanco ? <IconBlanco /> : <Icon />)}
                </div>
                <span className={`font-medium ${
                  isActive ? "bg-gradient-to-r from-[#DB086E] to-[#3A05DF] bg-clip-text text-transparent font-semibold" : ""
                }`} style={{ fontSize: '18px' }}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Botón Cerrar Sesión */}
      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-start gap-3 px-3 py-3 transition-colors hover:bg-white/10 cursor-pointer"
          style={{ backgroundColor: '#EBE6FC' }}
        >
          <div className="flex-shrink-0">
            <CerrarSesion />
          </div>
          <span className="font-semibold" style={{ fontSize: '18px', color: '#3A05DF' }}>
            Cerrar Sesión
          </span>
        </button>
      </div>
    </div>
  )
}
