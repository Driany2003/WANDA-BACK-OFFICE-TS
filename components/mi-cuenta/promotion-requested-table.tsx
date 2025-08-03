"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PromotionCardData } from "@/types"

interface PromotionRequestedTableProps {
  data: PromotionCardData[]
  onViewDetails: (promotion: PromotionCardData) => void
}

export function PromotionRequestedTable({ data, onViewDetails }: PromotionRequestedTableProps) {
  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No hay promociones solicitadas.</p>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "solicitadas":
        return (
          <Badge className="bg-[#FBFBFB] text-[#6137E5] border border-[#6137E5] hover:bg-[#FBFBFB] hover:text-[#6137E5] hover:border-[#6137E5]">
            En proceso
          </Badge>
        )
      case "activas":
        return (
          <Badge className="bg-[#6137E5] text-[#FBFBFB] border border-[#6137E5] hover:bg-[#6137E5] hover:text-[#FBFBFB] hover:border-[#6137E5]">
            Aprobado
          </Badge>
        )
      case "vencidas":
        return (
          <Badge className="bg-[#FBFBFB] text-[#6137E5] border border-[#6137E5] hover:bg-[#FBFBFB] hover:text-[#6137E5] hover:border-[#6137E5]">
            Rechazado
          </Badge>
        )
      default:
        return (
          <Badge className="bg-[#FBFBFB] text-[#6137E5] border border-[#6137E5] hover:bg-[#FBFBFB] hover:text-[#6137E5] hover:border-[#6137E5]">
            En proceso
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Botón de refrescar */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Tabla de promociones solicitadas */}
      <div className="overflow-hidden rounded-t-xl" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FEFEFE]" style={{ boxShadow: '0 2px 10px rgba(219, 8, 110, 0.08)' }}>
              <tr>
                <th className="px-6 py-3 text-center text-[16px] font-medium text-[#1C1C1C] uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-center text-[16px] font-medium text-[#1C1C1C] uppercase tracking-wider">
                  Fecha de canje
                </th>
                <th className="px-6 py-3 text-center text-[16px] font-medium text-[#1C1C1C] uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#FBFBFB]">
              {data.map((promotion, index) => (
                <tr 
                  key={promotion.id} 
                  className="bg-[#FBFBFB]"
                  style={{ 
                    borderBottom: index < data.length - 1 ? '1px solid #A4A4A4' : 'none'
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal text-[#333333] text-center">
                    {promotion.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal text-[#333333] text-center">
                    {promotion.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center">
                      {getStatusBadge(promotion.status)}
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