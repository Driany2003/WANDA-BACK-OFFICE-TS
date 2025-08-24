"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { MoreVertical, RefreshCw, ChevronDown, Edit, Trash2 } from "lucide-react"
import { TachoIcon } from "@/components/icons/transaction-icons"
import { WcIcon } from "@/components/icons/transaction-icons"
import { NotificationToast } from "@/components/ui/notification-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TemporaryIncome {
  id: string
  usuarioTiktok: string
  nombre: string
  fecha: string
  celular: string
  cantidadWC: number
  estado: "pendiente" | "aprobado"
}

interface TemporalesProps {
  onOpenAddModal: () => void
  onEditIncome: (income: any) => void
  incomeSaved?: { mode: "add" | "edit" } | null
}

// Datos de ejemplo para la tabla
const TEMPORARY_INCOME_DATA: TemporaryIncome[] = [
  {
    id: "1",
    usuarioTiktok: "@ChuRo",
    nombre: "Chuy Román",
    fecha: "25/09/2024",
    celular: "987 000 000",
    cantidadWC: 20,
    estado: "pendiente"
  },
  {
    id: "2",
    usuarioTiktok: "@Luis22",
    nombre: "Luis Daza",
    fecha: "25/09/2024",
    celular: "934 000 000",
    cantidadWC: 10,
    estado: "aprobado"
  }
]

export function Temporales({ onOpenAddModal, onEditIncome, incomeSaved }: TemporalesProps) {
  const [data] = useState(TEMPORARY_INCOME_DATA)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: "", message: "" })

  // Detectar cuando se guarde un ingreso y mostrar el toast
  useEffect(() => {
    if (incomeSaved) {
      showSuccessToast(incomeSaved.mode)
      // El toast se ocultará automáticamente después de 5 segundos
      setTimeout(() => {
        setShowToast(false)
      }, 5000)
    }
  }, [incomeSaved])

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

  const showSuccessToast = (mode: "add" | "edit") => {
    setToastMessage({
      title: mode === "add" ? "Ingreso registrado" : "Ingreso actualizado",
      message: mode === "add" ? "El ingreso se ha registrado exitosamente" : "El ingreso se ha actualizado exitosamente"
    })
    setShowToast(true)
  }

  const getStatusButton = (estado: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer"
    
    switch (estado) {
      case "pendiente":
        return (
          <div className={`${baseClasses} bg-[#FBFBFB] text-[#6137E5] border border-[#6137E5] hover:bg-[#FBFBFB] hover:text-[#6137E5] hover:border-[#6137E5]`}>
            Pendiente
            <ChevronDown className="w-3 h-3" />
          </div>
        )
      case "aprobado":
        return (
          <div className={`${baseClasses} bg-[#6137E5] text-[#FBFBFB] border border-[#6137E5] hover:bg-[#6137E5] hover:text-[#FBFBFB] hover:border-[#6137E5]`}>
            Aprobado
            <ChevronDown className="w-3 h-3" />
          </div>
        )
      default:
        return null
    }
  }

  const handleEdit = (income: any) => {
    // Convertir el formato de fecha de DD/MM/YYYY a YYYY-MM-DD para el modal
    const formattedIncome = {
      ...income,
      fecha: convertDateFormat(income.fecha)
    }
    onEditIncome(formattedIncome)
  }

  // Función para convertir fecha de DD/MM/YYYY a YYYY-MM-DD
  const convertDateFormat = (dateString: string) => {
    if (!dateString) return ""
    
    const parts = dateString.split('/')
    if (parts.length === 3) {
      const day = parts[0]
      const month = parts[1]
      const year = parts[2]
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
    return dateString
  }

  const handleDelete = (id: string) => {
    console.log("Eliminando ingreso:", id)
    // Aquí iría la lógica para eliminar
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
            onClick={() => {
              console.log("Eliminando elementos seleccionados:", selectedItems)
              // Aquí iría la lógica para eliminar múltiples elementos
            }}
          >
            <TachoIcon/>
          </Button>
        )}
      </div>

      {/* Tabla completa de ingresos temporales */}
      <div className="overflow-hidden rounded-t-xl" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-[#FEFEFE] border-b border-gray-200" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <tr>
                <th className="w-1/7 px-6 py-3 text-center text-base font-medium text-[#1C1C1C] tracking-wider whitespace-nowrap">
                  Usuario Tiktok
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-base font-medium text-[#1C1C1C] tracking-wider whitespace-nowrap">
                  Nombre
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-base font-medium text-[#1C1C1C] tracking-wider whitespace-nowrap">
                  Fecha
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-base font-medium text-[#1C1C1C] tracking-wider whitespace-nowrap">
                  Celular
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-base font-medium text-[#1C1C1C] tracking-wider whitespace-nowrap">
                  Cantidad Wc
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-base font-medium text-[#1C1C1C] tracking-wider whitespace-nowrap">
                  Estado
                </th>
                <th className="w-1/7 px-6 py-3 text-center text-base font-medium text-[#1C1C1C] tracking-wider whitespace-nowrap">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                    {income.celular}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center items-center gap-2">
                      <WcIcon />
                      <span className="text-sm font-normal text-gray-900">{income.cantidadWC}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center">
                      {getStatusButton(income.estado)}
                    </div>
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
                      <DropdownMenuContent className="w-40">
                        <DropdownMenuItem 
                          onClick={() => handleEdit(income)}
                          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                        >
                          <Edit className="w-4 h-4 text-gray-500" />
                          Editar ingreso
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(income.id)}
                          className="flex items-center gap-2 text-gray-700 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 text-gray-500" />
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

      {/* Toast notification */}
      {showToast && (
        <NotificationToast
          type="success"
          title={toastMessage.title}
          message={toastMessage.message}
          onClose={() => setShowToast(false)}
          isVisible={showToast}
        />
      )}
    </div>
  )
}
