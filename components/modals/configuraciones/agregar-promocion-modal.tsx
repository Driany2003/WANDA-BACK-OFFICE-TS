"use client"

import { useState } from "react"
import { X, Upload } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { FechasIcon, HoraIcon } from "@/components/icons/configuraciones-icons"
import { promocionAPI } from "@/lib/api"
import { toast } from "sonner"

interface AgregarPromocionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
}

interface FormData {
  nombre: string
  monto: string
  descripcion: string
  fechaInicio: Date
  fechaFin: Date
  horaInicio: string
  horaFin: string
  imagen: File | null
  terminos: string
  estado: boolean
}

const INITIAL_FORM_DATA: FormData = {
  nombre: "",
  monto: "",
  descripcion: "",
  fechaInicio: new Date(),
  fechaFin: new Date(),
  horaInicio: "11:00",
  horaFin: "11:00",
  imagen: null,
  terminos: "",
  estado: true
}

const ALLOWED_KEYS = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
const INPUT_STYLES = { boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }
const HEADER_STYLES = { boxShadow: '0 4px 10px rgba(219, 8, 110, 0.08)' }

export function AgregarPromocionModal({ isOpen, onClose, onSave }: AgregarPromocionModalProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  // Helpers
  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const getTodayDate = (): Date => {
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    return hoy
  }

  const normalizeDate = (date: Date): Date => {
    const normalized = new Date(date)
    normalized.setHours(0, 0, 0, 0)
    return normalized
  }

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA)
  }

  // Handlers
  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '')
    const parts = value.split('.')
    const formattedValue = parts.length > 1 
      ? parts[0] + '.' + parts.slice(1).join('').substring(0, 2)
      : parts[0]
    
    if (formattedValue === '' || parseFloat(formattedValue) >= 0) {
      handleInputChange("monto", formattedValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isNumber = /[0-9]/.test(e.key)
    const isDecimal = e.key === '.' && !formData.monto.includes('.')
    const isAllowedKey = ALLOWED_KEYS.includes(e.key)
    const isCtrlKey = e.ctrlKey && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())
    
    if (!isNumber && !isDecimal && !isAllowedKey && !isCtrlKey) {
      e.preventDefault()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleInputChange("imagen", file)
    }
  }

  // Validations
  const validateForm = (): boolean => {
    if (!formData.nombre.trim()) {
      toast.error("El nombre de la promoción es obligatorio")
      return false
    }
    
    if (!formData.monto || parseFloat(formData.monto) <= 0) {
      toast.error("El monto debe ser mayor a 0")
      return false
    }
    
    const hoy = getTodayDate()
    const fechaInicio = normalizeDate(formData.fechaInicio)
    const fechaFin = normalizeDate(formData.fechaFin)
    
    if (fechaInicio < hoy) {
      toast.error("La fecha de inicio no puede ser menor a la fecha actual")
      return false
    }
    
    if (fechaFin < fechaInicio) {
      toast.error("La fecha de fin no puede ser menor a la fecha de inicio")
      return false
    }
    
    if (!formData.imagen) {
      toast.error("Debes seleccionar una imagen")
      return false
    }
    
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const promocionData = {
        promNombre: formData.nombre,
        promMonto: parseFloat(formData.monto),
        promDescripcion: formData.descripcion || undefined,
        promFechaInicio: formatDate(formData.fechaInicio),
        promFechaFin: formatDate(formData.fechaFin),
        promHoraInicio: formData.horaInicio || undefined,
        promHoraFin: formData.horaFin || undefined,
        promImagen: formData.imagen!, // Validado en validateForm
        promTerminoCondiciones: formData.terminos || undefined,
        promIsActive: formData.estado
      }
      
      const response = await promocionAPI.create(promocionData)
      
      if (response.promId) {
        toast.success("Promoción creada exitosamente")
        onSave(response)
        onClose()
        resetForm()
      } else {
        toast.error("Error al crear la promoción")
      }
    } catch (error) {
      console.error("Error creating promoción:", error)
      toast.error("Error al crear la promoción. Por favor, intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDateDisabled = (date: Date, isFechaFin: boolean = false): boolean => {
    const hoy = getTodayDate()
    if (date < hoy) return true
    if (isFechaFin) {
      const fechaInicio = normalizeDate(formData.fechaInicio)
      return date < fechaInicio
    }
    return false
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#FBFBFB] rounded-xl w-[95vw] max-w-[684px] h-[93vh] max-h-[1000px] mx-4 flex flex-col overflow-hidden">
        {/* Header */}
        <div 
          className="flex justify-between items-start px-[30px] pt-[30px] pb-6 flex-shrink-0 bg-{#FEFEFE}"
          style={HEADER_STYLES}
        >
          <div className="flex-1">
            <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Agregar promoción</h2>
            <div className="text-[12px] text-gray-600 mt-4">
              <span className="text-[#9C82EF]">Configuraciones</span> &gt;{" "}
              <span className="text-[#9C82EF]">Promociones</span> &gt;{" "}
              <span className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                Agregar promoción
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
        <div className="flex-1 overflow-y-auto px-4 sm:px-[30px] py-4 sm:py-2 flex justify-center">
          <div className="w-full max-w-[484px] h-auto min-h-[400px] pt-8">
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Datos de la promoción */}
              <div className="space-y-3">
                <h3 className="text-base font-medium text-gray-800">Datos de la promoción</h3>
                
                <div className="flex flex-row gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-2">Nombre</label>
                    <Input
                      type="text"
                      placeholder="Ingresa un nombre"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      className="w-full h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                      style={INPUT_STYLES}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-2">Monto</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">S/</span>
                      <Input
                        type="text"
                        inputMode="decimal"
                        placeholder="0.00"
                        value={formData.monto}
                        onChange={handleMontoChange}
                        onKeyDown={handleKeyDown}
                        className="w-full h-[40px] pl-8 placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                        style={INPUT_STYLES}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Descripción</label>
                  <Textarea
                    placeholder="Describe una promoción"
                    value={formData.descripcion}
                    onChange={(e) => handleInputChange("descripcion", e.target.value)}
                    className="w-[484px] h-[95px] resize-none placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={INPUT_STYLES}
                  />
                </div>
              </div>

              {/* Fechas y horas */}
              <div className="space-y-2">
                <div className="flex gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Fecha de inicio</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-[230px] h-[40px] justify-between text-left font-normal"
                          style={INPUT_STYLES}
                        >
                          {format(formData.fechaInicio, "dd/MM/yyyy", { locale: es })}
                          <FechasIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 z-[10000]">
                        <Calendar
                          mode="single"
                          selected={formData.fechaInicio}
                          onSelect={(date) => date && handleInputChange("fechaInicio", date)}
                          initialFocus
                          disabled={(date) => isDateDisabled(date, false)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Fecha de fin</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-[230px] h-[40px] justify-between text-left font-normal"
                          style={INPUT_STYLES}
                        >
                          {format(formData.fechaFin, "dd/MM/yyyy", { locale: es })}
                          <FechasIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 z-[10000]">
                        <Calendar
                          mode="single"
                          selected={formData.fechaFin}
                          onSelect={(date) => date && handleInputChange("fechaFin", date)}
                          initialFocus
                          disabled={(date) => isDateDisabled(date, true)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Hora de inicio</label>
                    <div className="relative">
                      <Input
                        type="time"
                        value={formData.horaInicio}
                        onChange={(e) => handleInputChange("horaInicio", e.target.value)}
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
                        value={formData.horaFin}
                        onChange={(e) => handleInputChange("horaFin", e.target.value)}
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
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Imagen</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="file-input"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('file-input')?.click()}
                      className="w-[484px] h-[40px] bg-white border border-gray-300 rounded-md text-left px-3 text-[#BBBBBB] font-semibold text-sm hover:border-gray-400 transition-colors cursor-pointer flex items-center justify-between"
                      style={INPUT_STYLES}
                    >
                      <span className="text-[14px] font-semibold">
                        {formData.imagen ? formData.imagen.name : "Selecciona una imagen"}
                      </span>
                      <Upload className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Términos y condiciones */}
              <div className="space-y-3">
                <h3 className="text-base font-medium text-gray-800">Términos y condiciones</h3>
                <Input
                  placeholder="Ingresa términos y condiciones"
                  value={formData.terminos}
                  onChange={(e) => handleInputChange("terminos", e.target.value)}
                  className="w-[484px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                  style={INPUT_STYLES}
                />
              </div>

              {/* Estado */}
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-gray-800">Estado</h3>
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={formData.estado}
                    onCheckedChange={(checked) => handleInputChange("estado", checked)}
                    className="data-[state=checked]:bg-[#890277]"
                  />
                  <span className="text-sm text-gray-700">
                    {formData.estado ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-[30px] px-[30px] pb-6 justify-center">
          <GradientOutlineButton
            onClick={onClose}
            className="w-[138px] h-[40px] text-red-600 border-red-300 hover:bg-red-50"
          >
            Cancelar
          </GradientOutlineButton>
          <GradientButton
            type="button"
            onClick={handleSubmit}
            className="w-[138px] h-[40px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Agregar"}
          </GradientButton>
        </div>
      </div>
    </div>
  )
}
