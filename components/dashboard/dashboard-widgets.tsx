"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, TrendingDown, MoreVertical, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardIcon, RecompensasIcon, PerdidasIcon } from "@/components/icons/dashboard-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { DashboardStats } from "@/types"

interface DashboardWidgetsProps {
  stats: DashboardStats
}

export function DashboardWidgets({ stats }: DashboardWidgetsProps) {
  const [selectedRecompensa, setSelectedRecompensa] = useState<string | null>(null)
  const [selectedPerdida, setSelectedPerdida] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8">
      {/* Concursos Widget */}
      <Card className="h-full w-[456px] rounded-2xl shadow-[0_4px_6px_-1px_rgba(137,2,119,0.15)] overflow-hidden">
        <div className="bg-[#FEFEFE] px-6 py-4 border-b border-gray-200">
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <DashboardIcon />
              Concursos
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Generar reporte
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="bg-[#FBFBFB] flex flex-col items-center justify-center gap-4 p-4">
          {/* Title */}
          <div className="text-lg font-medium text-[#333333] mb-6">Total</div>
          {/* Donut Chart - Simplified version */}
          <div className="flex items-center justify-center relative w-48 h-48 shrink-0 mb-6">
            <div className="w-48 h-48 rounded-full border-8 border-[#C4B4F5] relative">
              <div 
                className="absolute inset-0 rounded-full border-8 border-[#6137E5]"
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${75 + 25 * Math.cos(Math.PI / 2)}% ${25 + 25 * Math.sin(Math.PI / 2)}%, 50% 50%)`
                }}
              ></div>
            </div>
          </div>

          <div className="w-full flex justify-center mb-4 ">
            <div className="flex flex-col items-center" style={{ gap: '23px' }}>
              <div className="flex items-center rounded-md bg-[#F2F2F2] w-[229px] h-[52px] px-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-2 ml-3">
                  <span className="text-[24px] text-[#777777] font-bold">100%</span>
                  <span className="text-base text-[#777777] font-medium">Concursos</span>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-[#FEFEFE] w-[229px] h-[52px] px-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08)] relative overflow-hidden">
                <div className="w-2 h-[52px] bg-gradient-to-b from-[#6137E5] to-[#6137E5] shadow-sm ml-0 absolute left-0 top-0 rounded-l-md"></div>
                <div className="flex items-center gap-5 ml-3">
                  <span className="text-[24px] text-[#777777] font-bold">{stats.concursos.carritos}%</span>
                  <span className="text-base text-[#777777] font-medium">Carritos</span>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-[#FEFEFE] w-[229px] h-[52px] px-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08)] relative overflow-hidden">
                <div className="w-2 h-[52px] bg-gradient-to-b from-[#C4B4F5] to-[#C4B4F5] shadow-sm ml-0 absolute left-0 top-0 rounded-l-md"></div>
                <div className="flex items-center gap-5 ml-3">
                  <span className="text-[24px] text-[#777777] font-bold">{stats.concursos.cartas}%</span>
                  <span className="text-base text-[#777777] font-medium">Cartas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Wrapper for Recompensas and Pérdidas */}
      <div className="grid grid-cols-1 gap-6">
        {/* Recompensas Widget */}
        <Card className="h-full w-[546px] rounded-2xl shadow-[0_4px_6px_-1px_rgba(137,2,119,0.15)] overflow-hidden">
          <div className="bg-[#FEFEFE] px-6 py-4 border-b border-gray-200">
            <div className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <RecompensasIcon />
                Recompensas
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Generar reporte
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="bg-[#FBFBFB] p-6">
            <div className="h-[200px] flex items-end justify-center gap-2">
              {stats.recompensas.map((entry, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className={`w-8 rounded-t-sm transition-all duration-200 cursor-pointer ${
                      selectedRecompensa === entry.day ? 'bg-[#B09BF2]' : 'bg-[#EBE6FC]'
                    }`}
                    style={{ height: `${(entry.value / 40) * 160}px` }}
                    onClick={() => setSelectedRecompensa(selectedRecompensa === entry.day ? null : entry.day)}
                  ></div>
                  <span className={`text-xs mt-2 font-medium ${
                    selectedRecompensa === entry.day ? 'text-[#DB086E]' : 'text-[#777777]'
                  }`}>
                    {entry.day}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <span className="text-sm text-[#DB086E] font-medium">WC</span>
            </div>
          </div>
        </Card>

        {/* Pérdidas Widget */}
        <Card className="h-full w-[546px] rounded-2xl shadow-[0_4px_6px_-1px_rgba(137,2,119,0.15)] overflow-hidden">
          <div className="bg-[#FEFEFE] px-6 py-4 border-b border-gray-200">
            <div className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <PerdidasIcon />
                Pérdidas
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Generar reporte
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="bg-[#FBFBFB] p-6">
            <div className="h-[200px] flex items-end justify-center gap-2">
              {stats.perdidas.map((entry, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className={`w-8 rounded-t-sm transition-all duration-200 cursor-pointer ${
                      selectedPerdida === entry.day ? 'bg-[#B09BF2]' : 'bg-[#EBE6FC]'
                    }`}
                    style={{ height: `${(entry.value / 40) * 160}px` }}
                    onClick={() => setSelectedPerdida(selectedPerdida === entry.day ? null : entry.day)}
                  ></div>
                  <span className={`text-xs mt-2 font-medium ${
                    selectedPerdida === entry.day ? 'text-[#DB086E]' : 'text-[#777777]'
                  }`}>
                    {entry.day}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <span className="text-sm text-[#DB086E] font-medium">WC</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
