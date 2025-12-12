"use client"

import { useState, useEffect } from "react"
import { Plus, MoreVertical, RefreshCw } from "lucide-react"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TachoIcon, LapizIcon } from "@/components/icons/tiktok-icons"
import { AgregarConcursoModal, EditarConcursoModal, EliminarConcursoModal } from "@/components/modals/tiktok"
import { concursoApi, ConcursoAdminDTO, ConcursoCreateDTO, ConcursoUpdateDTO } from "@/lib/api"
import { format } from "date-fns"

export default function TikTokPage() {
  const [checkedSuscriptores, setCheckedSuscriptores] = useState<string[]>([])
  const [checkedConcursos, setCheckedConcursos] = useState<string[]>([])
  const [proximosConcursos, setProximosConcursos] = useState<ConcursoAdminDTO[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  // Estados para los modales
  const [isAgregarModalOpen, setIsAgregarModalOpen] = useState(false)
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [concursoSeleccionado, setConcursoSeleccionado] = useState<{
    id: string
    nombre: string
    fecha?: string
    anfitrion?: string
    horario?: string
    originalData?: ConcursoAdminDTO
  } | null>(null)

  const suscriptores = [
    { id: "1", usuarioTiktok: "@Jose2509", nombre: "José Sánchez", fecha: "25/09/2024", cantidadOpciones: 2 },
    { id: "2", usuarioTiktok: "@Jesus21", nombre: "Jesús López", fecha: "25/09/2024", cantidadOpciones: 1 },
  ]

  // Función para formatear fecha sin problemas de zona horaria
  const formatDate = (dateString: string): string => {
    try {
      // Si viene en formato "yyyy-mm-dd" o "yyyy-mm-dd hh:mm:ss", extraer solo la fecha
      const dateOnly = dateString.split(' ')[0].split('T')[0]
      const [year, month, day] = dateOnly.split('-')
      // Crear fecha en hora local para evitar problemas de zona horaria
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      })
    } catch {
      return dateString
    }
  }

  // Función para formatear hora (HH:mm)
  const formatHora = (hora?: string): string => {
    if (!hora) return '-'
    return hora.length >= 5 ? hora.substring(0, 5) : hora
  }

  // Cargar concursos activos
  const fetchProximosConcursos = async () => {
    try {
      setIsLoading(true)
      const data = await concursoApi.findAllActiveForAdmin()
      setProximosConcursos(data)
    } catch (error) {
      console.error("Error al obtener próximos concursos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProximosConcursos()
  }, [])

  const toggleSuscriptorCheck = (id: string) => {
    setCheckedSuscriptores(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
  }

  const toggleConcursoCheck = (id: string) => {
    setCheckedConcursos(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
  }

  const handleEditarJuego = (concurso: ConcursoAdminDTO) => {
    // Adaptar ConcursoAdminDTO al formato que espera el modal
    // Usar la fecha original del backend para evitar problemas de zona horaria
    setConcursoSeleccionado({
      id: concurso.concId.toString(),
      nombre: concurso.concNombre,
      fecha: concurso.concFechaPropuesta, // Enviar la fecha original del backend
      anfitrion: concurso.nombreAnfitrion,
      horario: concurso.concHora || '',
      originalData: concurso
    })
    setIsEditarModalOpen(true)
  }

  const handleEliminarJuego = (concurso: ConcursoAdminDTO) => {
    // Adaptar ConcursoAdminDTO al formato que espera el modal
    setConcursoSeleccionado({
      id: concurso.concId.toString(),
      nombre: concurso.concNombre,
      originalData: concurso // Guardar los datos originales para referencia
    })
    setIsEliminarModalOpen(true)
  }

  const handleAgregarConcurso = async (data: any) => {
    // El modal de agregar en TikTok no tiene todos los campos necesarios
    // Por ahora solo refrescamos la lista
    fetchProximosConcursos()
    setIsAgregarModalOpen(false)
  }

  const handleGuardarEdicion = async (data: any) => {
    try {
      if (!concursoSeleccionado?.originalData) return
      
      const fechaFormateada = data.fecha 
        ? format(data.fecha, "yyyy-MM-dd") 
        : format(new Date(concursoSeleccionado.originalData.concFechaPropuesta), "yyyy-MM-dd")
      
      const updateData: ConcursoUpdateDTO = {
        concId: parseInt(data.id),
        concNombre: data.nombre,
        concFechaPropuesta: `${fechaFormateada} 00:00:00`,
        concHora: data.hora || undefined,
        usuaId: data.usuaId || concursoSeleccionado.originalData.usuaId,
        concWc: concursoSeleccionado.originalData.concWc,
        concImagen: concursoSeleccionado.originalData.concImagen,
        concIsActive: true
      }
      
      await concursoApi.updateWithImage(updateData)
      fetchProximosConcursos()
      setIsEditarModalOpen(false)
      setConcursoSeleccionado(null)
    } catch (error) {
      console.error("Error al editar concurso:", error)
    }
  }

  const handleConfirmarEliminacion = async (id: string) => {
    try {
      if (!concursoSeleccionado?.originalData) return
      
      await concursoApi.delete(concursoSeleccionado.originalData.concId)
      fetchProximosConcursos()
      setIsEliminarModalOpen(false)
      setConcursoSeleccionado(null)
    } catch (error) {
      console.error("Error al eliminar concurso:", error)
    }
  }

  return (
    <div className="space-y-6 p-5 pt-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#DB086E] to-[#3A05DF] bg-clip-text text-transparent">
            TikTok
          </h1>
        </div>
      </div>

      {/* Sección Carritos con imagen */}
      <div className="overflow-hidden">
        <div className="p-6">
          <h2 className="text-base font-medium text-black mb-3">Carritos</h2>
          <div className="flex justify-center">
            <Image
              src="/tiktok-carritos.png"
              alt="TikTok Carritos"
              width={251}
              height={231}
              className="rounded"
              style={{ borderRadius: '4px' }}
            />
          </div>
        </div>
      </div>

      {/* Sección Suscriptores */}
      <div className="space-y-6">
        <div className="p-6">
          <h2 className="text-base font-medium text-black">Suscriptores</h2>
        </div>
        
        <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead className="bg-[#FEFEFE] border-b border-gray-200" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <tr>
                  <th className="w-1/4 px-6 py-3 text-center text-base font-medium text-[#1C1C1C] tracking-wider">
                    Usuario TikTok
                  </th>
                  <th className="w-1/4 px-6 py-3 text-center text-base font-medium text-[#1C1C1C] tracking-wider">
                    Nombre
                  </th>
                  <th className="w-1/4 px-6 py-3 text-center text-base font-medium text-[#1C1C1C] tracking-wider">
                    Fecha
                  </th>
                  <th className="w-1/4 px-6 py-3 text-center text-base font-medium text-[#1C1C1C] tracking-wider">
                    Cantidad opciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#FBFBFB]">
                {suscriptores.map((suscriptor, index) => (
                  <tr 
                    key={suscriptor.id} 
                    className="bg-[#FBFBFB]"
                    style={{ 
                      borderBottom: index < suscriptores.length - 1 ? '1px solid #A4A4A4' : 'none'
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          checked={checkedSuscriptores.includes(suscriptor.id)}
                          onCheckedChange={() => toggleSuscriptorCheck(suscriptor.id)}
                          className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
                        />
                        <span className="text-sm font-normal text-gray-900 flex-1 text-center">{suscriptor.usuarioTiktok}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                      {suscriptor.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                      {suscriptor.fecha}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                      {suscriptor.cantidadOpciones}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sección Próximos concursos */}
      <div className="space-y-6">
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-base font-medium text-black">Próximos concursos</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchProximosConcursos}
              className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100"
              title="Refrescar"
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={() => setIsAgregarModalOpen(true)}
              className="bg-gradient-to-r from-[#DB086E] to-[#3A05DF] text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Agregar
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : proximosConcursos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-600 text-base">No hay próximos concursos por ahora</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead className="border-b border-gray-200" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                  <tr>
                    <th className="w-1/5 px-6 py-3 text-center text-sm font-medium text-gray-900">
                      Nombre
                    </th>
                    <th className="w-1/5 px-6 py-3 text-center text-sm font-medium text-gray-900">
                      Fecha
                    </th>
                    <th className="w-1/5 px-6 py-3 text-center text-sm font-medium text-gray-900">
                      Anfitrión(a)
                    </th>
                    <th className="w-1/5 px-6 py-3 text-center text-sm font-medium text-gray-900">
                      Horario
                    </th>
                    <th className="w-1/5 px-6 py-3 text-center text-sm font-medium text-gray-900">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#FBFBFB]">
                  {proximosConcursos.map((concurso, index) => (
                    <tr 
                      key={concurso.concId} 
                      className="bg-[#FBFBFB]"
                      style={{ 
                        borderBottom: index < proximosConcursos.length - 1 ? '1px solid #A4A4A4' : 'none'
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            checked={checkedConcursos.includes(concurso.concId.toString())}
                            onCheckedChange={() => toggleConcursoCheck(concurso.concId.toString())}
                            className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
                          />
                          <span className="text-sm font-normal text-gray-900 flex-1 text-center">{concurso.concNombre}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                        {formatDate(concurso.concFechaPropuesta)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                        {concurso.nombreAnfitrion}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                        {formatHora(concurso.concHora)}
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
                              onClick={() => handleEditarJuego(concurso)}
                              className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium"
                            >
                              <LapizIcon />
                              Editar juego
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleEliminarJuego(concurso)}
                              className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium"
                            >
                              <TachoIcon />
                              Eliminar juego
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
      </div>

      {/* Modales */}
      <AgregarConcursoModal
        isOpen={isAgregarModalOpen}
        onClose={() => setIsAgregarModalOpen(false)}
        onSave={handleAgregarConcurso}
      />

      {concursoSeleccionado && (
        <>
          {concursoSeleccionado.fecha && concursoSeleccionado.anfitrion && concursoSeleccionado.horario && (
            <EditarConcursoModal
              isOpen={isEditarModalOpen}
              onClose={() => {
                setIsEditarModalOpen(false)
                setConcursoSeleccionado(null)
              }}
              onSave={handleGuardarEdicion}
              concursoData={{
                id: concursoSeleccionado.id,
                nombre: concursoSeleccionado.nombre,
                fecha: concursoSeleccionado.fecha,
                anfitrion: concursoSeleccionado.anfitrion,
                horario: concursoSeleccionado.horario
              }}
            />
          )}
          
          <EliminarConcursoModal
            isOpen={isEliminarModalOpen}
            onClose={() => {
              setIsEliminarModalOpen(false)
              setConcursoSeleccionado(null)
            }}
            concurso={{
              id: concursoSeleccionado.id,
              nombre: concursoSeleccionado.nombre
            }}
            onConfirm={handleConfirmarEliminacion}
          />
        </>
      )}
    </div>
  )
}
