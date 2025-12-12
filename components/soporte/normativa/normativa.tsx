"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, RefreshCw } from "lucide-react"
import { LapizIcon, TachoIcon, AlertIcon } from "@/components/icons/soporte-icons"
import { EditarNormativaModal, EliminarNormativaModal } from "@/components/modals/soporte"
import { normativasAPI, NormativaResponse } from "@/lib/api"

interface NormativaProps {
  refreshTrigger?: number
}

export function Normativa({ refreshTrigger }: NormativaProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [normativaSeleccionada, setNormativaSeleccionada] = useState<NormativaResponse | null>(null)
  const [normativas, setNormativas] = useState<NormativaResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchNormativas = async () => {
    try {
      setIsLoading(true)
      const data = await normativasAPI.getAll()
      setNormativas(data)
    } catch (error) {
      console.error("Error al obtener normativas:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNormativas()
  }, [refreshTrigger])

  const formatDate = (dateString?: string): string => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      })
    } catch {
      return dateString
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(normativas.map(item => item.normaId?.toString() || "").filter(Boolean))
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
    fetchNormativas()
  }

  const handleEditar = (normativa: NormativaResponse) => {
    setNormativaSeleccionada(normativa)
    setIsEditarModalOpen(true)
  }

  const handleEliminar = (normativa: NormativaResponse) => {
    setNormativaSeleccionada(normativa)
    setIsEliminarModalOpen(true)
  }

  const handleConfirmarEditar = () => {
    setIsEditarModalOpen(false)
    setNormativaSeleccionada(null)
    setTimeout(() => {
      fetchNormativas()
    }, 300)
  }

  const handleConfirmarEliminar = () => {
    setIsEliminarModalOpen(false)
    setNormativaSeleccionada(null)
    setTimeout(() => {
      fetchNormativas()
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

      {/* Lista de normativa */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : normativas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Image
            src="/no-hay-concursos.png"
            alt="No hay normativas"
            width={320}
            height={320}
            className="w-80 h-80 object-contain mb-4"
          />
          <p className="text-gray-500">No hay normativas disponibles</p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
            <div className="p-3 sm:p-4 md:p-6">
              {/* Lista de items */}
              <div className="space-y-0">
                {normativas.map((normativa, index) => (
                  <div key={normativa.normaId}>
                    <div className="flex items-center justify-between py-2 sm:py-3">
                      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                        <Checkbox 
                          checked={selectedItems.includes(normativa.normaId?.toString() || "")}
                          onCheckedChange={(checked) => handleSelectItem(normativa.normaId?.toString() || "", checked as boolean)}
                          className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777] flex-shrink-0"
                        />
                        <span className="text-sm font-normal text-[#333333] truncate">
                          {normativa.normaTitulo}
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
                              <span>Editar normativa</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-xs sm:text-sm font-medium"
                              onClick={() => handleEliminar(normativa)}
                            >
                              <TachoIcon />
                              <span>Eliminar normativa</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    {/* Línea separadora horizontal */}
                    {index < normativas.length - 1 && (
                      <div className="border-b-2 border-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Message */}
          {normativas.length > 0 && (
            <div className="flex items-center space-x-2 text-[#FF4444] text-sm">
              <AlertIcon />
              <span>La normativa establece las reglas y políticas que rigen el servicio</span>
            </div>
          )}
        </>
      )}

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

