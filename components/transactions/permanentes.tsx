"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { TachoIcon, LapizIcon, WcIcon } from "@/components/icons/transaction-icons"
import { EliminarIngresoPermanenteModal } from "@/components/modals/transactions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PermanentIncome {
  id: string
  usuarioTiktok: string
  nombre: string
  fecha: string
  recarga: number
}


// Datos de ejemplo para la tabla
const PERMANENT_INCOME_DATA: PermanentIncome[] = [
  {
    id: "1",
    usuarioTiktok: "@Jesús21",
    nombre: "Jesús López",
    fecha: "25/09/2024",
    recarga: 20
  },
  {
    id: "2",
    usuarioTiktok: "@Jose2509",
    nombre: "José Sanchéz",
    fecha: "24/09/2024",
    recarga: 10
  }
]

export function Permanentes() {
  const [data] = useState(PERMANENT_INCOME_DATA)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [ingresoSeleccionado, setIngresoSeleccionado] = useState<any>(null)

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    if (checked) {
      setSelectedItems(data.map(item => item.id))
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


  const handleDelete = (ingreso: any) => {
    setIngresoSeleccionado(ingreso)
    setIsEliminarModalOpen(true)
  }

  const handleConfirmarEliminar = (id: string) => {
    console.log("Eliminando ingreso:", id)
    // Aquí iría la lógica para eliminar
    setIsEliminarModalOpen(false)
    setIngresoSeleccionado(null)
  }

  return (
    <div className="space-y-6">
      {/* Checkbox y refresh arriba de la tabla */}
      <div className="flex items-center gap-4 pl-6">
        <Checkbox
          checked={selectAll}
          onCheckedChange={handleSelectAll}
          className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
        />
        <Button
          variant="ghost"
          size="sm"
          className="text-[#1C1C1C] hover:text-[#6137E5]"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
        {selectedItems.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log("Eliminando:", selectedItems)}
          >
            <TachoIcon />
          </Button>
        )}
      </div>

      {/* Tabla completa de ingresos permanentes */}
      <div className="overflow-hidden rounded-t-xl" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-[#FEFEFE] border-b border-gray-200" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <tr>
                <th className="w-1/5 px-6 py-3 text-center text-base font-medium text-[#1C1C1C] tracking-wider">
                  Usuario Tiktok
                </th>
                <th className="w-1/5 px-6 py-3 text-center text-base font-medium text-[#1C1C1C] tracking-wider">
                  Nombre
                </th>
                <th className="w-1/5 px-6 py-3 text-center text-base font-medium text-[#1C1C1C] tracking-wider">
                  Fecha
                </th>
                <th className="w-1/5 px-6 py-3 text-center text-base font-medium text-[#1C1C1C] tracking-wider">
                  Recarga
                </th>
                <th className="w-1/5 px-6 py-3 text-center text-base font-medium text-[#1C1C1C] tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#FBFBFB]">
              {data.map((income, index) => (
                <tr 
                  key={income.id} 
                  className="bg-[#FBFBFB]"
                  style={{ 
                    borderBottom: index < data.length - 1 ? '1px solid #A4A4A4' : 'none'
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-between">
                      <Checkbox
                        checked={selectedItems.includes(income.id)}
                        onCheckedChange={(checked) => handleSelectItem(income.id, checked as boolean)}
                        className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
                      />
                      <span className="text-sm font-normal text-gray-900 flex-1 text-center">
                        {income.usuarioTiktok}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {income.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {income.fecha}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center items-center gap-2">
                      <WcIcon />
                      <span className="text-sm font-normal text-gray-900">{income.recarga}</span>
                    </div>
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
                          onClick={() => handleDelete(income)}
                          className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium"
                        >
                          <TachoIcon />
                          Eliminar ingreso
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

      {/* Modal de eliminar ingreso permanente */}
      {ingresoSeleccionado && (
        <EliminarIngresoPermanenteModal
          isOpen={isEliminarModalOpen}
          onClose={() => {
            setIsEliminarModalOpen(false)
            setIngresoSeleccionado(null)
          }}
          ingreso={ingresoSeleccionado}
          onConfirm={handleConfirmarEliminar}
        />
      )}
    </div>
  )
}
