"use client"

import { useState, useEffect } from "react"
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
import { FechasIcon, HoraIcon, AlertIcon } from "@/components/icons/configuraciones-icons"
import { sponsorsAPI, SponsorUpdateDTO } from "@/lib/api"
import { toast } from "sonner"

interface Sponsor {
  sponId: number
  nombre: string
  link: string
  descripcion: string
  fechaInicio: Date
  fechaFin: Date
  horaInicio: string
  horaFin: string
  imagen: string // URL o path de la imagen actual
  imagenes: File[] // Array de imágenes nuevas subidas
  estado: boolean // Estado activo/inactivo (solo frontend, no se envía al backend)
}

interface EditarSponsorModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: Sponsor) => void
  sponsor: Sponsor | null
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
  return timeString.length >= 5 ? timeString.substring(0, 5) : timeString
}

export function EditarSponsorModal({ isOpen, onClose, onSave, sponsor }: EditarSponsorModalProps) {
  const [formData, setFormData] = useState<Sponsor>({
    sponId: 0,
    nombre: "",
    link: "",
    descripcion: "",
    fechaInicio: new Date(),
    fechaFin: new Date(),
    horaInicio: "",
    horaFin: "",
    imagen: "",
    imagenes: [],
    estado: true
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    if (sponsor && isOpen) {
      loadSponsorData(sponsor.sponId)
    } else if (!isOpen) {
      setDataLoaded(false)
    }
  }, [sponsor, isOpen])

  const loadSponsorData = async (id: number) => {
    try {
      setIsLoading(true)
      setDataLoaded(false)
      const sponsorData = await sponsorsAPI.getById(id)
      
      setFormData({
        sponId: sponsorData.sponId || id,
        nombre: sponsorData.sponNombre || "",
        link: sponsorData.sponLink || "",
        descripcion: sponsorData.sponDescripcion || "",
        fechaInicio: parseDate(sponsorData.sponFechaInicio),
        fechaFin: parseDate(sponsorData.sponFechaFin),
        horaInicio: parseTime(sponsorData.sponHoraInicio),
        horaFin: parseTime(sponsorData.sponHoraFin),
        imagen: sponsorData.sponImagen || "",
        imagenes: [],
        estado: true
      })
      setDataLoaded(true)
    } catch (error) {
      console.error("Error loading sponsor data:", error)
      toast.error(error instanceof Error ? error.message : "Error al cargar los datos del sponsor")
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
            <p className="text-gray-600">Cargando datos del sponsor...</p>
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validar tamaño (40 MB máximo)
      const maxSize = 40 * 1024 * 1024 // 40 MB en bytes
      if (file.size > maxSize) {
        toast.error("La imagen no puede superar los 40 MB")
        return
      }
      
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        toast.error("Solo se permiten archivos de imagen (JPG, PNG)")
        return
      }

      // Limitar a máximo 4 imágenes
      if (formData.imagenes.length >= 4) {
        toast.error("Puedes cargar un máximo de 4 imágenes")
        return
      }

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

  // Función para convertir File a base64 string
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const result = reader.result as string
        // Remover el prefijo "data:image/...;base64," y devolver solo el base64
        const base64 = result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = error => reject(error)
    })
  }

  const validateForm = (): boolean => {
    if (!formData.nombre.trim()) {
      toast.error("El nombre es obligatorio")
      return false
    }
    if (!formData.descripcion.trim()) {
      toast.error("La descripción es obligatoria")
      return false
    }
    if (!formData.link.trim()) {
      toast.error("El link es obligatorio")
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

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Determinar qué imagen enviar:
      // Si hay una nueva imagen subida, convertirla a base64
      // Si no, usar la imagen actual (string)
      let imagenToSend = formData.imagen // Por defecto, usar la imagen actual
      
      if (formData.imagenes.length > 0) {
        // Si hay una nueva imagen, convertir la primera a base64
        try {
          imagenToSend = await fileToBase64(formData.imagenes[0])
        } catch (error) {
          console.error("Error converting image to base64:", error)
          toast.error("Error al procesar la imagen")
          setIsSubmitting(false)
          return
        }
      }

      // Crear DTO para actualizar sponsor
      const sponsorUpdateDTO: SponsorUpdateDTO = {
        sponId: formData.sponId,
        sponNombre: formData.nombre.trim(),
        sponDescripcion: formData.descripcion.trim(),
        sponLink: formData.link.trim(),
        sponFechaInicio: formData.fechaInicio,
        sponFechaFin: formData.fechaFin,
        sponHoraInicio: formData.horaInicio || undefined,
        sponHoraFin: formData.horaFin || undefined,
        sponImagen: imagenToSend // Enviar la imagen (string: URL, path o base64)
      }
      
      const response = await sponsorsAPI.update(sponsorUpdateDTO)
      
      if (response.sponId) {
        toast.success("Sponsor actualizado exitosamente")
        onSave(formData)
        setTimeout(() => {
          onClose()
        }, 1500)
      } else {
        toast.error(response.mensaje || "Error al actualizar el sponsor")
      }
    } catch (error) {
      console.error("Error updating sponsor:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al actualizar el sponsor. Por favor, intenta nuevamente."
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#FBFBFB] rounded-xl w-[95vw] max-w-[684px] h-[93vh] max-h-[1000px] mx-4 flex flex-col overflow-hidden">
        {/* Header */}
        <div 
          className="flex justify-between items-start px-[30px] pt-[30px] pb-6 flex-shrink-0 bg-[#FEFEFE]"
          style={{ 
            boxShadow: '0 4px 10px rgba(219, 8, 110, 0.08)'
          }}
        >
          <div className="flex-1">
            <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Editar sponsor</h2>
            <div className="text-[12px] text-gray-600 mt-4">
              <span className="text-[#9C82EF]">Configuraciones</span> &gt;{" "}
              <span className="text-[#9C82EF]">Sponsors</span> &gt;{" "}
              <span className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                Editar sponsor
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
        <div className="flex-1 overflow-y-auto px-4 sm:px-[30px] py-4 sm:py-3 flex justify-center">
          <div className="w-full max-w-[484px] h-auto min-h-[400px] pt-8">
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Datos del sponsor */}
              <div className="space-y-4">
                <h3 className="text-base font-medium text-gray-800">Datos del sponsor</h3>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Nombre</label>
                  <Input
                    type="text"
                    placeholder="Ingresa un nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    className="w-[484px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Link</label>
                  <Input
                    type="text"
                    placeholder="Ingresa un link"
                    value={formData.link}
                    onChange={(e) => handleInputChange("link", e.target.value)}
                    className="w-[484px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Descripción</label>
                  <Textarea
                    placeholder="Describe un sponsor"
                    value={formData.descripcion}
                    onChange={(e) => handleInputChange("descripcion", e.target.value)}
                    className="w-[484px] h-[95px] resize-none placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                  />
                </div>
              </div>

              {/* Fechas y horas */}
              <div className="space-y-2">
                <div className="space-y-3">
                  {/* Primera fila: Fecha de inicio y Fecha de fin */}
                  <div className="flex gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Fecha de inicio</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-[230px] h-[40px] justify-between text-left font-normal"
                            style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                          >
                            {formData.fechaInicio && !isNaN(formData.fechaInicio.getTime()) 
                              ? format(formData.fechaInicio, "dd/MM/yyyy", { locale: es })
                              : 'Seleccionar fecha'}
                            <FechasIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 z-[10000]">
                          <Calendar
                            mode="single"
                            selected={formData.fechaInicio}
                            onSelect={(date) => date && handleInputChange("fechaInicio", date)}
                            initialFocus
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
                            style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                          >
                            {formData.fechaFin && !isNaN(formData.fechaFin.getTime()) 
                              ? format(formData.fechaFin, "dd/MM/yyyy", { locale: es })
                              : 'Seleccionar fecha'}
                            <FechasIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 z-[10000]">
                          <Calendar
                            mode="single"
                            selected={formData.fechaFin}
                            onSelect={(date) => date && handleInputChange("fechaFin", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>

                {/* Segunda fila: Hora de inicio y Hora de fin */}
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
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Imagen</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="file-input-edit"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('file-input-edit')?.click()}
                      className="w-[484px] h-[40px] bg-white border border-gray-300 rounded-md text-left px-3 text-[#BBBBBB] font-semibold text-sm hover:border-gray-400 transition-colors cursor-pointer flex items-center justify-between"
                      style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                    >
                      <span className="text-[14px] font-semibold">Selecciona una imagen</span>
                      <Upload className="w-4 h-4 text-gray-400" />
                    </button>
                    
                    {/* Badges de imágenes: actual y nuevas */}
                    {(formData.imagen || (formData.imagenes && formData.imagenes.length > 0)) && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {/* Badge de imagen actual */}
                        {formData.imagen && (
                          <div
                            className="bg-[#6137E5] text-white flex items-center gap-2"
                            style={{ 
                              minWidth: '84px', 
                              height: '24px', 
                              borderRadius: '12px',
                              padding: '0 8px'
                            }}
                          >
                            <span className="text-[14px] font-medium truncate max-w-[200px]">
                              {formData.imagen.length > 30 
                                ? formData.imagen.substring(0, 30) + '...' 
                                : formData.imagen}
                            </span>
                          </div>
                        )}
                        
                        {/* Badges de nuevas imágenes seleccionadas */}
                        {formData.imagenes && formData.imagenes.length > 0 && formData.imagenes.map((imagen, index) => (
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
                    
                    {/* Información de validación */}
                    <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
                      <AlertIcon />
                      <span>Puedes cargar un máximo de cuatro (4) imágenes / JPG, PNG / Máx 40 MB</span>
                    </div>
                  </div>
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
            </form>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-[30px] px-[30px] pb-6 justify-center pb-[10px]">
          <GradientOutlineButton
            onClick={onClose}
            className="w-[138px] h-[40px] text-red-600 border-red-300 hover:bg-red-50"
          >
            Cancelar
          </GradientOutlineButton>
          <GradientButton
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-[138px] h-[40px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Guardando..." : "Guardar"}
          </GradientButton>
        </div>
      </div>
    </div>
  )
}
