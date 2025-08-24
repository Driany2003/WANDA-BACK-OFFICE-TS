"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, MoreVertical, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { WcIcon, DetalleSuscriptorIcon, TachoIcon } from "@/components/icons/transaction-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DetalleSuscriptor } from "./detalle-suscriptor"

const WITHDRAWAL_DATA = [
  {
    id: "1",
    nombre: "Jesús López",
    fecha: "25/09/2024",
    solicitud: 20,
    wcDisponibles: 25,
    estado: "En proceso"
  },
  {
    id: "2",
    nombre: "Mario Soto",
    fecha: "25/09/2024",
    solicitud: 30,
    wcDisponibles: 50,
    estado: "Aprobado"
  },
  {
    id: "3",
    nombre: "Ana García",
    fecha: "24/09/2024",
    solicitud: 15,
    wcDisponibles: 35,
    estado: "Aprobado"
  },
  {
    id: "4",
    nombre: "Carlos Ruiz",
    fecha: "23/09/2024",
    solicitud: 25,
    wcDisponibles: 40,
    estado: "Aprobado"
  }
]

interface AprobadasSalidasProps {
  onViewDetail: (subscriber: any) => void
}

export function AprobadasSalidas({ onViewDetail }: AprobadasSalidasProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)

  // Filtrar solo los registros aprobados
  const approvedData = WITHDRAWAL_DATA.filter(item => item.estado === "Aprobado")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(approvedData.map(item => item.id))
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
    console.log("Refrescando...")
  }

  const handleDeleteSelected = () => {
    console.log("Eliminando elementos seleccionados:", selectedItems)
  }

  const handleViewSubscriberDetail = (subscriber: any) => {
    onViewDetail(subscriber)
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
          <RotateCcw className="w-5 h-5" />
        </Button>
        {selectedItems.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeleteSelected}
          >
            <TachoIcon />
          </Button>
          )}
      </div>

      {/* Tabla */}
      <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="border-b border-gray-200" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <tr>
                <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Nombre
                </th>
                <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Fecha
                </th>
                <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  Solicitud
                </th>
                <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                  WC disponibles
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
              {approvedData.map((item, index) => (
                <tr 
                  key={item.id} 
                  className="bg-[#FBFBFB]"
                  style={{ 
                    borderBottom: index < approvedData.length - 1 ? '1px solid #A4A4A4' : 'none'
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
                    {item.fecha}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2">
                      <WcIcon />
                      <span className="text-sm font-normal text-gray-900">{item.solicitud}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2">
                      <WcIcon />
                      <span className="text-sm font-normal text-gray-900">{item.wcDisponibles}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="h-8 px-3 rounded-full border-0 bg-[#6137E5] text-white hover:bg-[#6137E5] hover:text-white"
                        >
                          {item.estado}
                          <ChevronDown className="w-4 h-4 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-auto min-w-[120px] rounded-full border-0 shadow-lg bg-white">
                        <DropdownMenuItem className="rounded-full text-[#6137E5] hover:bg-white hover:text-[#6137E5]">En proceso</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-auto min-w-[200px] rounded-lg border-0 shadow-lg bg-white">
                        <DropdownMenuItem className="rounded-lg bg-white hover:bg-white p-0">
                          <div className="flex items-center gap-3 px-3 py-2 w-full">
                            <DetalleSuscriptorIcon />
                            <span className="text-gray-600 text-sm">Ver detalle suscriptor</span>
                          </div>
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
