"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, RefreshCw } from "lucide-react"
import { LapizIcon, TachoIcon, AlertIcon } from "@/components/icons/soporte-icons"
import { EditarNormativaModal, EliminarNormativaModal } from "@/components/modals/soporte"

interface Normativa {
  id: string
  nombre: string
  descripcion: string
  fecha: string
}

export function Normativa() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [normativaSeleccionada, setNormativaSeleccionada] = useState<Normativa | null>(null)
  
  // Datos de ejemplo para normativa
  const NORMATIVA_DATA: Normativa[] = [
    {
      id: "1",
      nombre: "Términos y condiciones",
      descripcion: "Términos y condiciones de uso del servicio",
      fecha: "15/12/2024"
    },
    {
      id: "2",
      nombre: "Política de cookies",
      descripcion: "Política sobre el uso de cookies en el sitio web",
      fecha: "10/12/2024"
    },
    {
      id: "3",
      nombre: "Política de privacidad",
      descripcion: "Política de privacidad y protección de datos",
      fecha: "05/12/2024"
    }
  ]

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(NORMATIVA_DATA.map(item => item.id))
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
    console.log("Refrescando normativa...")
  }

  const handleEditar = (normativa: Normativa) => {
    setNormativaSeleccionada(normativa)
    setIsEditarModalOpen(true)
  }

  const handleEliminar = (normativa: Normativa) => {
    setNormativaSeleccionada(normativa)
    setIsEliminarModalOpen(true)
  }

  const handleConfirmarEditar = (normativaEditada: Normativa) => {
    // Aquí actualizarías los datos en la base de datos
    console.log("Normativa editada:", normativaEditada)
    setIsEditarModalOpen(false)
    setNormativaSeleccionada(null)
  }

  const handleConfirmarEliminar = (normativa: Normativa) => {
    // Aquí eliminarías la normativa de la base de datos
    console.log("Normativa eliminada:", normativa)
    setIsEliminarModalOpen(false)
    setNormativaSeleccionada(null)
  }

  return (
    <div className="space-y-6">
      {/* Acciones */}
      <div className="flex items-center gap-4 ml-3 sm:ml-4 md:ml-6">
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
      </div>

      {/* Lista de normativa */}
      <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
        <div className="p-3 sm:p-4 md:p-6">
          {/* Lista de items */}
          <div className="space-y-0">
            {NORMATIVA_DATA.map((normativa, index) => (
              <div key={normativa.id}>
                <div className="flex items-center justify-between py-2 sm:py-3">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                    <Checkbox 
                      checked={selectedItems.includes(normativa.id)}
                      onCheckedChange={(checked) => handleSelectItem(normativa.id, checked as boolean)}
                      className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777] flex-shrink-0"
                    />
                    <span className="text-sm font-normal text-[#333333] truncate">
                      {normativa.nombre}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Dropdown de acciones */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#1C1C1C] hover:text-[#6137E5]"
                        >
                          <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48 sm:w-54" align="end">
                        <DropdownMenuItem 
                          className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-xs sm:text-sm font-medium"
                          onClick={() => handleEditar(normativa)}
                        >
                          <LapizIcon />
                          <span className="hidden sm:inline">Editar normativa</span>
                          <span className="sm:hidden">Editar normativa</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-xs sm:text-sm font-medium"
                          onClick={() => handleEliminar(normativa)}
                        >
                          <TachoIcon />
                          <span className="hidden sm:inline">Eliminar normativa</span>
                          <span className="sm:hidden">Eliminar normativa</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Línea separadora horizontal */}
                {index < NORMATIVA_DATA.length - 1 && (
                  <div className="border-b-2 border-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <div className="flex items-center space-x-2 text-[#FF4444] text-sm">
        <AlertIcon />
        <span>La normativa establece las reglas y políticas que rigen el servicio</span>
      </div>

      {/* Modales */}
      <EditarNormativaModal
        isOpen={isEditarModalOpen}
        onClose={() => setIsEditarModalOpen(false)}
        onSave={handleConfirmarEditar}
        normativa={normativaSeleccionada}
      />

      <EliminarNormativaModal
        isOpen={isEliminarModalOpen}
        onClose={() => setIsEliminarModalOpen(false)}
        onConfirm={handleConfirmarEliminar}
        normativa={normativaSeleccionada}
      />
    </div>
  )
}

