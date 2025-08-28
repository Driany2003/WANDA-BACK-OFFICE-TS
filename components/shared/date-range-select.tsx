"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangeModal } from "./date-range-modal"
import type { DateRangeSelectProps } from "@/types"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function DateRangeSelect({ onSelectChange, selectedValue }: DateRangeSelectProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDates, setSelectedDates] = useState<{ startDate?: Date; endDate?: Date }>({})

  const handleValueChange = (value: string) => {
    if (value === "una-fecha-especifica") {
      setIsModalOpen(true)
    } else {
      setSelectedDates({})
      onSelectChange(value)
    }
  }

  const handleSelectDates = (startDate: Date, endDate: Date) => {
    setSelectedDates({ startDate, endDate })
    onSelectChange("una-fecha-especifica")
    setIsModalOpen(false)
  }

  const getDisplayValue = () => {
    if (selectedDates.startDate && selectedDates.endDate) {
      const startFormatted = format(selectedDates.startDate, "dd/MM/yyyy", { locale: es })
      const endFormatted = format(selectedDates.endDate, "dd/MM/yyyy", { locale: es })
      return `${startFormatted} - ${endFormatted}`
    }
    
    // Mapear valores predefinidos a texto en español
    switch (selectedValue) {
      case "hoy":
        return "Hoy"
      case "la-semana-pasada":
        return "La semana pasada"
      case "el-mes-pasado":
        return "El mes pasado"
      case "una-fecha-especifica":
        return "Una fecha específica"
      default:
        return "Selecciona una opción"
    }
  }

  return (
    <>
      <Select onValueChange={handleValueChange} value={selectedDates.startDate && selectedDates.endDate ? "una-fecha-especifica" : selectedValue}>
        <SelectTrigger className="w-full h-full gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" style={{
          boxShadow: '0 2px 8px rgba(219, 8, 110, 0.15)'
        }}>
          <SelectValue placeholder="Selecciona una opción">
            {getDisplayValue()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hoy">Hoy</SelectItem>
          <SelectItem value="la-semana-pasada">La semana pasada</SelectItem>
          <SelectItem value="el-mes-pasado">El mes pasado</SelectItem>
          <SelectItem value="una-fecha-especifica">Una fecha específica</SelectItem>
        </SelectContent>
      </Select>

      <DateRangeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelectDates={handleSelectDates} />
    </>
  )
}
