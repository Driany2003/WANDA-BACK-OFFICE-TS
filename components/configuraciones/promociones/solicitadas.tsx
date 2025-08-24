"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { RefreshCw, MoreVertical, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TachoIcon } from "@/components/icons/configuraciones-icons"
import { EliminarPromocionModal } from "@/components/modals/configuraciones"

interface PromocionSolicitada {
  id: string
  nombre: string
  usuarioTikTok: string
  promocion: string
  estado: "Activa" | "Inactiva"
  canje: "Aprobado" | "En proceso" | "Rechazado"
}

export function PromocionesSolicitadas() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  
  // Estados para el modal de eliminar
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [promocionSeleccionada, setPromocionSeleccionada] = useState<any>(null)
  
  // Datos de ejemplo para promociones solicitadas
  const PROMOCIONES_SOLICITADAS_DATA: PromocionSolicitada[] = [
    {
      id: "1",
      nombre: "Jesús López",
      usuarioTikTok: "@Jesus21",
      promocion: "Promo 2x1",
      estado: "Activa",
      canje: "Aprobado"
    },
    {
      id: "2",
      nombre: "José Ortiz",
      usuarioTikTok: "@Jose2509",
      promocion: "Carreras Top",
      estado: "Activa",
      canje: "En proceso"
    }
  ]

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(PROMOCIONES_SOLICITADAS_DATA.map(item => item.id))
    } else {
      setSelectedItems([])
    }
    setSelectAll(checked)
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id])
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id))
    }
  }

  const handleRefresh = () => {
    console.log("Refrescando promociones solicitadas...")
  }

  const handleDeleteSelected = () => {
    console.log("Eliminando promociones solicitadas seleccionadas:", selectedItems)
  }

  const handleDeletePromocion = (promocion: PromocionSolicitada) => {
    // Adaptar el tipo para el modal
    const promocionAdaptada = {
      id: promocion.id,
      nombre: promocion.nombre,
      promocionesSolicitadas: 0, // Valor por defecto
      monto: "S/ 0", // Valor por defecto
      estado: promocion.estado
    }
    setPromocionSeleccionada(promocionAdaptada)
    setIsEliminarModalOpen(true)
  }

  const handleConfirmarEliminar = (id: string) => {
    console.log("Confirmando eliminación de promoción solicitada:", id)
    // Aquí iría la lógica para eliminar la promoción solicitada
    setIsEliminarModalOpen(false)
    setPromocionSeleccionada(null)
  }

  const getCanjeButton = (canje: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer"
    
    switch (canje) {
      case "Aprobado":
        return (
          <div className={`${baseClasses} bg-[#6137E5] text-[#FBFBFB] border border-[#6137E5] hover:bg-[#6137E5] hover:text-[#FBFBFB] hover:border-[#6137E5]`}>
            Aprobado
            <ChevronDown className="w-3 h-3" />
          </div>
        )
      case "En proceso":
        return (
          <div className={`${baseClasses} bg-[#FBFBFB] text-[#6137E5] border border-[#6137E5] hover:bg-[#FBFBFB] hover:text-[#6137E5] hover:border-[#6137E5]`}>
            En proceso
            <ChevronDown className="w-3 h-3" />
          </div>
        )
      case "Rechazado":
        return (
          <div className={`${baseClasses} bg-[#FBFBFB] text-[#9C82EF] border border-[#9C82EF] hover:bg-[#FBFBFB] hover:text-[#9C82EF] hover:border-[#9C82EF]`}>
            Rechazado
            <ChevronDown className="w-3 h-3" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Acciones */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleRefresh}
            className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100"
            title="Refrescar"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          {selectedItems.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Eliminar seleccionados ({selectedItems.length})
            </button>
          )}
        </div>
      </div>

      {/* Tabla de promociones solicitadas */}
      <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="border-b border-gray-200" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <tr>
                <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Nombre
                </th>
                <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Usuario TikTok
                </th>
                <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Promoción
                </th>
                <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Estado
                </th>
                <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Canje
                </th>
                <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#FBFBFB]">
              {PROMOCIONES_SOLICITADAS_DATA.map((promocion, index) => (
                <tr 
                  key={promocion.id} 
                  className="bg-[#FBFBFB]"
                  style={{ 
                    borderBottom: index < PROMOCIONES_SOLICITADAS_DATA.length - 1 ? '1px solid #A4A4A4' : 'none'
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        checked={selectedItems.includes(promocion.id)}
                        onCheckedChange={(checked) => handleSelectItem(promocion.id, checked as boolean)}
                        className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
                      />
                      <span className="text-sm font-normal text-gray-900 flex-1 text-center">{promocion.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {promocion.usuarioTikTok}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {promocion.promocion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-medium text-[#DB086E]">
                      {promocion.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center">
                      {getCanjeButton(promocion.canje)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#1C1C1C] hover:text-[#6137E5]"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-54">
                        <DropdownMenuItem onClick={() => handleDeletePromocion(promocion)} className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium">
                          <TachoIcon />
                          Eliminar promoción
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Eliminar Promoción */}
      {promocionSeleccionada && (
        <EliminarPromocionModal
          isOpen={isEliminarModalOpen}
          onClose={() => {
            setIsEliminarModalOpen(false)
            setPromocionSeleccionada(null)
          }}
          promocion={promocionSeleccionada}
          onConfirm={handleConfirmarEliminar}
        />
      )}
    </div>
  )
}
