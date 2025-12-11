"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
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
import { novedadesAPI, NovedadesListResponse } from "@/lib/api"

interface NovedadesInactivasProps {
  onNovedadUpdated?: () => void
}

export function NovedadesInactivas({ onNovedadUpdated }: NovedadesInactivasProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [novedades, setNovedades] = useState<NovedadesListResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Estados para los modales
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [novedadSeleccionada, setNovedadSeleccionada] = useState<any>(null)
  const [novedadIdParaEditar, setNovedadIdParaEditar] = useState<number | null>(null)

  // Cargar novedades inactivas al montar el componente
  useEffect(() => {
    fetchNovedadesInactivas()
  }, [])

  const fetchNovedadesInactivas = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await novedadesAPI.getInactivas()
      // Filtrar solo las que realmente están inactivas (por si el backend devuelve algo incorrecto)
      const inactivas = data.filter(n => 
        n.noveEstado?.toLowerCase() === 'inactiva' || 
        n.noveEstado?.toLowerCase() === 'inactivo'
      )
      setNovedades(inactivas)
    } catch (error) {
      console.error('Error al cargar novedades inactivas:', error)
      setError('Error al cargar las novedades inactivas')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? novedades.map(item => item.noveId.toString()) : [])
    setSelectAll(checked)
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    setSelectedItems(prev => checked ? [...prev, id] : prev.filter(item => item !== id))
  }

  const handleGuardarEdicion = () => {
    onNovedadUpdated?.()
    setTimeout(fetchNovedadesInactivas, 300)
    setNovedadIdParaEditar(null)
  }

  const handleConfirmarEliminacion = () => {
    setIsEliminarModalOpen(false)
    fetchNovedadesInactivas()
  }

  const handleEditarNovedad = (id: string) => {
    const novedad = novedades.find(n => n.noveId.toString() === id)
    if (novedad) {
      setNovedadIdParaEditar(novedad.noveId)
      setIsEditarModalOpen(true)
    }
  }

  const handleEliminarNovedad = (id: string) => {
    const novedad = novedades.find(n => n.noveId.toString() === id)
    if (novedad) {
      setNovedadSeleccionada({ id: novedad.noveId, nombre: novedad.noveTitulo })
      setIsEliminarModalOpen(true)
    }
  }

  return (
    <div className="space-y-6">
      {/* Acciones */}
      <div className="flex items-center gap-4">
        <Checkbox
          checked={selectAll}
          onCheckedChange={handleSelectAll}
          className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
        />
        <button
          onClick={fetchNovedadesInactivas}
          className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100"
          title="Refrescar"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
        {selectedItems.length > 0 && (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Eliminar seleccionados ({selectedItems.length})
          </button>
        )}
      </div>

      {/* Error State */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchNovedadesInactivas}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-gray-400 mb-4" />
          <p className="text-gray-500">Cargando novedades inactivas...</p>
        </div>
      )}

      {/* Empty State or Table */}
      {!loading && !error && novedades.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Image
            src="/no-hay-concursos.png"
            alt="No hay novedades"
            width={320}
            height={320}
            className="w-80 h-80 object-contain mb-4"
          />
          <p className="text-gray-500">No hay novedades disponibles</p>
        </div>
      )}
      {!loading && !error && novedades.length > 0 && (
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
                {
                novedades.map((novedad, index) => (
                  <tr 
                    key={novedad.noveId} 
                    className="bg-[#FBFBFB]"
                    style={{ 
                      borderBottom: index < novedades.length - 1 ? '1px solid #A4A4A4' : 'none'
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          checked={selectedItems.includes(novedad.noveId.toString())}
                          onCheckedChange={(checked) => handleSelectItem(novedad.noveId.toString(), checked as boolean)}
                          className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
                        />
                        <span className="text-sm font-normal text-gray-900 flex-1 text-center">{novedad.noveTitulo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="bg-[#FBFBFB] text-[#6137E5] border border-[#6137E5] px-3 py-1 rounded-full text-xs font-medium">
                        {novedad.noveEstado}
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
                            onClick={() => handleEditarNovedad(novedad.noveId.toString())}
                            className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium"
                          >
                            <LapizIcon />
                            Editar novedad
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleEliminarNovedad(novedad.noveId.toString())}
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
      )}

      {/* Modal de Editar Novedad */}
      {novedadIdParaEditar && (
        <EditarNovedadModal
          isOpen={isEditarModalOpen}
          onClose={() => {
            setIsEditarModalOpen(false)
            setNovedadIdParaEditar(null)
          }}
          onSave={handleGuardarEdicion}
          novedadId={novedadIdParaEditar}
        />
      )}
      {novedadSeleccionada && (
        <EliminarNovedadModal
          isOpen={isEliminarModalOpen}
          onClose={() => setIsEliminarModalOpen(false)}
          onConfirm={handleConfirmarEliminacion}
          novedad={novedadSeleccionada}
        />
      )}
    </div>
  )
}
