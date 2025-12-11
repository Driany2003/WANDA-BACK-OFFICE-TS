"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, RefreshCw } from "lucide-react"
import { LapizIcon, TachoIcon, AlertIcon } from "@/components/icons/soporte-icons"
import { EditarPreguntaModal, EliminarPreguntaModal } from "@/components/modals/soporte"
import Image from "next/image"
import { preguntasFrecuentesAPI, PreguntaResponse } from "@/lib/api"

interface Pregunta {
  id: string
  pregunta: string
  respuesta: string
  fecha: string
}

interface PreguntasFrecuentesProps {
  refreshTrigger?: number
}

export function PreguntasFrecuentes({ refreshTrigger }: PreguntasFrecuentesProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [preguntas, setPreguntas] = useState<PreguntaResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState<PreguntaResponse | null>(null)

  useEffect(() => {
    fetchPreguntas()
  }, [])

  // Actualizar tabla cuando cambia refreshTrigger (desde agregar pregunta)
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      fetchPreguntas()
    }
  }, [refreshTrigger])

  const fetchPreguntas = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await preguntasFrecuentesAPI.getAll()
      setPreguntas(data)
    } catch (error) {
      console.error('Error al cargar preguntas frecuentes:', error)
      setError('Error al cargar las preguntas frecuentes')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(preguntas.map(item => item.pfreeId?.toString() || ''))
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
    fetchPreguntas()
  }

  const handleEditar = (pregunta: PreguntaResponse) => {
    setPreguntaSeleccionada(pregunta)
    setIsEditarModalOpen(true)
  }

  const handleEliminar = (pregunta: PreguntaResponse) => {
    setPreguntaSeleccionada(pregunta)
    setIsEliminarModalOpen(true)
  }

  const handleConfirmarEditar = () => {
    setIsEditarModalOpen(false)
    setPreguntaSeleccionada(null)
    setTimeout(() => {
      fetchPreguntas()
    }, 300)
  }

  const handleConfirmarEliminar = () => {
    setIsEliminarModalOpen(false)
    setPreguntaSeleccionada(null)
    setTimeout(() => {
      fetchPreguntas()
    }, 300)
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

      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchPreguntas}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-gray-400 mb-4" />
          <p className="text-gray-500">Cargando preguntas frecuentes...</p>
        </div>
      )}

      {/* Lista de preguntas frecuentes */}
      {!loading && !error && preguntas.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Image
            src="/no-hay-concursos.png"
            alt="No hay preguntas frecuentes"
            width={320}
            height={320}
            className="w-80 h-80 object-contain mb-4"
          />
          <p className="text-gray-500">No hay preguntas frecuentes disponibles</p>
        </div>
      )}
      {!loading && !error && preguntas.length > 0 && (
        <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
          <div className="p-3 sm:p-4 md:p-6">
            {/* Lista de items */}
            <div className="space-y-0">
              {preguntas.map((pregunta, index) => (
                <div key={pregunta.pfreeId}>
                  <div className="flex items-center justify-between py-2 sm:py-3">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                      <Checkbox 
                        checked={selectedItems.includes(pregunta.pfreeId?.toString() || '')}
                        onCheckedChange={(checked) => handleSelectItem(pregunta.pfreeId?.toString() || '', checked as boolean)}
                        className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777] flex-shrink-0"
                      />
                      <span className="text-sm font-normal text-[#333333] truncate">
                        {pregunta.pfreePregunta || '-'}
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
                  {index < preguntas.length - 1 && (
                    <div className="border-b-2 border-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Message - Solo se muestra cuando hay registros */}
      {preguntas.length > 0 && (
        <div className="flex items-center space-x-2 text-[#FF4444] text-sm">
          <AlertIcon />
          <span>Las preguntas frecuentes ayudan a los usuarios a resolver dudas comunes</span>
        </div>
      )}

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
