"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, RefreshCw } from "lucide-react"
import { LapizIcon, TachoIcon, AlertIcon } from "@/components/icons/soporte-icons"
import { EditarPreguntaModal, EliminarPreguntaModal } from "@/components/modals/soporte"


interface Pregunta {
  id: string
  pregunta: string
  respuesta: string
  fecha: string
}



export function PreguntasFrecuentes() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState<Pregunta | null>(null)
  
  // Datos de ejemplo para preguntas frecuentes
  const PREGUNTAS_DATA: Pregunta[] = [
    {
      id: "1",
      pregunta: "¿Cómo solicito un retiro?",
      respuesta: "Para solicitar un retiro, ve a la sección de transacciones y selecciona la opción de retiro.",
      fecha: "15/12/2024"
    },
    {
      id: "2",
      pregunta: "¿Dónde puedo ver mis promociones?",
      respuesta: "Puedes ver tus promociones en la sección de promociones de tu perfil.",
      fecha: "10/12/2024"
    },
    {
      id: "3",
      pregunta: "¿Dónde puedo encontrar mi historial de retiros?",
      respuesta: "Tu historial de retiros está disponible en la sección de transacciones.",
      fecha: "05/12/2024"
    }
  ]

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(PREGUNTAS_DATA.map(item => item.id))
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
    console.log("Refrescando preguntas frecuentes...")
  }

  const handleEditar = (pregunta: Pregunta) => {
    setPreguntaSeleccionada(pregunta)
    setIsEditarModalOpen(true)
  }

  const handleEliminar = (pregunta: Pregunta) => {
    setPreguntaSeleccionada(pregunta)
    setIsEliminarModalOpen(true)
  }

  const handleConfirmarEditar = (preguntaEditada: Pregunta) => {
    // Aquí actualizarías los datos en la base de datos
    console.log("Pregunta editada:", preguntaEditada)
    setIsEditarModalOpen(false)
    setPreguntaSeleccionada(null)
  }

  const handleConfirmarEliminar = (pregunta: Pregunta) => {
    // Aquí eliminarías la pregunta de la base de datos
    console.log("Pregunta eliminada:", pregunta)
    setIsEliminarModalOpen(false)
    setPreguntaSeleccionada(null)
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

      {/* Lista de preguntas frecuentes */}
      <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
        <div className="p-3 sm:p-4 md:p-6">
          {/* Lista de items */}
          <div className="space-y-0">
            {PREGUNTAS_DATA.map((pregunta, index) => (
              <div key={pregunta.id}>
                <div className="flex items-center justify-between py-2 sm:py-3">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                    <Checkbox 
                      checked={selectedItems.includes(pregunta.id)}
                      onCheckedChange={(checked) => handleSelectItem(pregunta.id, checked as boolean)}
                      className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777] flex-shrink-0"
                    />
                    <span className="text-sm font-normal text-[#333333] truncate">
                      {pregunta.pregunta}
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
                          onClick={() => {
                            console.log("Click en Editar pregunta")
                            handleEditar(pregunta)
                          }}
                        >
                          <LapizIcon />
                          <span className="hidden sm:inline">Editar pregunta</span>
                          <span className="sm:hidden">Editar pregunta</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-xs sm:text-sm font-medium"
                          onClick={() => {
                            console.log("Click en Eliminar pregunta")
                            handleEliminar(pregunta)
                          }}
                        >
                          <TachoIcon />
                          <span className="hidden sm:inline">Eliminar pregunta</span>
                          <span className="sm:hidden">Eliminar pregunta</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Línea separadora horizontal */}
                {index < PREGUNTAS_DATA.length - 1 && (
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
        <span>Las preguntas frecuentes ayudan a los usuarios a resolver dudas comunes</span>
      </div>

      {/* Modales */}
      <EditarPreguntaModal
        isOpen={isEditarModalOpen}
        onClose={() => setIsEditarModalOpen(false)}
        onSave={handleConfirmarEditar}
        pregunta={preguntaSeleccionada}
      />

      <EliminarPreguntaModal
        isOpen={isEliminarModalOpen}
        onClose={() => setIsEliminarModalOpen(false)}
        onConfirm={handleConfirmarEliminar}
        pregunta={preguntaSeleccionada}
      />
    </div>
  )
}
