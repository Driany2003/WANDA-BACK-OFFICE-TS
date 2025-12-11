"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, RefreshCw } from "lucide-react"
import { LapizIcon, TachoIcon } from "@/components/icons/configuraciones-icons"
import { EditarParametroModal, EliminarParametroModal } from "@/components/modals/configuraciones"
import { parametrosAPI, ParametroResponse } from "@/lib/api"

interface ParametrosProps {
  onParametroUpdated?: () => void
  refreshTrigger?: number
}

export function Parametros({ onParametroUpdated, refreshTrigger }: ParametrosProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [parametros, setParametros] = useState<ParametroResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [parametroSeleccionado, setParametroSeleccionado] = useState<ParametroResponse | null>(null)

  useEffect(() => {
    fetchParametros()
  }, [])

  // Actualizar tabla cuando cambia refreshTrigger (desde agregar parámetro)
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      fetchParametros()
    }
  }, [refreshTrigger])

  const fetchParametros = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await parametrosAPI.getAll()
      setParametros(data)
    } catch (error) {
      console.error('Error al cargar parámetros:', error)
      setError('Error al cargar los parámetros')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? parametros.map(item => item.paraId?.toString() || '') : [])
    setSelectAll(checked)
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    setSelectedItems(prev => checked ? [...prev, id] : prev.filter(item => item !== id))
  }

  const handleEditarParametro = (parametro: ParametroResponse) => {
    setParametroSeleccionado(parametro)
    setIsEditarModalOpen(true)
  }

  const handleEliminarParametro = (parametro: ParametroResponse) => {
    setParametroSeleccionado(parametro)
    setIsEliminarModalOpen(true)
  }

  const handleConfirmarEditar = () => {
    setIsEditarModalOpen(false)
    setParametroSeleccionado(null)
    // Pequeño delay para asegurar que el backend procesó la actualización
    setTimeout(() => {
      fetchParametros()
    }, 300)
  }

  const handleConfirmarEliminar = () => {
    setIsEliminarModalOpen(false)
    setParametroSeleccionado(null)
    // Pequeño delay para asegurar que el backend procesó la eliminación
    setTimeout(() => {
      fetchParametros()
    }, 300)
  }

  const getEstadoColor = (estado?: string) => {
    const estadoLower = estado?.toLowerCase()
    if (estadoLower === 'activo' || estadoLower === 'activa') {
      return "bg-[#6137E5] text-white"
    }
    return "bg-white text-[#6137E5] border border-[#6137E5]"
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    try {
      const date = new Date(dateString)
      // Formato: DD/MM/YYYY
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    } catch {
      return '-'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Checkbox
          checked={selectAll}
          onCheckedChange={handleSelectAll}
          className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
        />
        <button
          onClick={fetchParametros}
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
            onClick={fetchParametros}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-gray-400 mb-4" />
          <p className="text-gray-500">Cargando parámetros...</p>
        </div>
      )}

      {!loading && !error && parametros.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Image
            src="/no-hay-concursos.png"
            alt="No hay parámetros"
            width={320}
            height={320}
            className="w-80 h-80 object-contain mb-4"
          />
          <p className="text-gray-500">No hay parámetros disponibles</p>
        </div>
      )}
      {!loading && !error && parametros.length > 0 && (
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
                {parametros.map((item, index) => (
                <tr 
                  key={item.paraId} 
                  className="bg-[#FBFBFB]"
                  style={{ 
                    borderBottom: index < parametros.length - 1 ? '1px solid #A4A4A4' : 'none'
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        checked={selectedItems.includes(item.paraId?.toString() || '')}
                        onCheckedChange={(checked) => handleSelectItem(item.paraId?.toString() || '', checked as boolean)}
                        className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
                      />
                      <span className="text-sm font-normal text-gray-900 flex-1 text-center">{item.paraNombre || '-'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {item.paraValor || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {item.paraDescripcion || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {formatDate(item.paraFechaRegistrado)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {formatDate(item.paraFechaModificado)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium w-20 inline-flex items-center justify-center ${getEstadoColor(item.paraEstado)}`}>
                      {item.paraEstado || (item.paraIsActive ? 'Activo' : 'Inactivo')}
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
      )}

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
