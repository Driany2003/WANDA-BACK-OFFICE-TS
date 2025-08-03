"use client"
import { usePathname } from "next/navigation"
import { SidebarNav } from "./sidebar-nav"
import Link from "next/link"
import Image from "next/image"
import { Home, Trophy, Wallet, User, Settings } from "lucide-react"
import type { SidebarItem } from "@/types"

const sidebarItems: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
  { id: "concursos", label: "Concursos", icon: Trophy, href: "/concursos" },
  { id: "transacciones", label: "Transacciones", icon: Wallet, href: "/transacciones" },
  { id: "mi-cuenta", label: "Mi Cuenta", icon: User, href: "/mi-cuenta" },
  { id: "ajustes", label: "Ajustes", icon: Settings, href: "/ajustes" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-69 bg-gradient-to-b from-gradient-start to-gradient-end text-white flex-shrink-0 hidden lg:flex flex-col" style={{ width: '276px' }}>
      <div className="flex items-center justify-center h-75 mb-25 pt-10">
        <Link href="/concursos" className="flex items-center gap-2 font-semibold">
          <Image 
            src="/WC.png" 
            alt="WC Logo" 
            width={280} 
            height={280} 
            className="drop-shadow-lg"
          />
          <span className="sr-only">Gaming Platform</span>
        </Link>
      </div>
      <SidebarNav />
    </aside>
  )
}
