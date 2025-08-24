"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { SidebarNav } from "@/components/layout/sidebar-nav"

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-64 text-white border-none p-0"
        style={{ backgroundColor: '#8969EC' }}
      >
        <div className="flex items-center justify-center h-20 mb-6 pt-4">
          <div className="flex items-center gap-2 font-semibold">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-purple-600">WC</span>
            </div>
          </div>
        </div>
        <SidebarNav />
      </SheetContent>
    </Sheet>
  )
}
