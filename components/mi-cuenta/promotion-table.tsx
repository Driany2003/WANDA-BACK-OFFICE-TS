"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCcw } from "lucide-react"
import type { PromotionTableData } from "@/types"

interface PromotionTableProps {
  data: PromotionTableData[]
}

export function PromotionTable({ data }: PromotionTableProps) {
  return (
    <div className="space-y-6">
      {/* Botón de refrescar */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Tabla de promociones */}
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
              {data.map((item, index) => (
                <tr 
                  key={item.id} 
                  className="bg-[#FBFBFB]"
                  style={{ 
                    borderBottom: index < data.length - 1 ? '1px solid #A4A4A4' : 'none'
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal text-[#333333] text-center">
                    {item.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal text-[#333333] text-center">
                    {item.fechaCanje}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center">
                      <Badge className={
                        item.estado === "Aprobado" 
                          ? "bg-[#6137E5] text-[#FBFBFB] border border-[#6137E5] hover:bg-[#6137E5] hover:text-[#FBFBFB] hover:border-[#6137E5]"
                          : "bg-[#FBFBFB] text-[#6137E5] border border-[#6137E5] hover:bg-[#FBFBFB] hover:text-[#6137E5] hover:border-[#6137E5]"
                      }>
                        {item.estado}
                      </Badge>
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