"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, RefreshCw } from "lucide-react"
import { LapizIcon, TachoIcon, AlertIcon } from "@/components/icons/soporte-icons"
import { EditarPaginaEstaticaModal, EliminarPaginaEstaticaModal } from "@/components/modals/soporte"
import { paginasEstaticasAPI, PaginaEstaticaResponse } from "@/lib/api"
import Image from "next/image"

interface PaginasEstaticasProps {
  refreshTrigger?: number
}

export function PaginasEstaticas({ refreshTrigger = 0 }: PaginasEstaticasProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [paginas, setPaginas] = useState<PaginaEstaticaResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [paginaSeleccionada, setPaginaSeleccionada] = useState<PaginaEstaticaResponse | null>(null)

  const fetchPaginas = async () => {
    try {
      setIsLoading(true)
      const data = await paginasEstaticasAPI.getAll()
      setPaginas(data)
    } catch (error) {
      console.error("Error al obtener páginas estáticas:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPaginas()
  }, [refreshTrigger])

  const refreshAfterOperation = async () => {
    setTimeout(async () => {
      await fetchPaginas()
    }, 300)
  }

  const closeModal = () => {
    setIsEditarModalOpen(false)
    setIsEliminarModalOpen(false)
    setPaginaSeleccionada(null)
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? paginas.map(item => String(item.pestId || '')) : [])
    setSelectAll(checked)
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    setSelectedItems(prev => 
      checked ? [...prev, id] : prev.filter(item => item !== id)
    )
  }

  const handleEditar = (pagina: PaginaEstaticaResponse) => {
    setPaginaSeleccionada(pagina)
    setIsEditarModalOpen(true)
  }

  const handleEliminar = (pagina: PaginaEstaticaResponse) => {
    setPaginaSeleccionada(pagina)
    setIsEliminarModalOpen(true)
  }

  const handleConfirmarEditar = async (_paginaEditada: PaginaEstaticaResponse) => {
    await refreshAfterOperation()
    closeModal()
  }

  const handleConfirmarEliminar = async (pagina: PaginaEstaticaResponse) => {
    if (!pagina.pestId) return
    
    try {
      setIsLoading(true)
      await paginasEstaticasAPI.delete(pagina.pestId)
      await refreshAfterOperation()
      closeModal()
    } catch (error) {
      console.error("Error al eliminar página:", error)
      setIsLoading(false)
    }
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
          onClick={fetchPaginas}
          className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100"
          title="Refrescar"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-gray-400 mb-4" />
          <p className="text-gray-500">Cargando páginas estáticas...</p>
        </div>
      )}

      {/* Lista de páginas estáticas */}
      {!isLoading && paginas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Image
            src="/no-hay-concursos.png"
            alt="No hay páginas estáticas"
            width={320}
            height={320}
            className="w-80 h-80 object-contain mb-4"
          />
          <p className="text-gray-500">No hay páginas estáticas disponibles</p>
        </div>
      ) : !isLoading && (
        <>
          <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
            <div className="p-3 sm:p-4 md:p-6">
              {/* Lista de items */}
              <div className="space-y-0">
                {paginas.map((pagina, index) => (
                  <div key={pagina.pestId}>
                    <div className="flex items-center justify-between py-2 sm:py-3">
                      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                        <Checkbox 
                          checked={selectedItems.includes(String(pagina.pestId || ''))}
                          onCheckedChange={(checked) => handleSelectItem(String(pagina.pestId || ''), checked as boolean)}
                          className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777] flex-shrink-0"
                        />
                        <span className="text-sm font-normal text-[#333333] truncate">
                          {pagina.pestNombre}
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
                              onClick={() => handleEditar(pagina)}
                            >
                              <LapizIcon />
                              <span>Editar página</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-xs sm:text-sm font-medium"
                              onClick={() => handleEliminar(pagina)}
                            >
                              <TachoIcon />
                              <span>Eliminar página</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    {/* Línea separadora horizontal */}
                    {index < paginas.length - 1 && (
                      <div className="border-b-2 border-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Message - Solo se muestra cuando hay registros */}
          {paginas.length > 0 && (
            <div className="flex items-center space-x-2 text-[#FF4444] text-sm">
              <AlertIcon />
              <span>Las páginas estáticas proporcionan información importante a los usuarios</span>
            </div>
          )}
        </>
      )}

      {/* Modales */}
      <EditarPaginaEstaticaModal
        isOpen={isEditarModalOpen}
        onClose={closeModal}
        onSave={handleConfirmarEditar}
        pagina={paginaSeleccionada}
      />

      <EliminarPaginaEstaticaModal
        isOpen={isEliminarModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmarEliminar}
        pagina={paginaSeleccionada}
      />
    </div>
  )
}

