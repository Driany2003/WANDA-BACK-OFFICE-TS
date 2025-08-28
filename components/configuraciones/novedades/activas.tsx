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
import { TachoIcon, LapizIcon } from "@/components/icons/configuraciones-icons"
import { EditarNovedadModal, EliminarNovedadModal } from "@/components/modals/configuraciones"

interface NovedadActiva {
  id: string
  nombre: string
  estado: "Activo"
}

export function NovedadesActivas() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  
  // Estados para los modales
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [novedadSeleccionada, setNovedadSeleccionada] = useState<any>(null)
  
  // Datos de ejemplo para novedades activas
  const NOVEDADES_ACTIVAS_DATA: NovedadActiva[] = [
    {
      id: "1",
      nombre: "Novedad 1",
      estado: "Activo"
    },
    {
      id: "3",
      nombre: "Novedad 3",
      estado: "Activo"
    }
  ]

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(NOVEDADES_ACTIVAS_DATA.map(item => item.id))
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
    console.log("Refrescando novedades activas...")
  }

  const handleDeleteSelected = () => {
    console.log("Eliminando novedades activas seleccionadas:", selectedItems)
  }

  const handleGuardarEdicion = (data: any) => {
    console.log("Guardando cambios de novedad:", data)
    setIsEditarModalOpen(false)
    // Aquí iría la lógica para guardar los cambios
  }

  const handleConfirmarEliminacion = (id: string) => {
    console.log("Confirmando eliminación de novedad:", id)
    setIsEliminarModalOpen(false)
    // Aquí iría la lógica para eliminar la novedad
  }

  const handleEditarNovedad = (id: string) => {
    const novedad = NOVEDADES_ACTIVAS_DATA.find(n => n.id === id)
    if (novedad) {
      setNovedadSeleccionada({
        id: novedad.id,
        titulo: novedad.nombre,
        descripcion: "Descripción de ejemplo para la novedad",
        fechaInicio: new Date(),
        fechaFin: new Date(),
        horaInicio: "09:00",
        horaFin: "18:00",
        estado: true
      })
      setIsEditarModalOpen(true)
    }
  }

  const handleEliminarNovedad = (id: string) => {
    const novedad = NOVEDADES_ACTIVAS_DATA.find(n => n.id === id)
    if (novedad) {
      setNovedadSeleccionada({
        id: novedad.id,
        nombre: novedad.nombre
      })
      setIsEliminarModalOpen(true)
    }
  }

  return (
    <div className="space-y-6">
      {/* Acciones */}
      <div className="flex items-center gap-4 pl-6">
        <Checkbox
          checked={selectAll}
          onCheckedChange={handleSelectAll}
          className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
        />
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

      {/* Tabla de novedades activas */}
      <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="border-b border-gray-200" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <tr>
                <th className="w-1/2 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Nombre
                </th>
                <th className="w-1/2 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Estado
                </th>
                <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#FBFBFB]">
              {NOVEDADES_ACTIVAS_DATA.map((novedad, index) => (
                <tr 
                  key={novedad.id} 
                  className="bg-[#FBFBFB]"
                  style={{ 
                    borderBottom: index < NOVEDADES_ACTIVAS_DATA.length - 1 ? '1px solid #A4A4A4' : 'none'
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        checked={selectedItems.includes(novedad.id)}
                        onCheckedChange={(checked) => handleSelectItem(novedad.id, checked as boolean)}
                        className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
                      />
                      <span className="text-sm font-normal text-gray-900 flex-1 text-center">{novedad.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="bg-[#6137E5] text-white px-3 py-1 rounded-full text-xs font-medium">
                      {novedad.estado}
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
                        <DropdownMenuItem 
                          onClick={() => handleEditarNovedad(novedad.id)}
                          className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium"
                        >
                          <LapizIcon />
                          Editar novedad
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleEliminarNovedad(novedad.id)}
                          className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium"
                        >
                          <TachoIcon />
                          Eliminar novedad
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

      {/* Modales */}
      {novedadSeleccionada && (
        <>
          <EditarNovedadModal
            isOpen={isEditarModalOpen}
            onClose={() => setIsEditarModalOpen(false)}
            onSave={handleGuardarEdicion}
            novedadData={novedadSeleccionada}
          />
          <EliminarNovedadModal
            isOpen={isEliminarModalOpen}
            onClose={() => setIsEliminarModalOpen(false)}
            onConfirm={handleConfirmarEliminacion}
            novedad={novedadSeleccionada}
          />
        </>
      )}
    </div>
  )
}
