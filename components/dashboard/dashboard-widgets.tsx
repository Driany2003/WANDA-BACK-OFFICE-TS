"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RecompensasIcon, PerdidasIcon, DescargaIcon } from "@/components/icons/dashboard-icons"
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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-12">
      {/* Ingresos Widget */}
      <Card className="h-full w-[456px] rounded-2xl shadow-[0_4px_6px_-1px_rgba(137,2,119,0.15)] overflow-hidden">
        <div className="bg-[#FEFEFE] px-6 py-4 border-b border-gray-200">
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <RecompensasIcon />
              Ingresos
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2">
                  <DescargaIcon />
                  Generar reporte
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="bg-[#FBFBFB] flex flex-col items-center justify-center gap-4 p-8">
          {/* Title */}
          <div className="text-lg font-medium text-[#333333] mb-8">Total</div>
          {/* Donut Chart - Ingresos en tonos morados */}
          <div className="flex items-center justify-center relative w-48 h-48 shrink-0 mb-8">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              {/* Fondo del donut */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#C4B4F5"
                strokeWidth="12"
              />
              {/* Segmento principal (75% Permanentes) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#6137E5"
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 40 * (stats.ingresos.permanentes / 100)} ${2 * Math.PI * 40}`}
                strokeDashoffset="0"
              />
            </svg>
          </div>

          <div className="w-full flex justify-center mb-4">
            <div className="flex flex-col items-center" style={{ gap: '23px' }}>
              <div className="flex items-center rounded-md bg-[#F2F2F2] w-[229px] h-[52px] px-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-2 ml-3">
                  <span className="text-[24px] text-[#777777] font-bold">100%</span>
                  <span className="text-base text-[#777777] font-medium">Ingresos</span>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-[#FEFEFE] w-[229px] h-[52px] px-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08)] relative overflow-hidden">
                <div className="w-2 h-[52px] bg-gradient-to-b from-[#6137E5] to-[#6137E5] shadow-sm ml-0 absolute left-0 top-0 rounded-l-md"></div>
                <div className="flex items-center gap-5 ml-3">
                  <span className="text-[24px] text-[#777777] font-bold">{stats.ingresos.permanentes}%</span>
                  <span className="text-base text-[#777777] font-medium">Permanentes</span>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-[#FEFEFE] w-[229px] h-[52px] px-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08)] relative overflow-hidden">
                <div className="w-2 h-[52px] bg-gradient-to-b from-[#C4B4F5] to-[#C4B4F5] shadow-sm ml-0 absolute left-0 top-0 rounded-l-md"></div>
                <div className="flex items-center gap-5 ml-3">
                  <span className="text-[24px] text-[#777777] font-bold">{stats.ingresos.temporales}%</span>
                  <span className="text-base text-[#777777] font-medium">Temporales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Salidas Widget */}
      <Card className="h-full w-[456px] rounded-2xl shadow-[0_4px_6px_-1px_rgba(137,2,119,0.15)] overflow-hidden">
        <div className="bg-[#FEFEFE] px-6 py-4 border-b border-gray-200">
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <PerdidasIcon />
              Salidas
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2">
                  <DescargaIcon />
                  Generar reporte
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="bg-[#FBFBFB] flex flex-col items-center justify-center gap-4 p-8">
          {/* Title */}
          <div className="text-lg font-medium text-[#333333] mb-8">Total</div>
          {/* Donut Chart - Salidas en tonos rosados/morados */}
          <div className="flex items-center justify-center relative w-48 h-48 shrink-0 mb-8">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              {/* Fondo del donut */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#E6B3E6"
                strokeWidth="12"
              />
              {/* Segmento principal (60% Aprobadas) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#DB086E"
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 40 * (stats.salidas.aprobadas / 100)} ${2 * Math.PI * 40}`}
                strokeDashoffset="0"
              />
            </svg>
          </div>

          <div className="w-full flex justify-center mb-4">
            <div className="flex flex-col items-center" style={{ gap: '23px' }}>
              <div className="flex items-center rounded-md bg-[#F2F2F2] w-[229px] h-[52px] px-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-2 ml-3">
                  <span className="text-[24px] text-[#777777] font-bold">100%</span>
                  <span className="text-base text-[#777777] font-medium">Salidas</span>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-[#FEFEFE] w-[229px] h-[52px] px-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08)] relative overflow-hidden">
                <div className="w-2 h-[52px] bg-gradient-to-b from-[#DB086E] to-[#DB086E] shadow-sm ml-0 absolute left-0 top-0 rounded-l-md"></div>
                <div className="flex items-center gap-5 ml-3">
                  <span className="text-[24px] text-[#777777] font-bold">{stats.salidas.aprobadas}%</span>
                  <span className="text-base text-[#777777] font-medium">Aprobadas</span>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-[#FEFEFE] w-[229px] h-[52px] px-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08)] relative overflow-hidden">
                <div className="w-2 h-[52px] bg-gradient-to-b from-[#E6B3E6] to-[#E6B3E6] shadow-sm ml-0 absolute left-0 top-0 rounded-l-md"></div>
                <div className="flex items-center gap-5 ml-3">
                  <span className="text-[24px] text-[#777777] font-bold">{stats.salidas.enProceso}%</span>
                  <span className="text-base text-[#777777] font-medium">En proceso</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
