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

interface EditarNovedadModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  novedadId: number | null
}

// Helper functions
const parseDate = (dateString?: string): Date => {
  if (!dateString) return new Date()
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return new Date(dateString + 'T00:00:00')
  }
  return new Date(dateString)
}

const parseTime = (timeString?: string): string => {
  if (!timeString) return ""
  // Si viene como timestamp completo, extraer solo la hora
  if (timeString.includes(' ')) {
    const timePart = timeString.split(' ')[1] || timeString.split('T')[1] || ""
    return timePart.length >= 5 ? timePart.substring(0, 5) : ""
  }
  return timeString.length >= 5 ? timeString.substring(0, 5) : timeString
}

export function EditarNovedadModal({ isOpen, onClose, onSave, novedadId }: EditarNovedadModalProps) {
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
  const [imagenActual, setImagenActual] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [novedadIdState, setNovedadIdState] = useState<number | null>(null)

  // Cargar datos de la novedad cuando se abre el modal
  useEffect(() => {
    if (isOpen && novedadId) {
      setNovedadIdState(novedadId)
      loadNovedadData(novedadId)
    } else if (!isOpen) {
      // Resetear el estado cuando se cierra el modal
      setDataLoaded(false)
      setNovedadIdState(null)
      setImagenActual(null)
      setFormData({
        titulo: "",
        descripcion: "",
        fechaInicio: null,
        fechaFin: null,
        horaInicio: "",
        horaFin: "",
        imagen: null,
        imagenes: [],
        estado: false
      })
    }
  }, [isOpen, novedadId])

  const loadNovedadData = async (id: number) => {
    try {
      setIsLoading(true)
      setDataLoaded(false)
      console.log('🔍 Cargando novedad con noveId:', id)
      const novedadData = await novedadesAPI.findById(id)
      
      // Construir la URL completa de la imagen si existe
      // El backend devuelve la ruta como: "/api/images/novedades/nombre-archivo.jpeg"
      let imagenUrl: string | null = null
      if (novedadData.noveImagen) {
        const imagenPath = novedadData.noveImagen.trim()
        if (imagenPath.startsWith('http://') || imagenPath.startsWith('https://')) {
          // URL completa, usar tal cual
          imagenUrl = imagenPath
        } else {
          // Ruta relativa que empieza con /, agregar el dominio
          imagenUrl = `http://localhost:8080${imagenPath}`
        }
      }
      console.log('🖼️ URL de imagen construida:', imagenUrl, 'desde:', novedadData.noveImagen)
      
      // Convertir el estado a booleano: priorizar noveEstado (string) si existe
      let estadoBooleano = false
      if (novedadData.noveEstado) {
        const estadoLower = novedadData.noveEstado.toLowerCase()
        estadoBooleano = estadoLower === 'activa' || estadoLower === 'activo'
      } else if (novedadData.noveIsActive !== undefined) {
        estadoBooleano = novedadData.noveIsActive
      }
      
      setFormData({
        titulo: novedadData.noveTitulo || "",
        descripcion: novedadData.noveDescripcion || "",
        fechaInicio: parseDate(novedadData.noveFechaInicio),
        fechaFin: parseDate(novedadData.noveFechaFin),
        horaInicio: parseTime(novedadData.noveHoraInicio),
        horaFin: parseTime(novedadData.noveHoraFin),
        imagen: null,
        imagenes: [],
        estado: estadoBooleano
      })
      setImagenActual(imagenUrl)
      setDataLoaded(true)
    } catch (error) {
      console.error("Error loading novedad data:", error)
      toast.error(error instanceof Error ? error.message : "Error al cargar los datos de la novedad")
      onClose()
    } finally {
      setIsLoading(false)
    }
  }

  // No mostrar el modal hasta que los datos estén cargados
  if (!isOpen || !dataLoaded) {
    // Mostrar un loader mientras se cargan los datos
    if (isOpen && isLoading) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#890277]"></div>
            <p className="text-gray-600">Cargando datos de la novedad...</p>
          </div>
        </div>
      )
    }
    return null
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateForm = (): boolean => {
    if (!formData.titulo.trim()) {
      toast.error("El título es obligatorio")
      return false
    }
    if (!formData.descripcion.trim()) {
      toast.error("La descripción es obligatoria")
      return false
    }
    if (!formData.fechaInicio) {
      toast.error("La fecha de inicio es obligatoria")
      return false
    }
    if (!formData.fechaFin) {
      toast.error("La fecha de fin es obligatoria")
      return false
    }
    if (formData.fechaFin < formData.fechaInicio) {
      toast.error("La fecha de fin no puede ser anterior a la fecha de inicio")
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
      // Crear DTO para actualizar (imagen es opcional)
      // Convertir el estado booleano a string "Activa" o "Inactiva"
      const estadoString = formData.estado ? "Activa" : "Inactiva"
      
      const novedadDataDTO = {
        noveTitulo: formData.titulo.trim(),
        noveDescripcion: formData.descripcion.trim(),
        noveFechaInicio: formData.fechaInicio!,
        noveFechaFin: formData.fechaFin!,
        noveHoraInicio: formData.horaInicio || undefined,
        noveHoraFin: formData.horaFin || undefined,
        noveImagen: formData.imagen || undefined, // Opcional en update - solo se envía si hay nueva imagen
        noveIsActive: formData.estado, // Mantener para compatibilidad
        noveEstado: estadoString // Enviar como string "Activa" o "Inactiva"
      }
      
      if (!novedadIdState) {
        toast.error("ID de novedad no válido")
        setIsSubmitting(false)
        return
      }
      
      console.log('📤 Actualizando novedad:', {
        id: novedadIdState,
        tieneNuevaImagen: !!formData.imagen,
        tieneImagenActual: !!imagenActual,
        datos: novedadDataDTO
      })
      
      const response = await novedadesAPI.updateFromDTO(novedadIdState, novedadDataDTO)
      
      if (response.noveId) {
        toast.success("Novedad actualizada exitosamente")
        // Notificar al componente padre para que recargue la lista
        onSave(response)
        // Cerrar el modal después de notificar
        onClose()
        setIsSubmitting(false)
      } else {
        toast.error(response.mensaje || "Error al actualizar la novedad")
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error updating novedad:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al actualizar la novedad. Por favor, intenta nuevamente."
      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleInputChange("imagen", file)
      setFormData(prev => ({
        ...prev,
        imagenes: [...prev.imagenes, file]
      }))
      // Limpiar la imagen actual cuando se selecciona una nueva
      setImagenActual(null)
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
                        <PopoverContent className="w-auto p-0 z-[10000]">
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
                        <PopoverContent className="w-auto p-0 z-[10000]">
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
                      <span className="text-[14px] font-semibold">
                        {formData.imagen ? formData.imagen.name : imagenActual ? "Imagen actual (click para cambiar)" : "Selecciona una imagen"}
                      </span>
                      <Upload className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  
                  {/* Mostrar badge de imagen actual si existe y no hay nueva imagen */}
                  {imagenActual && !formData.imagen && (
                    <div className="mt-2">
                      <div className="bg-[#6137E5] text-white flex items-center gap-2 w-fit px-3 py-1 rounded-full">
                        <span className="text-[14px] font-medium">
                          {imagenActual.split('/').pop() || 'Imagen actual'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setImagenActual(null)
                            handleInputChange("imagen", null)
                          }}
                          className="text-white hover:text-gray-200 transition-colors text-[16px]"
                          title="Eliminar imagen actual"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Mostrar badge de nueva imagen seleccionada */}
                  {formData.imagen && (
                    <div className="mt-2">
                      <div className="bg-[#6137E5] text-white flex items-center gap-2 w-fit px-3 py-1 rounded-full">
                        <span className="text-[14px] font-medium">{formData.imagen.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            handleInputChange("imagen", null)
                            setFormData(prev => ({
                              ...prev,
                              imagenes: []
                            }))
                          }}
                          className="text-white hover:text-gray-200 transition-colors text-[16px]"
                          title="Eliminar nueva imagen"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                  
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
                    <AlertIcon />
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
                    disabled={isSubmitting}
                    className="w-[138px] h-[40px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Guardando..." : "Guardar cambios"}
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
