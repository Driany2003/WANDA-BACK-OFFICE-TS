"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { FechasIcon, HoraIcon } from "@/components/icons/configuraciones-icons"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { Input } from "@/components/ui/input"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface EditarConcursoModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  concursoData?: {
    id: string
    nombre: string
    fecha: string
    anfitrion: string
    horario: string
  }
}

export function EditarConcursoModal({ isOpen, onClose, onSave, concursoData }: EditarConcursoModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    fecha: null as Date | null,
    anfitrion: "",
    hora: ""
  })

  useEffect(() => {
    if (concursoData && isOpen) {
      setFormData({
        nombre: concursoData.nombre,
        fecha: concursoData.fecha ? new Date(concursoData.fecha.split('/').reverse().join('-')) : null,
        anfitrion: concursoData.anfitrion,
        hora: concursoData.horario
      })
    }
  }, [concursoData, isOpen])

  if (!isOpen) return null

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      id: concursoData?.id
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-xl w-[95vw] max-w-[684px] h-[95vh] max-h-[500px] mx-2 sm:mx-4 flex flex-col overflow-hidden">
        {/* Header */}
        <div 
          className="flex justify-between items-start px-4 sm:px-[30px] pt-4 sm:pt-[30px] pb-4 sm:pb-6 flex-shrink-0 bg-[#FEFEFE]"
          style={{ 
            boxShadow: '0 4px 10px rgba(219, 8, 110, 0.08)'
          }}
        >
          <div className="flex-1">
            <h2 className="text-lg sm:text-[24px] font-medium text-[#1C1C1C] mb-2">Editar concurso</h2>
            <div className="text-[10px] sm:text-[12px] text-gray-600 mt-2 sm:mt-4">
              <span className="text-[#9C82EF]">TikTok</span> &gt;{" "}
              <span 
                className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                Editar concurso
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-[30px] py-4 sm:py-3">
          <div className="w-full max-w-[484px] mx-auto">
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
              {/* Datos del concurso */}
              <div className="space-y-6 flex-1 mb-12 mt-4">
                <h3 className="text-base font-medium text-gray-800 mb-8">Datos del concurso</h3>
                
                {/* Nombre del concurso y Nombre de anfitrión(a) */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-2">Nombre del concurso</label>
                    <Input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      placeholder="Ingresa un nombre"
                      className="w-full sm:w-[230px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                      style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-2">Nombre de anfitrión(a)</label>
                    <Input
                      type="text"
                      value={formData.anfitrion}
                      onChange={(e) => handleInputChange("anfitrion", e.target.value)}
                      placeholder="Ingresa un nombre"
                      className="w-full sm:w-[230px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                      style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                    />
                  </div>
                </div>

                {/* Fecha y Hora */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-2">Fecha</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full sm:w-[230px] h-[40px] justify-between text-left font-normal"
                          style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                        >
                          {formData.fecha ? format(formData.fecha, "dd/MM/yyyy", { locale: es }) : 'Seleccionar fecha'}
                          <FechasIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={formData.fecha || undefined}
                          onSelect={(date) => date && handleInputChange("fecha", date)}
                          initialFocus
                          locale={es}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-2">Hora</label>
                    <div className="relative">
                      <Input
                        type="time"
                        value={formData.hora}
                        onChange={(e) => handleInputChange("hora", e.target.value)}
                        placeholder="10:00 pm"
                        className="w-full sm:w-[230px] h-[40px] pr-8 placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                        style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <HoraIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-[30px] justify-center pt-8 pb-4">
                <GradientOutlineButton
                  onClick={onClose}
                  className="w-[138px] h-[40px] text-red-600 border-red-300 hover:bg-red-50"
                >
                  Cancelar
                </GradientOutlineButton>
                <GradientButton
                  type="button"
                  onClick={() => handleSubmit({} as React.FormEvent)}
                  className="w-[138px] h-[40px]"
                >
                  Guardar
                </GradientButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
