"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { RefreshCw, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TachoIcon } from "@/components/icons/configuraciones-icons"
import { EliminarPromocionModal } from "@/components/modals/configuraciones"

interface Promocion {
  id: string
  nombre: string
  promocionesSolicitadas: number
  monto: string
  estado: "Activa" | "Inactiva"
}

export function PromocionesActuales() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  
  // Estados para el modal de eliminar
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [promocionSeleccionada, setPromocionSeleccionada] = useState<Promocion | null>(null)
  
  // Datos de ejemplo para promociones
  const PROMOCIONES_DATA: Promocion[] = [
    {
      id: "1",
      nombre: "Promoción 2x1",
      promocionesSolicitadas: 2,
      monto: "S/ 15",
      estado: "Activa"
    },
    {
      id: "2",
      nombre: "Carreras top",
      promocionesSolicitadas: 4,
      monto: "S/ 20",
      estado: "Inactiva"
    }
  ]

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(PROMOCIONES_DATA.map(item => item.id))
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
    console.log("Refrescando promociones...")
  }

  const handleDeleteSelected = () => {
    console.log("Eliminando promociones seleccionadas:", selectedItems)
  }

  const handleDeletePromocion = (promocion: Promocion) => {
    setPromocionSeleccionada(promocion)
    setIsEliminarModalOpen(true)
  }

  const handleConfirmarEliminar = (id: string) => {
    console.log("Confirmando eliminación de promoción:", id)
    // Aquí iría la lógica para eliminar la promoción
    setIsEliminarModalOpen(false)
    setPromocionSeleccionada(null)
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

      {/* Tabla de promociones */}
      <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="border-b border-gray-200" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <tr>
                <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Nombre
                </th>
                <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Promociones solicitadas
                </th>
                <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Monto
                </th>
                <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Estado
                </th>
                <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#FBFBFB]">
              {PROMOCIONES_DATA.map((promocion, index) => (
                <tr 
                  key={promocion.id} 
                  className="bg-[#FBFBFB]"
                  style={{ 
                    borderBottom: index < PROMOCIONES_DATA.length - 1 ? '1px solid #A4A4A4' : 'none'
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
                    {promocion.promocionesSolicitadas}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {promocion.monto}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      promocion.estado === "Activa"
                        ? "bg-[#6137E5] text-white"
                        : "bg-[#FBFBFB] text-[#6137E5] border border-[#6137E5]"
                    }`}>
                      {promocion.estado}
                    </span>
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
