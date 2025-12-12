"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NotificationToast } from "@/components/ui/notification-toast"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { anfitrionApi, AnfitrionDTO, concursoApi, ConcursoCreateDTO } from "@/lib/api"
import { ConcursoImageUpload } from "../../shared/image-upload"
import { HoraIcon } from "@/components/icons/configuraciones-icons"

interface AgregarConcursoModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
}

interface ValidationErrors {
  nombreConcurso?: string
  usuaId?: string
  wcNecesarias?: string
  imagen?: string
}

export function AgregarConcursoModal({ isOpen, onClose, onSave }: AgregarConcursoModalProps) {
  const [anfitriones, setAnfitriones] = useState<AnfitrionDTO[]>([])
  const [loadingAnfitriones, setLoadingAnfitriones] = useState(false)
  
  // Estados para toast
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: "", message: "" })
  const [toastType, setToastType] = useState<"success" | "error">("success")
  
  // Estados para validación
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  
  // Estado para manejar la imagen como archivo
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    nombreConcurso: "",
    fecha: new Date(),
    horaInicio: "",
    usuaId: 0,
    nombreAnfitrion: "",
    wcNecesarias: 0,
    estado: true
  })

  // Limpiar formData cuando se abra el modal
  useEffect(() => {
    if (isOpen) {
      setFormData({
        nombreConcurso: "",
        fecha: new Date(),
        horaInicio: "",
        usuaId: 0,
        nombreAnfitrion: "",
        wcNecesarias: 0,
        estado: true
      })
      setSelectedImageFile(null)
      setUploadError(null)
      setValidationErrors({})
    }
  }, [isOpen])

  // Cargar anfitriones cuando se abra el modal
  useEffect(() => {
    if (isOpen) {
      const fetchAnfitriones = async () => {
        try {
          setLoadingAnfitriones(true)
          const data = await anfitrionApi.getActiveAnfitriones()
          setAnfitriones(data)
        } catch (error) {
          console.error('Error loading anfitriones:', error)
        } finally {
          setLoadingAnfitriones(false)
        }
      }
      
      fetchAnfitriones()
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Limpiar error de validación para este campo
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const handleAnfitrionChange = (usuaId: string) => {
    const anfitrion = anfitriones.find(a => a.id === parseInt(usuaId, 10))
    
    setFormData(prev => ({
      ...prev,
      usuaId: parseInt(usuaId, 10),
      nombreAnfitrion: anfitrion?.nombre || ""
    }))
    
    // Limpiar error de validación para usuaId
    if (validationErrors.usuaId) {
      setValidationErrors(prev => ({
        ...prev,
        usuaId: undefined
      }))
    }
  }

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {}

    if (!formData.nombreConcurso.trim()) {
      errors.nombreConcurso = "El nombre del concurso es obligatorio"
    } else if (formData.nombreConcurso.length > 255) {
      errors.nombreConcurso = "El nombre no puede exceder 255 caracteres"
    }

    if (!formData.usuaId || formData.usuaId === 0) {
      errors.usuaId = "Debe seleccionar un anfitrión"
    }

    if (!formData.wcNecesarias || formData.wcNecesarias <= 0) {
      errors.wcNecesarias = "Las WC necesarias deben ser mayor a 0"
    }

    if (!selectedImageFile) {
      errors.imagen = "La imagen del concurso es obligatoria"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar formulario
    if (!validateForm()) {
      showToastMessage("error", "Error de validación", "Por favor, corrige los errores en el formulario")
      return
    }
    
    try {
      setIsUploading(true)
      
      const concursoData: ConcursoCreateDTO = {
        concNombre: formData.nombreConcurso,
        concFechaPropuesta: `${format(formData.fecha, "yyyy-MM-dd")} 00:00:00`,
        concHora: formData.horaInicio || undefined,
        usuaId: formData.usuaId,
        concWc: formData.wcNecesarias,
        concIsActive: formData.estado
      }
      
      if (!selectedImageFile) {
        throw new Error('La imagen del concurso es obligatoria')
      }
      
      await concursoApi.createWithImage(concursoData, selectedImageFile)
      
      // Mostrar toast de éxito
      showToastMessage("success", "Concurso agregado", "El concurso se ha agregado exitosamente")
      
      // Cerrar el modal después de un breve delay
      setTimeout(() => {
        onSave(formData)
        onClose()
      }, 1000)
      
    } catch (error) {
      console.error("Error al crear concurso:", error)
      showToastMessage("error", "Error", "Error al crear el concurso")
    } finally {
      setIsUploading(false)
    }
  }

  const showToastMessage = (type: "success" | "error", title: string, message: string) => {
    setToastType(type)
    setToastMessage({ title, message })
    setShowToast(true)
    
    // Ocultar el toast después de 5 segundos
    setTimeout(() => {
      setShowToast(false)
    }, 5000)
  }

  // Manejar cambio de imagen - ahora solo guardamos el archivo
  const handleImageChange = (file: File | null, preview?: string) => {
    setSelectedImageFile(file)
    setUploadError(null)
    
    // Limpiar error de validación para imagen
    if (validationErrors.imagen) {
      setValidationErrors(prev => ({
        ...prev,
        imagen: undefined
      }))
    }
    
  }


  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#FBFBFB] rounded-xl w-[570px] h-[720px] mx-4 flex flex-col overflow-hidden">
          {/* Header */}
          <div 
            className="flex justify-between items-start px-[30px] pt-[30px] pb-6 flex-shrink-0 bg-[#FEFEFE]"
            style={{ 
              boxShadow: '0 4px 10px rgba(219, 8, 110, 0.08)'
            }}
          >
            <div className="flex-1">
              <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Agregar concurso</h2>
              <div className="text-[12px] text-gray-600 mt-4">
                <span className="text-[#9C82EF]">Administración</span> &gt;{" "}
                <span className="text-[#9C82EF]">Concursos</span> &gt;{" "}
                <span 
                  className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                  Agregar nuevo concurso
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-[20px] mt-0">
            <div 
              className="flex-1 rounded-lg p-6 mb-6 overflow-y-auto">
              <div className="rounded-lg p-1">
                <h3 className="text-[16px] font-medium text-[#1C1C1C] mb-6 text-start">
                  Datos del concurso
                </h3>
                
                <div className="space-y-6 mt-4">
                  {/* Nombre del concurso */}
                  <div>
                    <label className="block text-[12px] font-medium text-[#777777] mb-2">
                      Nombre del concurso
                    </label>
                    <Input
                      type="text"
                      placeholder="Nombre"
                      value={formData.nombreConcurso}
                      onChange={(e) => handleInputChange("nombreConcurso", e.target.value)}
                      className={`w-full sm:w-[484px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm ${validationErrors.nombreConcurso ? 'border-red-500' : ''}`}
                      style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                      required
                    />
                    {validationErrors.nombreConcurso && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.nombreConcurso}</p>
                    )}
                  </div>

                  {/* Fecha y Hora de inicio - En la misma fila */}
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Fecha
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className={cn(
                              "w-[230px] h-[40px] flex items-center justify-between px-3 text-sm justify-between text-left font-normal",
                              !formData.fecha && "text-gray-500"
                            )}
                            style={{ boxShadow: '0 4px 20px rgba(219,8,110,0.08)' }}
                          >
                            {formData.fecha ? (
                              format(formData.fecha, "dd/MM/yyyy", { locale: es })
                            ) : (
                              <span>Seleccionar fecha</span>
                            )}
                            <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 z-[10000]" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={formData.fecha}
                            onSelect={(date) => date && setFormData(prev => ({ ...prev, fecha: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Hora de inicio
                      </label>
                      <div className="relative">
                        <Input
                          type="time"
                          value={formData.horaInicio}
                          onChange={(e) => setFormData(prev => ({ ...prev, horaInicio: e.target.value }))}
                          className="w-[230px] h-[40px] pr-8 placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                          style={{ boxShadow: '0 4px 20px rgba(219,8,110,0.08)' }}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <HoraIcon />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nombre anfitrión y WC necesarias - En la misma fila */}
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Nombre anfitrión(a)
                      </label>
                      <Select 
                        value={formData.usuaId.toString()} 
                        onValueChange={handleAnfitrionChange}
                        disabled={loadingAnfitriones}
                      >
                        <SelectTrigger className={`w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_20px_rgba(219,8,110,0.08)] border-none ${validationErrors.usuaId ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder={loadingAnfitriones ? "Cargando..." : "Selecciona un anfitrión"}>
                            {formData.nombreAnfitrion || (loadingAnfitriones ? "Cargando..." : "Selecciona un anfitrión")}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {anfitriones.map((anfitrion) => (
                            <SelectItem key={anfitrion.id} value={anfitrion.id.toString()}>
                              {anfitrion.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {validationErrors.usuaId && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.usuaId}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        WC necesarias por opción
                      </label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.wcNecesarias}
                        onChange={(e) => handleInputChange("wcNecesarias", parseInt(e.target.value) || 0)}
                        className={`w-[230px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm ${validationErrors.wcNecesarias ? 'border-red-500' : ''}`}
                        style={{ boxShadow: '0 4px 20px rgba(219,8,110,0.08)' }}
                        required
                      />
                      {validationErrors.wcNecesarias && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.wcNecesarias}</p>
                      )}
                    </div>
                  </div>

                  {/* Imagen */}
                  <div>
                    <label className="block text-[12px] font-medium text-[#777777] mb-2">Imagen</label>
                    <ConcursoImageUpload
                      onImageChange={handleImageChange}
                      existingImageUrl=""
                    />
                    {uploadError && (
                      <p className="text-red-500 text-xs mt-1">{uploadError}</p>
                    )}
                    {validationErrors.imagen && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.imagen}</p>
                    )}
                  </div>

                  {/* Estado - Debajo de la imagen */}
                  <div className="flex items-center justify-between h-[40px]">
                    <label className="text-[12px] font-medium text-[#777777]">
                      Estado
                    </label>
                    <div className="flex items-center">
                      <Switch
                        checked={formData.estado}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, estado: checked }))}
                        className="data-[state=checked]:bg-[#A13592]"
                      />
                      <span className="text-[14px] text-[#1C1C1C] ml-3">
                        {formData.estado ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-[10px] px-[20px] pb-6 justify-center">
              <GradientOutlineButton
                onClick={onClose}
                className="w-[138px] h-[40px] text-red-500 border-red-500 hover:bg-red-50"
              >
                Cancelar
              </GradientOutlineButton>
              <GradientButton
                type="submit"
                disabled={isUploading}
                className="w-[138px] h-[40px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Subiendo...' : 'Agregar'}
              </GradientButton>
            </div>
          </form>
        </div>
      </div>

      {showToast && (
        <NotificationToast
          type={toastType}
          title={toastMessage.title}
          message={toastMessage.message}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  )
}
