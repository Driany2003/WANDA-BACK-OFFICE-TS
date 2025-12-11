"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RefreshCw, Plus } from "lucide-react"
import { WCIcon, LapizIcon, TachoIcon } from "@/components/icons/adminitracion-icon"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { concursoApi, ConcursoAdminDTO, ConcursoUpdateDTO } from "@/lib/api"
import { EditarConcursoModal, EliminarConcursoModal } from "@/components/modals/administracion"

interface ConcursosProps {
  refreshTrigger?: number // Para refrescar la lista
}

export function Concursos({ refreshTrigger }: ConcursosProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [concursos, setConcursos] = useState<ConcursoAdminDTO[]>([])
  const [loading, setLoading] = useState(false)
  const loadingRef = useRef(false)
  
  // Estados para modales
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [concursoSeleccionado, setConcursoSeleccionado] = useState<ConcursoAdminDTO | null>(null)
  
  // Función para cargar concursos
  const loadConcursos = async () => {
    if (loadingRef.current) {
      console.log('🚫 Carga ya en progreso, saltando...')
      return
    }
    
    try {
      loadingRef.current = true
      setLoading(true)
      const data = await concursoApi.findAllForAdmin()
      console.log('📋 Concursos cargados:', data)
      console.log('🔍 Debug estado:', data.map(c => ({ id: c.concId, nombre: c.concNombre, estado: c.estado, tipo: typeof c.estado })))
      setConcursos(data)
    } catch (error) {
      console.error('❌ Error al cargar concursos:', error)
    } finally {
      setLoading(false)
      loadingRef.current = false
    }
  }

  // Cargar concursos al montar el componente y cuando cambie refreshTrigger
  useEffect(() => {
    loadConcursos()
  }, [refreshTrigger])


  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(concursos.map(item => item.concId.toString()))
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
    console.log("Refrescando concursos...")
    loadConcursos()
  }

  const handleDeleteSelected = () => {
    console.log("Eliminando concursos seleccionados:", selectedItems)
  }

  const handleEditConcurso = (id: number) => {
    const concurso = concursos.find(c => c.concId === id)
    if (concurso) {
      setConcursoSeleccionado(concurso)
      setIsEditarModalOpen(true)
    }
  }

  const handleDeleteConcurso = (id: number) => {
    const concurso = concursos.find(c => c.concId === id)
    if (concurso) {
      setConcursoSeleccionado(concurso)
      setIsEliminarModalOpen(true)
    }
  }

  const handleEditarConcurso = async (data: any) => {
    try {
      console.log("Editando concurso:", data)
      
      // Preparar datos para actualización
      const updateData: ConcursoUpdateDTO = {
        concId: data.concId,
        concNombre: data.concNombre,
        concFechaPropuesta: data.concFechaPropuesta,
        usuaId: data.usuaId,
        concWc: data.concWc,
        concImagen: data.concImagen,
        concIsActive: data.concIsActive
      }
      
      // Usar updateWithImage - si hay nueva imagen la incluye, sino mantiene la actual
      const result = await concursoApi.updateWithImage(updateData, data.nuevaImagen)
      
      console.log('✅ Concurso actualizado:', result)
      
      setIsEditarModalOpen(false)
      loadConcursos() // Refresh la lista
      
    } catch (error) {
      console.error('❌ Error al actualizar concurso:', error)
      alert(`Error: ${error instanceof Error ? error.message : 'Error al actualizar concurso'}`)
    }
  }

  const handleEliminarConcurso = async (concurso: ConcursoAdminDTO) => {
    try {
      console.log("Eliminando concurso:", concurso)
      
      const result = await concursoApi.delete(concurso.concId)
      console.log('✅ Concurso eliminado:', result)
      
      setIsEliminarModalOpen(false)
      loadConcursos() // Refresh la lista
      
    } catch (error) {
      console.error('❌ Error al eliminar concurso:', error)
      alert(`Error: ${error instanceof Error ? error.message : 'Error al eliminar concurso'}`)
    }
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Activo":
        return "bg-[#6137E5] text-white"
      case "Inactivo":
        return "bg-[#FBFBFB] text-[#6137E5] border border-[#6137E5]"
      default:
        return "bg-[#FBFBFB] text-[#6137E5] border border-[#6137E5]"
    }
  }

  return (
    <div className="space-y-6">
      {/* Controles superiores */}
      <div className="flex items-center gap-2 pl-6">
        <Checkbox
          checked={selectAll}
          onCheckedChange={handleSelectAll}
          className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
        >
          <RefreshCw className="w-5 h-5" />
        </Button>
        {selectedItems.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeleteSelected}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H5H21" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-gray-400 mb-4" />
          <p className="text-gray-500">Cargando concursos...</p>
        </div>
      )}

      {/* Empty State or Table */}
      {!loading && concursos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Image
            src="/no-hay-concursos.png"
            alt="No hay concursos"
            width={320}
            height={320}
            className="w-80 h-80 object-contain mb-4"
          />
          <p className="text-gray-500">No hay concursos disponibles</p>
        </div>
      )}
      {!loading && concursos.length > 0 && (
        <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead className="border-b border-gray-200" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <tr>
                  <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                    Concursos
                  </th>
                  <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                    Fecha de transmisión
                  </th>
                  <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                    Anfitrión(a)
                  </th>
                  <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                    WC necesarias
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
                {concursos.map((item, index) => (
                  <tr 
                    key={item.concId} 
                    className="bg-[#FBFBFB]"
                    style={{ 
                      borderBottom: index < concursos.length - 1 ? '1px solid #A4A4A4' : 'none'
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedItems.includes(item.concId.toString())}
                          onCheckedChange={(checked) => handleSelectItem(item.concId.toString(), checked as boolean)}
                          className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
                        />
                        <span className="text-sm font-normal text-gray-900 flex-1 text-center">{item.concNombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                      {new Date(item.concFechaPropuesta).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                      {item.nombreAnfitrion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <WCIcon />
                        <span>{item.concWc}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(item.estado)}`}>
                        {item.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-54">
                          <DropdownMenuItem 
                            onClick={() => handleEditConcurso(item.concId)}
                            className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium"
                          >
                            <LapizIcon />
                            Editar concurso
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteConcurso(item.concId)}
                            className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium"
                          >
                            <TachoIcon />
                            Eliminar concurso
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

      {/* Modales */}
      {concursoSeleccionado && (
        <>
          <EditarConcursoModal
            isOpen={isEditarModalOpen}
            onClose={() => setIsEditarModalOpen(false)}
            concurso={concursoSeleccionado}
            onSave={handleEditarConcurso}
            onReopen={() => setIsEditarModalOpen(true)}
          />
          <EliminarConcursoModal
            isOpen={isEliminarModalOpen}
            onClose={() => setIsEliminarModalOpen(false)}
            concurso={concursoSeleccionado}
            onConfirm={handleEliminarConcurso}
          />
        </>
      )}
    </div>
  )
}
