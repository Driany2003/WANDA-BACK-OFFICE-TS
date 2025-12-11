"use client"

import { useState, useEffect } from "react"
import { X, Upload } from "lucide-react"
import { FechasIcon, HoraIcon, AlertIcon } from "@/components/icons/configuraciones-icons"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { NovedadesCreateDTO, novedadesAPI, NovedadesResponse } from "@/lib/api"
import { toast } from "sonner"

// Constants
const INITIAL_FORM_DATA = {
  noveTitulo: "",
  noveDescripcion: "",
  noveFechaInicio: null as Date | null,
  noveFechaFin: null as Date | null,
  noveHoraInicio: "",
  noveHoraFin: "",
  noveImagen: null as File | null,
  noveIsActive: true
}

const VALIDATION_RULES = {
  TITULO_MAX_LENGTH: 255,
  DESCRIPCION_MAX_LENGTH: 1000,
  FILE_INPUT_ID: "file-input-novedad"
} as const

const INPUT_STYLES = {
  boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)'
} as const

const HEADER_STYLES = {
  boxShadow: '0 4px 10px rgba(219, 8, 110, 0.08)'
} as const

const ERROR_MESSAGES = {
  TITULO_REQUIRED: "El título es obligatorio",
  DESCRIPCION_REQUIRED: "La descripción es obligatoria",
  FECHA_INICIO_REQUIRED: "La fecha de inicio es obligatoria",
  FECHA_FIN_REQUIRED: "La fecha de fin es obligatoria",
  FECHA_FIN_INVALID: "La fecha de fin no puede ser anterior a la fecha de inicio",
  IMAGEN_REQUIRED: "La imagen es obligatoria",
  CREATE_ERROR: "Error al crear la novedad. Por favor, intenta nuevamente.",
  CREATE_SUCCESS: "Novedad creada exitosamente"
} as const

interface AgregarNovedadModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: NovedadesResponse) => void
}

// Helper functions
const getCurrentDateTime = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return {
    date: now,
    time: `${hours}:${minutes}`
  }
}

const formatDate = (date: Date | null): string => {
  if (!date) return 'Seleccionar fecha'
  return format(date, "dd/MM/yyyy", { locale: es })
}

const renameImageFile = (file: File): File => {
  const extension = file.name.split('.').pop() || 'png'
  const timestamp = Date.now()
  const newFileName = `png${timestamp}.${extension}`
  return new File([file], newFileName, { type: file.type })
}

export function AgregarNovedadModal({ isOpen, onClose, onSave }: AgregarNovedadModalProps) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      const currentDateTime = getCurrentDateTime()
      setFormData(prev => ({
        ...prev,
        noveFechaInicio: currentDateTime.date,
        noveHoraInicio: currentDateTime.time
      }))
    } else {
      setFormData(INITIAL_FORM_DATA)
    }
  }, [isOpen])

  if (!isOpen) return null

  // Handlers
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      }
      
      // Reset fecha fin if it becomes invalid when fecha inicio changes
      if (field === "noveFechaInicio" && value && prev.noveFechaFin && value > prev.noveFechaFin) {
        newData.noveFechaFin = null
      }
      
      return newData
    })
  }

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA)
  }

  const validateForm = (): boolean => {
    if (!formData.noveTitulo.trim()) {
      toast.error(ERROR_MESSAGES.TITULO_REQUIRED)
      return false
    }
    if (!formData.noveDescripcion.trim()) {
      toast.error(ERROR_MESSAGES.DESCRIPCION_REQUIRED)
      return false
    }
    if (!formData.noveFechaInicio) {
      toast.error(ERROR_MESSAGES.FECHA_INICIO_REQUIRED)
      return false
    }
    if (!formData.noveFechaFin) {
      toast.error(ERROR_MESSAGES.FECHA_FIN_REQUIRED)
      return false
    }
    if (formData.noveFechaFin < formData.noveFechaInicio) {
      toast.error(ERROR_MESSAGES.FECHA_FIN_INVALID)
      return false
    }
    if (!formData.noveImagen) {
      toast.error(ERROR_MESSAGES.IMAGEN_REQUIRED)
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const novedadData: NovedadesCreateDTO = {
        noveTitulo: formData.noveTitulo.trim(),
        noveDescripcion: formData.noveDescripcion.trim(),
        noveFechaInicio: formData.noveFechaInicio!,
        noveFechaFin: formData.noveFechaFin!,
        noveHoraInicio: formData.noveHoraInicio || undefined,
        noveHoraFin: formData.noveHoraFin || undefined,
        noveImagen: formData.noveImagen!,
        noveIsActive: formData.noveIsActive
      }
      
      const response = await novedadesAPI.createFromDTO(novedadData)
      
      if (response.noveId) {
        toast.success(ERROR_MESSAGES.CREATE_SUCCESS)
        // Notificar al componente padre para que recargue las listas
        onSave(response)
        // Cerrar el modal después de notificar
        onClose()
      } else {
        toast.error(response.mensaje || ERROR_MESSAGES.CREATE_ERROR)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error creating novedad:", error)
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.CREATE_ERROR
      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const renamedFile = renameImageFile(file)
      handleInputChange("noveImagen", renamedFile)
    }
  }

  const isDateDisabled = (date: Date): boolean => {
    return formData.noveFechaInicio ? date < formData.noveFechaInicio : false
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-xl w-[95vw] max-w-[684px] h-[95vh] max-h-[800px] mx-2 sm:mx-4 flex flex-col overflow-hidden">
        {/* Header */}
        <div 
          className="flex justify-between items-start px-4 sm:px-[30px] pt-4 sm:pt-[30px] pb-4 sm:pb-6 flex-shrink-0 bg-[#FEFEFE]"
          style={HEADER_STYLES}
        >

          <div className="flex-1">
            <h2 className="text-lg sm:text-[24px] font-medium text-[#1C1C1C] mb-2">Agregar novedades</h2>
            <div className="text-[10px] sm:text-[12px] text-gray-600 mt-2 sm:mt-4">
              <span className="text-[#9C82EF]">Configuraciones</span> &gt;{" "}
              <span className="text-[#9C82EF]">Novedades</span> &gt;{" "}
              <span 
                className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                Agregar novedades
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
        <div className="flex-1 overflow-y-auto px-4 sm:px-[30px] py-4 sm:py-3 flex items-center justify-center">
          <div className="w-full max-w-[484px]">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Datos de la novedad */}
              <div className="space-y-4">
                <h3 className="text-base font-medium text-gray-800 mb-4">Datos de la novedad</h3>
                
                {/* Título */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Título</label>
                  <Input
                    type="text"
                    value={formData.noveTitulo}
                    onChange={(e) => handleInputChange("noveTitulo", e.target.value)}
                    placeholder="Ingresa un título"
                    className="w-full sm:w-[484px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={INPUT_STYLES}
                    maxLength={VALIDATION_RULES.TITULO_MAX_LENGTH}
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Descripción</label>
                  <Textarea
                    value={formData.noveDescripcion}
                    onChange={(e) => handleInputChange("noveDescripcion", e.target.value)}
                    placeholder="Describe una novedad"
                    className="w-full sm:w-[484px] h-[95px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm resize-none"
                    style={INPUT_STYLES}
                    maxLength={VALIDATION_RULES.DESCRIPCION_MAX_LENGTH}
                  />
                </div>

                {/* Fechas y horas */}
                <div className="space-y-2">
                  {/* Fechas */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-700 mb-2">Fecha de inicio</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full sm:w-[230px] h-[40px] justify-between text-left font-normal"
                            style={INPUT_STYLES}
                          >
                            {formatDate(formData.noveFechaInicio)}
                            <FechasIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 z-[10000]">
                          <CalendarComponent
                            mode="single"
                            selected={formData.noveFechaInicio || undefined}
                            onSelect={(date) => date && handleInputChange("noveFechaInicio", date)}
                            initialFocus
                            locale={es}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-700 mb-2">Fecha de fin</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full sm:w-[230px] h-[40px] justify-between text-left font-normal"
                            style={INPUT_STYLES}
                          >
                            {formatDate(formData.noveFechaFin)}
                            <FechasIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 z-[10000]">
                          <CalendarComponent
                            mode="single"
                            selected={formData.noveFechaFin || undefined}
                            onSelect={(date) => date && handleInputChange("noveFechaFin", date)}
                            initialFocus
                            locale={es}
                            disabled={isDateDisabled}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Horas */}
                  <div className="flex gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Hora de inicio</label>
                      <div className="relative">
                        <Input
                          type="time"
                          value={formData.noveHoraInicio}
                          onChange={(e) => handleInputChange("noveHoraInicio", e.target.value)}
                          className="w-[230px] h-[40px] pr-8"
                          style={INPUT_STYLES}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <HoraIcon />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Hora de fin</label>
                      <div className="relative">
                        <Input
                          type="time"
                          value={formData.noveHoraFin}
                          onChange={(e) => handleInputChange("noveHoraFin", e.target.value)}
                          className="w-[230px] h-[40px] pr-8"
                          style={INPUT_STYLES}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <HoraIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Imagen */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Imagen</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id={VALIDATION_RULES.FILE_INPUT_ID}
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById(VALIDATION_RULES.FILE_INPUT_ID)?.click()}
                      className="w-[484px] h-[40px] bg-white border border-gray-300 rounded-md text-left px-3 text-[#BBBBBB] font-semibold text-sm hover:border-gray-400 transition-colors cursor-pointer flex items-center justify-between"
                      style={INPUT_STYLES}
                    >
                      <span className="text-[14px] font-semibold">Selecciona una imagen</span>
                      <Upload className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  {/* Imagen seleccionada */}
                  {formData.noveImagen && (
                    <div className="mt-2">
                      <div className="bg-[#6137E5] text-white flex items-center gap-2 w-fit px-3 py-1 rounded-full">
                        <span className="text-[14px] font-medium">{formData.noveImagen.name}</span>
                        <button
                          type="button"
                          onClick={() => handleInputChange("noveImagen", null)}
                          className="text-white hover:text-gray-200 transition-colors text-[16px]"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                  {/* Texto de validación */}
                  <div className="flex items-center gap-2 mt-2 text-orange-600 text-xs">
                    <AlertIcon />
                    <span>Puedes cargar un máximo de cuatro (4) imágenes / JPG, PNG / Máx 20 MB</span>
                  </div>
                </div>

                {/* Estado */}
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-gray-800">Estado</h3>
                  <div className="flex items-center space-x-3">
                    <Switch
                      checked={formData.noveIsActive}
                      onCheckedChange={(checked) => handleInputChange("noveIsActive", checked)}
                      className="data-[state=checked]:bg-[#890277]"
                    />
                    <span className="text-sm text-gray-700">
                      {formData.noveIsActive ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-[30px] justify-center pt-6">
                  <GradientOutlineButton
                    onClick={onClose}
                    className="w-[138px] h-[40px] text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Cancelar
                  </GradientOutlineButton>
                  <GradientButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-[138px] h-[40px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Guardando..." : "Guardar"}
                  </GradientButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
