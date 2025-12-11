"use client"

import { useState } from "react"
import { Plus, MoreVertical } from "lucide-react"
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

export default function TikTokPage() {
  const [checkedSuscriptores, setCheckedSuscriptores] = useState<string[]>([])
  const [checkedConcursos, setCheckedConcursos] = useState<string[]>([])
  
  // Estados para los modales
  const [isAgregarModalOpen, setIsAgregarModalOpen] = useState(false)
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [concursoSeleccionado, setConcursoSeleccionado] = useState<any>(null)

  const suscriptores = [
    { id: "1", usuarioTiktok: "@Jose2509", nombre: "José Sánchez", fecha: "25/09/2024", cantidadOpciones: 2 },
    { id: "2", usuarioTiktok: "@Jesus21", nombre: "Jesús López", fecha: "25/09/2024", cantidadOpciones: 1 },
  ]

  const proximosConcursos = [
    { id: "1", nombre: "Cartas", fecha: "13/10/2024", anfitrion: "Joselin Quispe", horario: "10:00pm" },
  ]

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

  const handleEditarJuego = (id: string) => {
    const concurso = proximosConcursos.find(c => c.id === id)
    if (concurso) {
      setConcursoSeleccionado(concurso)
      setIsEditarModalOpen(true)
    }
  }

  const handleEliminarJuego = (id: string) => {
    const concurso = proximosConcursos.find(c => c.id === id)
    if (concurso) {
      setConcursoSeleccionado({
        id: concurso.id,
        nombre: concurso.nombre
      })
      setIsEliminarModalOpen(true)
    }
  }

  const handleAgregarConcurso = (data: any) => {
    console.log("Agregando concurso:", data)
    // Aquí iría la lógica para agregar el concurso
    setIsAgregarModalOpen(false)
  }

  const handleGuardarEdicion = (data: any) => {
    console.log("Guardando edición de concurso:", data)
    // Aquí iría la lógica para guardar los cambios
    setIsEditarModalOpen(false)
    setConcursoSeleccionado(null)
  }

  const handleConfirmarEliminacion = (id: string) => {
    console.log("Confirmando eliminación de concurso:", id)
    // Aquí iría la lógica para eliminar el concurso
    setIsEliminarModalOpen(false)
    setConcursoSeleccionado(null)
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
          <button 
            onClick={() => setIsAgregarModalOpen(true)}
            className="bg-gradient-to-r from-[#DB086E] to-[#3A05DF] text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>
        
        {proximosConcursos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Image
              src="/no-hay-concursos.png"
              alt="No hay concursos"
              width={320}
              height={320}
              className="w-80 h-80 object-contain"
            />
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
                      key={concurso.id} 
                      className="bg-[#FBFBFB]"
                      style={{ 
                        borderBottom: index < proximosConcursos.length - 1 ? '1px solid #A4A4A4' : 'none'
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            checked={checkedConcursos.includes(concurso.id)}
                            onCheckedChange={() => toggleConcursoCheck(concurso.id)}
                            className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
                          />
                          <span className="text-sm font-normal text-gray-900 flex-1 text-center">{concurso.nombre}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                        {concurso.fecha}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                        {concurso.anfitrion}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                        {concurso.horario}
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
                              onClick={() => handleEditarJuego(concurso.id)}
                              className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium"
                            >
                              <LapizIcon />
                              Editar juego
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleEliminarJuego(concurso.id)}
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
          <EditarConcursoModal
            isOpen={isEditarModalOpen}
            onClose={() => {
              setIsEditarModalOpen(false)
              setConcursoSeleccionado(null)
            }}
            onSave={handleGuardarEdicion}
            concursoData={concursoSeleccionado}
          />
          
          <EliminarConcursoModal
            isOpen={isEliminarModalOpen}
            onClose={() => {
              setIsEliminarModalOpen(false)
              setConcursoSeleccionado(null)
            }}
            concurso={concursoSeleccionado}
            onConfirm={handleConfirmarEliminacion}
          />
        </>
      )}
    </div>
  )
}
