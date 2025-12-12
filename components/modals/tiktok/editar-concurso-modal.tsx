"use client"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { FechasIcon, HoraIcon } from "@/components/icons/configuraciones-icons"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { anfitrionApi, AnfitrionDTO } from "@/lib/api"

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
  const [anfitriones, setAnfitriones] = useState<AnfitrionDTO[]>([])
  const [loadingAnfitriones, setLoadingAnfitriones] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const isLoadingRef = useRef(false)
  
  const [formData, setFormData] = useState({
    nombre: "",
    fecha: null as Date | null,
    usuaId: 0,
    nombreAnfitrion: "",
    hora: ""
  })

  // Cargar anfitriones cuando se abra el modal
  useEffect(() => {
    if (!isOpen || !concursoData) {
      isLoadingRef.current = false
      return
    }

    // Evitar llamadas duplicadas
    if (isLoadingRef.current) {
      return
    }

    isLoadingRef.current = true
    const fetchData = async () => {
      try {
        setIsLoadingData(true)
        setLoadingAnfitriones(true)
        
        // Cargar anfitriones
        const data = await anfitrionApi.getActiveAnfitriones()
        setAnfitriones(data)
        
        // Buscar el anfitrión por nombre para obtener el ID
        const anfitrionEncontrado = data.find(a => a.nombre === concursoData.anfitrion)
        
        // Preparar datos del formulario
        // Parsear fecha sin problemas de zona horaria
        let fechaParsed: Date | null = null
        if (concursoData.fecha) {
          // Si viene en formato "yyyy-mm-dd" o "yyyy-mm-dd hh:mm:ss"
          const dateOnly = concursoData.fecha.split(' ')[0].split('T')[0]
          if (dateOnly.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [year, month, day] = dateOnly.split('-')
            // Crear fecha en hora local para evitar problemas de zona horaria
            fechaParsed = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
          } else {
            // Si viene en formato "dd/mm/yyyy"
            fechaParsed = new Date(concursoData.fecha.split('/').reverse().join('-') + 'T00:00:00')
          }
        }
        
        setFormData({
          nombre: concursoData.nombre,
          fecha: fechaParsed,
          usuaId: anfitrionEncontrado ? anfitrionEncontrado.id : 0,
          nombreAnfitrion: concursoData.anfitrion,
          hora: concursoData.horario || ''
        })
      } catch (error) {
        // Error loading data
      } finally {
        setLoadingAnfitriones(false)
        setIsLoadingData(false)
        isLoadingRef.current = false
      }
    }
    
    fetchData()
  }, [isOpen, concursoData?.id])

  if (!isOpen) return null

  // No mostrar el modal hasta que todos los datos estén cargados
  if (isLoadingData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
        <div className="bg-white rounded-xl w-[95vw] max-w-[684px] h-[95vh] max-h-[500px] mx-2 sm:mx-4 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-[#6137E5] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Cargando datos...</p>
          </div>
        </div>
      </div>
    )
  }

  const handleAnfitrionChange = (usuaId: string) => {
    const anfitrion = anfitriones.find(a => a.id === parseInt(usuaId, 10))
    setFormData(prev => ({
      ...prev,
      usuaId: parseInt(usuaId, 10),
      nombreAnfitrion: anfitrion ? anfitrion.nombre : ""
    }))
  }

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
                    <Select 
                      value={formData.usuaId > 0 ? formData.usuaId.toString() : ""} 
                      onValueChange={handleAnfitrionChange}
                      disabled={loadingAnfitriones}
                    >
                      <SelectTrigger className="w-full sm:w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_20px_rgba(219,8,110,0.08)] border-none">
                        <SelectValue placeholder={loadingAnfitriones ? "Cargando..." : "Selecciona un anfitrión"}>
                          {formData.nombreAnfitrion || (loadingAnfitriones ? "Cargando..." : "Selecciona un anfitrión")}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="!z-[10001]">
                        {anfitriones.map((anfitrion) => (
                          <SelectItem key={anfitrion.id} value={anfitrion.id.toString()}>
                            {anfitrion.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      <PopoverContent className="w-auto p-0 z-[10000]">
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
                  type="submit"
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
