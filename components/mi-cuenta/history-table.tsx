"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCcw } from "lucide-react"
import { WcIcon } from "@/components/icons"
import type { HistoryEntry } from "@/types"

interface HistoryTableProps {
  data: HistoryEntry[]
}

export function HistoryTable({ data }: HistoryTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "En proceso":
      case "Procesando":
      case "Activada":
        return (
          <Badge className="bg-[#FBFBFB] text-[#6137E5] border border-[#6137E5] hover:bg-[#FBFBFB] hover:text-[#6137E5] hover:border-[#6137E5]">
            En proceso
          </Badge>
        )
      case "Completado":
      case "Aprobado":
      case "Ganado":
      case "Canjeada":
        return (
          <Badge className="bg-[#6137E5] text-[#FBFBFB] border border-[#6137E5] hover:bg-[#6137E5] hover:text-[#FBFBFB] hover:border-[#6137E5]">
            Aprobado
          </Badge>
        )
      case "Perdido":
      case "Cancelado":
      case "Expirada":
        return (
          <Badge className="bg-[#FBFBFB] text-[#6137E5] border border-[#6137E5] hover:bg-[#FBFBFB] hover:text-[#6137E5] hover:border-[#6137E5]">
            Rechazado
          </Badge>
        )
      default:
        return (
          <Badge className="bg-[#FBFBFB] text-[#6137E5] border border-[#6137E5] hover:bg-[#FBFBFB] hover:text-[#6137E5] hover:border-[#6137E5]">
            {status}
          </Badge>
        )
    }
  }

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
          <table className="w-full min-w-[800px]">
            <thead className="bg-[#FEFEFE]" style={{ boxShadow: '0 2px 10px rgba(219, 8, 110, 0.08)' }}>
              <tr>
                <th className="px-6 py-3 text-center text-base font-medium text-[#1C1C1C] uppercase tracking-wider min-w-[150px]">
                  Operación
                </th>
                <th className="px-6 py-3 text-center text-base font-medium text-[#1C1C1C] uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-center text-base font-medium text-[#1C1C1C] uppercase tracking-wider">
                  Cantidad WC
                </th>
                <th className="px-6 py-3 text-center text-base font-medium text-[#1C1C1C] uppercase tracking-wider">
                  Estado
                </th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center min-w-[150px]">{item.operation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center items-center gap-2">
                      <WcIcon />
                      <span className="text-sm font-normal text-gray-900">{item.amount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center">
                      {getStatusBadge(item.status)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
