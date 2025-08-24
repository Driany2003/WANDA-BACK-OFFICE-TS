"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RefreshCw, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LapizIcon, TachoIcon } from "@/components/icons/adminitracion-icon"
import { EditarSuscriptorModal, EliminarSuscriptorModal } from "@/components/modals/administracion"

interface SuscriptorTemporal {
  id: string
  nombre: string
  usuarioTiktok: string
  celular: string
  estado: string
}

interface SuscriptoresTemporalesProps {
  onEditSuscriptor: (suscriptor: any) => void
}

export function SuscriptoresTemporales({ onEditSuscriptor }: SuscriptoresTemporalesProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  
  // Estados para los modales
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [suscriptorSeleccionado, setSuscriptorSeleccionado] = useState<any>(null)

  // Datos de ejemplo para suscriptores temporales
  const SUSCRIPTORES_TEMPORALES_DATA: SuscriptorTemporal[] = [
    {
      id: "1",
      nombre: "Chuy Román",
      usuarioTiktok: "@ChuRo",
      celular: "987 000 000",
      estado: "Activo"
    },
    {
      id: "2",
      nombre: "Luis Daza",
      usuarioTiktok: "@Luis22",
      celular: "934 000 000",
      estado: "Inactivo"
    }
  ]

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(SUSCRIPTORES_TEMPORALES_DATA.map(item => item.id))
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
    console.log("Refrescando suscriptores temporales...")
  }

  const handleDeleteSelected = () => {
    console.log("Eliminando suscriptores temporales seleccionados:", selectedItems)
  }

  const handleEditSuscriptor = (id: string) => {
    const suscriptor = SUSCRIPTORES_TEMPORALES_DATA.find(item => item.id === id)
    if (suscriptor) {
      setSuscriptorSeleccionado(suscriptor)
      setIsEditarModalOpen(true)
    }
  }

  const handleDeleteSuscriptor = (id: string) => {
    const suscriptor = SUSCRIPTORES_TEMPORALES_DATA.find(item => item.id === id)
    if (suscriptor) {
      setSuscriptorSeleccionado(suscriptor)
      setIsEliminarModalOpen(true)
    }
  }

  const handleEditarSuscriptor = (data: any) => {
    console.log("Editando suscriptor:", data)
    // Aquí iría la lógica para editar el suscriptor
  }

  const handleConfirmarEliminar = (id: string) => {
    console.log("Eliminando suscriptor:", id)
    // Aquí iría la lógica para eliminar el suscriptor
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

      {/* Tabla de suscriptores temporales */}
      <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="border-b border-gray-200" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <tr>
                <th className="w-1/5 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Nombre
                </th>
                <th className="w-1/5 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Usuario TikTok
                </th>
                <th className="w-1/5 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Celular
                </th>
                <th className="w-1/5 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Estado
                </th>
                <th className="w-1/5 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#FBFBFB]">
              {SUSCRIPTORES_TEMPORALES_DATA.map((item, index) => (
                <tr 
                  key={item.id} 
                  className="bg-[#FBFBFB]"
                  style={{ 
                    borderBottom: index < SUSCRIPTORES_TEMPORALES_DATA.length - 1 ? '1px solid #A4A4A4' : 'none'
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                        className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
                      />
                      <span className="text-sm font-normal text-gray-900 flex-1 text-center">{item.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {item.usuarioTiktok}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {item.celular}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(item.estado)}`}>
                      {item.estado}
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
                          onClick={() => handleEditSuscriptor(item.id)} 
                          className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium"
                        >
                          <LapizIcon />
                          Editar suscriptor
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteSuscriptor(item.id)} 
                          className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium"
                        >
                          <TachoIcon />
                          Eliminar suscriptor
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

      {/* Modales */}
      {suscriptorSeleccionado && (
        <>
          <EditarSuscriptorModal
            isOpen={isEditarModalOpen}
            onClose={() => setIsEditarModalOpen(false)}
            suscriptor={suscriptorSeleccionado}
            onSave={handleEditarSuscriptor}
          />
          <EliminarSuscriptorModal
            isOpen={isEliminarModalOpen}
            onClose={() => setIsEliminarModalOpen(false)}
            suscriptor={suscriptorSeleccionado}
            onConfirm={handleConfirmarEliminar}
          />
        </>
      )}
    </div>
  )
}
