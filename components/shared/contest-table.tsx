"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RotateCcw } from "lucide-react"
import type { ContestTableData } from "@/types"
import { DateRangeSelect } from "./date-range-select"
import { Badge } from "@/components/ui/badge"
import { WcBadge } from "@/components/ui/wc-badge"
import { WcIcon } from "@/components/icons"

interface ContestTableProps {
  data: ContestTableData[]
  title?: string
  showStatus?: boolean
  showReward?: boolean
}

export function ContestTable({ data, title = "Historial", showStatus = false, showReward = true }: ContestTableProps) {
  return (
    <div className="space-y-6">
      {/* Header con filtro de fecha */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-hidden rounded-t-xl" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FEFEFE]" style={{ boxShadow: '0 2px 10px rgba(219, 8, 110, 0.08)' }}>
              <tr>
                <th className="px-6 py-3 text-center text-base font-medium text-[#1C1C1C] uppercase tracking-wider">
                  Concurso
                </th>
                <th className="px-6 py-3 text-center text-base font-medium text-[#1C1C1C] uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-center text-base font-medium text-[#1C1C1C] uppercase tracking-wider">
                  WC usadas
                </th>
                {showReward && (
                  <th className="px-6 py-3 text-center text-base font-medium text-[#1C1C1C] uppercase tracking-wider">
                    Recompensa
                  </th>
                )}
                <th className="px-6 py-3 text-center text-base font-medium text-[#1C1C1C] uppercase tracking-wider">
                  N° de opciones
                </th>
                {showStatus && (
                  <th className="px-6 py-3 text-center text-base font-medium text-[#1C1C1C] uppercase tracking-wider">
                    Estado
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-[#FBFBFB]">
              {data.map((item, index) => (
                <tr 
                  key={item.id} 
                  className="bg-[#FBFBFB]"
                  style={{ 
                    borderBottom: index < data.length - 1 ? '1px solid #A4A4A4' : 'none'
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">{item.concurso}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">{item.fecha}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center items-center gap-2">
                      <WcIcon />
                      <span className="text-sm font-normal text-gray-900">{item.wcUsadas}</span>
                    </div>
                  </td>
                  {showReward && (
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center items-center gap-2">
                        <WcIcon />
                        <span className="text-sm font-normal text-gray-900">{item.recompensa}</span>
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-600 text-center">{item.numOpciones}</td>
                  {showStatus && (
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center">
                        <Badge className={
                          item.estado === "Cerrado" 
                            ? "bg-[#6137E5] text-[#FBFBFB] border border-[#6137E5] hover:bg-[#6137E5] hover:text-[#FBFBFB] hover:border-[#6137E5]"
                            : "bg-[#FBFBFB] text-[#6137E5] border border-[#6137E5] hover:bg-[#FBFBFB] hover:text-[#6137E5] hover:border-[#6137E5]"
                        }>
                          {item.estado}
                        </Badge>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
