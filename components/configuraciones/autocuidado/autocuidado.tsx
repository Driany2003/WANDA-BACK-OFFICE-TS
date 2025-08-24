"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, RefreshCw } from "lucide-react"
import { WCIcon, TachoIcon } from "@/components/icons/configuraciones-icons"
import { EliminarAutocuidadoModal } from "@/components/modals/configuraciones"

interface AutocuidadoItem {
  id: string
  usuarioTikTok: string
  nombre: string
  limite: string
  cantidad: number
  wcUsadas: number
  alerta: string
}

interface AutocuidadoProps {
  filtroAlerta: string
}

export function Autocuidado({ filtroAlerta }: AutocuidadoProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  
  // Estados para el modal de eliminar
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [alertaSeleccionada, setAlertaSeleccionada] = useState<AutocuidadoItem | null>(null)

  // Datos de ejemplo
  const autocuidadoData: AutocuidadoItem[] = [
    {
      id: "1",
      usuarioTikTok: "@Jose2509",
      nombre: "José Sánchez",
      limite: "Diario",
      cantidad: 50,
      wcUsadas: 10,
      alerta: "Programada"
    },
    {
      id: "2",
      usuarioTikTok: "@Jesús21",
      nombre: "Jesús López",
      limite: "Mensual",
      cantidad: 100,
      wcUsadas: 100,
      alerta: "Enviada"
    },
    {
      id: "3",
      usuarioTikTok: "@Maria123",
      nombre: "María García",
      limite: "Semanal",
      cantidad: 25,
      wcUsadas: 25,
      alerta: "Programada"
    },
    {
      id: "4",
      usuarioTikTok: "@Carlos99",
      nombre: "Carlos Rodríguez",
      limite: "Mensual",
      cantidad: 80,
      wcUsadas: 80,
      alerta: "Enviada"
    }
  ]

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(datosFiltrados.map(item => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id])
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id))
    }
  }

  const handleRefresh = () => {
    // Lógica para refrescar datos
    console.log("Refrescando datos...")
  }

  const handleDeleteAlerta = (alerta: AutocuidadoItem) => {
    setAlertaSeleccionada(alerta)
    setIsEliminarModalOpen(true)
  }

  const handleConfirmarEliminar = (id: string) => {
    console.log("Confirmando eliminación de alerta:", id)
    // Aquí iría la lógica para eliminar la alerta
    setIsEliminarModalOpen(false)
    setAlertaSeleccionada(null)
  }

  const getAlertaColor = (alerta: string) => {
    switch (alerta) {
      case "Programada":
        return "bg-white text-[#6137E5] border border-[#6137E5]"
      case "Enviada":
        return "bg-[#6137E5] text-white"
      default:
        return "bg-[#6137E5] text-white"
    }
  }

  const getLimiteColor = (limite: string) => {
    return "text-[#DB086E]"
  }

  // Filtrar datos según el filtro seleccionado
  const datosFiltrados = autocuidadoData.filter(item => {
    if (filtroAlerta === "todas") return true
    return item.alerta.toLowerCase() === filtroAlerta.toLowerCase()
  })

  return (
    <div className="space-y-6">
      {/* Acciones */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleRefresh}
          className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100"
          title="Refrescar"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      {/* Tabla de autocuidado */}
      <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="border-b border-gray-200" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <tr>
                <th className="w-1/7 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Usuario TikTok
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Nombre
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Límite
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Cantidad
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  WC usadas
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Alerta
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#FBFBFB]">
              {datosFiltrados.map((item, index) => (
                <tr 
                  key={item.id} 
                  className="bg-[#FBFBFB]"
                  style={{ 
                    borderBottom: index < autocuidadoData.length - 1 ? '1px solid #A4A4A4' : 'none'
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                        className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
                      />
                      <span className="text-sm font-normal text-gray-900 flex-1 text-center">{item.usuarioTikTok}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {item.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`text-sm font-medium ${getLimiteColor(item.limite)}`}>
                      {item.limite}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#FFD900] flex items-center justify-center">
                        <WCIcon />
                      </div>
                      <span className="text-sm font-normal text-gray-900">{item.cantidad}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#FFD900] flex items-center justify-center">
                        <WCIcon />
                      </div>
                      <span className="text-sm font-normal text-gray-900">{item.wcUsadas}</span>
                    </div>
                  </td>
                                           <td className="px-6 py-4 whitespace-nowrap text-center">
                           <span className={`px-3 py-1 rounded-full text-xs font-medium w-20 inline-flex items-center justify-center ${getAlertaColor(item.alerta)}`}>
                             {item.alerta}
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
                          onClick={() => handleDeleteAlerta(item)}
                        >
                          <TachoIcon />
                          Eliminar alerta
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

      {/* Modal de Eliminar Autocuidado */}
      {alertaSeleccionada && (
        <EliminarAutocuidadoModal
          isOpen={isEliminarModalOpen}
          onClose={() => setIsEliminarModalOpen(false)}
          autocuidado={alertaSeleccionada}
          onConfirm={handleConfirmarEliminar}
        />
      )}
    </div>
  )
}
