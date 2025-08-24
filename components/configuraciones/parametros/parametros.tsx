"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, RefreshCw } from "lucide-react"
import { LapizIcon, TachoIcon } from "@/components/icons/configuraciones-icons"
import { EditarParametroModal, EliminarParametroModal } from "@/components/modals/configuraciones"

interface Parametro {
  id: string
  nombre: string
  valor: string
  descripcion: string
  fechaCreacion: string
  fechaModificacion: string
  estado: "Activo" | "Inactivo"
}

export function Parametros() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  
  // Estados para los modales
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [parametroSeleccionado, setParametroSeleccionado] = useState<Parametro | null>(null)

  // Datos de ejemplo para parámetros
  const parametrosData: Parametro[] = [
    {
      id: "1",
      nombre: "Lenguaje",
      valor: "ES",
      descripcion: "Lenguaje sistema",
      fechaCreacion: "26/09/2024",
      fechaModificacion: "26/09/2024",
      estado: "Activo"
    },
    {
      id: "2",
      nombre: "Zona horaria",
      valor: "UTC-5",
      descripcion: "Zona horaria del sistema",
      fechaCreacion: "26/09/2024",
      fechaModificacion: "26/09/2024",
      estado: "Activo"
    },
    {
      id: "3",
      nombre: "Moneda",
      valor: "PEN",
      descripcion: "Moneda por defecto",
      fechaCreacion: "26/09/2024",
      fechaModificacion: "26/09/2024",
      estado: "Inactivo"
    },
    {
      id: "4",
      nombre: "Tema",
      valor: "Claro",
      descripcion: "Tema visual del sistema",
      fechaCreacion: "26/09/2024",
      fechaModificacion: "26/09/2024",
      estado: "Activo"
    }
  ]

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(parametrosData.map(item => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id])
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id))
    }
  }

  const handleRefresh = () => {
    // Lógica para refrescar datos
    console.log("Refrescando parámetros...")
  }

  const handleEditarParametro = (parametro: Parametro) => {
    setParametroSeleccionado(parametro)
    setIsEditarModalOpen(true)
  }

  const handleEliminarParametro = (parametro: Parametro) => {
    setParametroSeleccionado(parametro)
    setIsEliminarModalOpen(true)
  }

  const handleConfirmarEditar = (data: Parametro) => {
    console.log("Confirmando edición de parámetro:", data)
    // Aquí iría la lógica para editar el parámetro
    setIsEditarModalOpen(false)
    setParametroSeleccionado(null)
  }

  const handleConfirmarEliminar = (id: string) => {
    console.log("Confirmando eliminación de parámetro:", id)
    // Aquí iría la lógica para eliminar el parámetro
    setIsEliminarModalOpen(false)
    setParametroSeleccionado(null)
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Activo":
        return "bg-[#6137E5] text-white"
      case "Inactivo":
        return "bg-white text-[#6137E5] border border-[#6137E5]"
      default:
        return "bg-[#6137E5] text-white"
    }
  }

  return (
    <div className="space-y-6">
      {/* Acciones */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleRefresh}
          className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100"
          title="Refrescar"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      {/* Tabla de parámetros */}
      <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="border-b border-gray-200" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <tr>
                <th className="w-1/7 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Nombre
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Valor
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Descripción
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Fecha creación
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Fecha modificación
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Estado
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#FBFBFB]">
              {parametrosData.map((item, index) => (
                <tr 
                  key={item.id} 
                  className="bg-[#FBFBFB]"
                  style={{ 
                    borderBottom: index < parametrosData.length - 1 ? '1px solid #A4A4A4' : 'none'
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                        className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
                      />
                      <span className="text-sm font-normal text-gray-900 flex-1 text-center">{item.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {item.valor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {item.descripcion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {item.fechaCreacion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {item.fechaModificacion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium w-20 inline-flex items-center justify-center ${getEstadoColor(item.estado)}`}>
                      {item.estado}
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
                          className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium"
                          onClick={() => handleEditarParametro(item)}
                        >
                          <LapizIcon />
                          Editar parámetro
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium"
                          onClick={() => handleEliminarParametro(item)}
                        >
                          <TachoIcon />
                          Eliminar parámetro
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

      {/* Modal de Editar Parámetro */}
      {parametroSeleccionado && (
        <EditarParametroModal
          isOpen={isEditarModalOpen}
          onClose={() => setIsEditarModalOpen(false)}
          parametro={parametroSeleccionado}
          onSave={handleConfirmarEditar}
        />
      )}

      {/* Modal de Eliminar Parámetro */}
      {parametroSeleccionado && (
        <EliminarParametroModal
          isOpen={isEliminarModalOpen}
          onClose={() => setIsEliminarModalOpen(false)}
          parametro={parametroSeleccionado}
          onConfirm={handleConfirmarEliminar}
        />
      )}
    </div>
  )
}
