"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RefreshCw, Plus } from "lucide-react"
import { WCIcon, LapizIcon, TachoIcon } from "@/components/icons/adminitracion-icon"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


interface Concurso {
  id: string
  nombre: string
  fechaTransmision: string
  anfitrion: string
  wcNecesarias: number
  estado: string
}

interface ConcursosProps {
  onEditarConcurso: (concurso: Concurso) => void
  onEliminarConcurso: (concurso: Concurso) => void
}

export function Concursos({ onEditarConcurso, onEliminarConcurso }: ConcursosProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  


  // Datos de ejemplo para concursos
  const CONCURSOS_DATA: Concurso[] = [
    {
      id: "1",
      nombre: "Carritos",
      fechaTransmision: "30/09/2024",
      anfitrion: "Joselin Quispe",
      wcNecesarias: 5,
      estado: "Activo"
    },
    {
      id: "2",
      nombre: "Cartas",
      fechaTransmision: "01/10/2024",
      anfitrion: "Jimena Ortiz",
      wcNecesarias: 7,
      estado: "Inactivo"
    }
  ]

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(CONCURSOS_DATA.map(item => item.id))
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
  }

  const handleDeleteSelected = () => {
    console.log("Eliminando concursos seleccionados:", selectedItems)
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

      {/* Tabla de concursos */}
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
              {CONCURSOS_DATA.map((item, index) => (
                <tr 
                  key={item.id} 
                  className="bg-[#FBFBFB]"
                  style={{ 
                    borderBottom: index < CONCURSOS_DATA.length - 1 ? '1px solid #A4A4A4' : 'none'
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
                    {item.fechaTransmision}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {item.anfitrion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <WCIcon />
                      <span>{item.wcNecesarias}</span>
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
                          onClick={() => {
                            console.log("Editando concurso:", item)
                            onEditarConcurso(item)
                          }}
                          className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium"
                        >
                          <LapizIcon />
                          Editar concurso
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onEliminarConcurso(item)}
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


    </div>
  )
}
