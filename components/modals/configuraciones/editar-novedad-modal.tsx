"use client"

import { useState, useEffect } from "react"
import { X, Upload } from "lucide-react"
import { FechasIcon, HoraIcon } from "@/components/icons/configuraciones-icons"
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

interface EditarNovedadModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  novedadData: {
    id: string
    titulo: string
    descripcion: string
    fechaInicio: Date | null
    fechaFin: Date | null
    horaInicio: string
    horaFin: string
    estado: boolean
  }
}

export function EditarNovedadModal({ isOpen, onClose, onSave, novedadData }: EditarNovedadModalProps) {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fechaInicio: null as Date | null,
    fechaFin: null as Date | null,
    horaInicio: "",
    horaFin: "",
    imagen: null as File | null,
    imagenes: [] as File[],
    estado: false
  })

  // Cargar datos de la novedad cuando se abre el modal
  useEffect(() => {
    if (isOpen && novedadData) {
      setFormData({
        titulo: novedadData.titulo,
        descripcion: novedadData.descripcion,
        fechaInicio: novedadData.fechaInicio,
        fechaFin: novedadData.fechaFin,
        horaInicio: novedadData.horaInicio,
        horaFin: novedadData.horaFin,
        imagen: null,
        imagenes: [],
        estado: novedadData.estado
      })
    }
  }, [isOpen, novedadData])

  if (!isOpen) return null

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, id: novedadData.id })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleInputChange("imagen", file)
      setFormData(prev => ({
        ...prev,
        imagenes: [...prev.imagenes, file]
      }))
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-xl w-[95vw] max-w-[684px] h-[95vh] max-h-[800px] mx-2 sm:mx-4 flex flex-col overflow-hidden">
        {/* Header */}
        <div 
          className="flex justify-between items-start px-4 sm:px-[30px] pt-4 sm:pt-[30px] pb-4 sm:pb-6 flex-shrink-0 bg-[#FEFEFE]"
          style={{ 
            boxShadow: '0 4px 10px rgba(219, 8, 110, 0.08)'
          }}
        >
          <div className="flex-1">
            <h2 className="text-lg sm:text-[24px] font-medium text-[#1C1C1C] mb-2">Editar novedad</h2>
            <div className="text-[10px] sm:text-[12px] text-gray-600 mt-2 sm:mt-4">
              <span className="text-[#9C82EF]">Configuraciones</span> &gt;{" "}
              <span className="text-[#9C82EF]">Novedades</span> &gt;{" "}
              <span 
                className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                Editar novedad
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
                    value={formData.titulo}
                    onChange={(e) => handleInputChange("titulo", e.target.value)}
                    placeholder="Ingresa un título"
                    className="w-full sm:w-[484px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Descripción</label>
                  <Textarea
                    value={formData.descripcion}
                    onChange={(e) => handleInputChange("descripcion", e.target.value)}
                    placeholder="Describe una novedad"
                    className="w-full sm:w-[484px] h-[95px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm resize-none"
                    style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
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
                            style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                          >
                            {formData.fechaInicio ? format(formData.fechaInicio, "dd/MM/yyyy", { locale: es }) : 'Seleccionar fecha'}
                            <FechasIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={formData.fechaInicio || undefined}
                            onSelect={(date) => date && handleInputChange("fechaInicio", date)}
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
                            style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                          >
                            {formData.fechaFin ? format(formData.fechaFin, "dd/MM/yyyy", { locale: es }) : 'Seleccionar fecha'}
                            <FechasIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={formData.fechaFin || undefined}
                            onSelect={(date) => date && handleInputChange("fechaFin", date)}
                            initialFocus
                            locale={es}
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
                          value={formData.horaInicio}
                          onChange={(e) => handleInputChange("horaInicio", e.target.value)}
                          className="w-[230px] h-[40px] pr-8"
                          style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
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
                          style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
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
                      id="file-input-editar-novedad"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('file-input-editar-novedad')?.click()}
                      className="w-[484px] h-[40px] bg-white border border-gray-300 rounded-md text-left px-3 text-[#BBBBBB] font-semibold text-sm hover:border-gray-400 transition-colors cursor-pointer flex items-center justify-between"
                      style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                    >
                      <span className="text-[14px] font-semibold">Selecciona una imagen</span>
                      <Upload className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  {/* Tags de imágenes seleccionadas */}
                  {formData.imagenes && formData.imagenes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.imagenes.map((imagen, index) => (
                        <div
                          key={index}
                          className="bg-[#6137E5] text-white flex items-center gap-2"
                          style={{ 
                            width: '84px', 
                            height: '24px', 
                            borderRadius: '12px',
                            padding: '0 8px'
                          }}
                        >
                          <span className="text-[14px] font-medium truncate">Img.{String(index + 1).padStart(2, '0')}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="text-white hover:text-gray-200 transition-colors text-[16px]"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Texto de validación */}
                  <div className="flex items-center gap-2 mt-2 text-orange-600 text-xs">
                    <span>⚠</span>
                    <span>Puedes cargar un máximo de cuatro (4) imágenes / JPG, PNG / Máx 20 MB</span>
                  </div>
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

                {/* Botones de acción */}
                <div className="flex gap-[30px] justify-center pt-6">
                  <GradientOutlineButton
                    onClick={onClose}
                    className="w-[138px] h-[40px] text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    Cancelar
                  </GradientOutlineButton>
                  <GradientButton
                    type="submit"
                    className="w-[138px] h-[40px]"
                  >
                    Guardar cambios
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
