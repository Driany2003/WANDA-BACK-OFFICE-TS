"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { anfitrionApi, AnfitrionDTO, ConcursoAdminDTO, concursoApi, ConcursoResponse } from "@/lib/api"
import { ConcursoImageUpload } from "@/components/shared/image-upload"
import { HoraIcon } from "@/components/icons/configuraciones-icons"

interface EditarConcursoModalProps {
  isOpen: boolean
  onClose: () => void
  concurso: ConcursoAdminDTO
  onSave: (data: any) => void
  onReopen?: () => void // Función para reabrir el modal
}

export function EditarConcursoModal({ isOpen, onClose, concurso, onSave, onReopen }: EditarConcursoModalProps) {
  const [anfitriones, setAnfitriones] = useState<AnfitrionDTO[]>([])
  const [loadingAnfitriones, setLoadingAnfitriones] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [concursoCompleto, setConcursoCompleto] = useState<ConcursoResponse | null>(null)
  const [imagenExistente, setImagenExistente] = useState<string | undefined>(undefined)
  const [nuevaImagen, setNuevaImagen] = useState<File | null>(null)
  const [showImagePreview, setShowImagePreview] = useState(false)
  
  const [formData, setFormData] = useState({
    nombreConcurso: "",
    fecha: new Date(),
    horaInicio: "",
    usuaId: 0,
    nombreAnfitrion: "",
    wcNecesarias: 0,
    imagen: null as File | null,
    imagenes: [] as File[],
    estado: false
  })

  // Helper: Parsear fecha de string a Date
  const parseFecha = (fechaString?: string): Date => {
    if (!fechaString) return new Date()
    try {
      const fecha = new Date(fechaString)
      return isNaN(fecha.getTime()) ? new Date() : fecha
    } catch {
      return new Date()
    }
  }

  // Helper: Parsear hora de string a formato HH:mm
  const parseTime = (timeString?: string): string => {
    if (!timeString) return ""
    // Si viene en formato HH:mm:ss, tomar solo HH:mm
    if (timeString.length >= 5) {
      return timeString.substring(0, 5)
    }
    return timeString
  }

  // Helper: Inicializar formData desde datos del concurso
  const initializeFormData = (data: ConcursoResponse | ConcursoAdminDTO) => {
    return {
      nombreConcurso: data.concNombre || "",
      fecha: parseFecha(data.concFechaPropuesta),
      horaInicio: parseTime(data.concHora),
      usuaId: data.usuaId || 0,
      nombreAnfitrion: (data as ConcursoAdminDTO).nombreAnfitrion || (data as ConcursoResponse).nombreAnfitrion || "",
      wcNecesarias: data.concWc || 0,
      imagen: null,
      imagenes: [],
      estado: (data as ConcursoAdminDTO).estado === "Activo" || (data as ConcursoResponse).concIsActive === true
    }
  }

  // Helper: Establecer imagen existente
  const setImagenFromData = (data: ConcursoResponse | ConcursoAdminDTO) => {
    if (data.concImagen) {
      setImagenExistente(data.concImagen)
    }
  }

  // Cargar datos completos del concurso cuando se abra el modal
  useEffect(() => {
    const fetchConcursoCompleto = async () => {
      if (concurso?.concId && isOpen) {
        try {
          setIsLoadingData(true)
          // Primero mostrar los datos que ya tenemos del listado
          setFormData(initializeFormData(concurso))
          setImagenFromData(concurso)
          
          // Luego cargar los datos actualizados
          const data = await concursoApi.getById(concurso.concId)
          setConcursoCompleto(data)
          
          // Actualizar el formulario con los datos más recientes
          setFormData(initializeFormData(data))
          setImagenFromData(data)
        } catch (error) {
          console.error('Error al cargar concurso:', error)
          setFormData(initializeFormData(concurso))
          setImagenFromData(concurso)
        } finally {
          setIsLoadingData(false)
        }
      }
    }

    fetchConcursoCompleto()
  }, [concurso?.concId, isOpen])

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

  const handleAnfitrionChange = (usuaId: string) => {
    const anfitrion = anfitriones.find(a => a.id === parseInt(usuaId, 10))
    
    setFormData(prev => ({
      ...prev,
      usuaId: parseInt(usuaId, 10),
      nombreAnfitrion: anfitrion?.nombre || ""
    }))
  }

  useEffect(() => {
    if (!isOpen) {
      setFormData({ nombreConcurso: "", fecha: new Date(), horaInicio: "", usuaId: 0, nombreAnfitrion: "", wcNecesarias: 0, imagen: null, imagenes: [], estado: false })
      setConcursoCompleto(null)
      setImagenExistente(undefined)
      setNuevaImagen(null)
      setIsLoadingData(false)
    }
  }, [isOpen])

  const removeImagenExistente = () => {
    setImagenExistente(undefined)
  }

  const getFileName = (imageUrl: string): string => {
    // Extraer el nombre del archivo de la URL
    const parts = imageUrl.split('/')
    const fileName = parts[parts.length - 1]
    return fileName || 'Imagen'
  }

  // No mostrar el modal hasta que los datos estén cargados
  if (!isOpen || !concurso || isLoadingData) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const updateData = {
      concId: concursoCompleto?.concId || concurso.concId,
      concNombre: formData.nombreConcurso,
      concFechaPropuesta: `${format(formData.fecha, "yyyy-MM-dd")} 00:00:00`,
      concHora: formData.horaInicio || undefined,
      usuaId: formData.usuaId,
      concWc: formData.wcNecesarias,
      concImagen: nuevaImagen ? "nueva_imagen" : (imagenExistente || undefined),
      concIsActive: formData.estado,
      nuevaImagen: nuevaImagen
    }
    
    onSave(updateData)
    onClose()
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
              <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Editar concurso</h2>
              <div className="text-[12px] text-gray-600 mt-4">
                <span className="text-[#9C82EF]">Administración</span> &gt;{" "}
                <span className="text-[#9C82EF]">Concursos</span> &gt;{" "}
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
                      onChange={(e) => setFormData(prev => ({ ...prev, nombreConcurso: e.target.value }))}
                      className="w-full sm:w-[484px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                      style={{ boxShadow: '0 4px 20px rgba(219,8,110,0.08)' }}
                      required
                    />
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
                        Nombre anfitrión
                      </label>
                      <Select 
                        value={formData.usuaId > 0 ? formData.usuaId.toString() : undefined} 
                        onValueChange={handleAnfitrionChange}
                        disabled={loadingAnfitriones}
                      >
                        <SelectTrigger className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_20px_rgba(219,8,110,0.08)] border-none">
                          <SelectValue placeholder={loadingAnfitriones ? "Cargando..." : "Selecciona un anfitrión"} />
                        </SelectTrigger>
                        <SelectContent>
                          {anfitriones.map((anfitrion) => (
                            <SelectItem key={anfitrion.id} value={anfitrion.id.toString()}>
                              {anfitrion.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        WC necesarias por opción
                      </label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.wcNecesarias}
                        onChange={(e) => setFormData(prev => ({ ...prev, wcNecesarias: parseInt(e.target.value) || 0 }))}
                        className="w-[230px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                        style={{ boxShadow: '0 4px 20px rgba(219,8,110,0.08)' }}
                        required
                      />
                    </div>
                  </div>

                  {/* Imagen */}
                  <div>
                    <label className="block text-[12px] font-medium text-[#777777] mb-2">Imagen</label>
                    
                    <ConcursoImageUpload
                      onImageChange={(file) => {
                        setNuevaImagen(file || null)
                        setFormData(prev => ({ 
                          ...prev, 
                          imagen: file,
                          imagenes: file ? [...prev.imagenes, file] : []
                        }))
                      }}
                      existingImageUrl={imagenExistente ? (imagenExistente.startsWith('/') ? `http://localhost:8080${imagenExistente}` : imagenExistente) : undefined}
                      onPreviewOpen={() => setShowImagePreview(true)}
                      onPreviewClose={() => setShowImagePreview(false)}
                      className="mb-0"
                    />
                    
                    {/* Tag de imagen existente */}
                    {imagenExistente && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div
                          className="bg-[#6137E5] text-white flex items-center gap-2"
                          style={{ 
                            minWidth: '84px', 
                            height: '24px', 
                            borderRadius: '12px',
                            padding: '0 8px'
                          }}
                        >
                          <span className="text-[14px] font-medium truncate max-w-[60px]">
                            {getFileName(imagenExistente)}
                          </span>
                          <button
                            type="button"
                            onClick={removeImagenExistente}
                            className="text-white hover:text-gray-200 transition-colors text-[16px] flex-shrink-0"
                          >
                            ×
                          </button>
                        </div>
                      </div>
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
            <div className="flex gap-[10px] px-[20px] pb-6 justify-center -mt-10">
              <GradientOutlineButton
                onClick={onClose}
                className="w-[138px] h-[40px] text-red-500 border-red-500 hover:bg-red-50"
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

      {/* Modal de preview de imagen */}
      {showImagePreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#FBFBFB] rounded-xl w-[800px] h-[600px] mx-4 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-white px-[20px] py-[16px] border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-[18px] font-semibold text-[#1C1C1C]">
                Vista previa de la imagen
              </h2>
              <button
                type="button"
                onClick={() => setShowImagePreview(false)}
                className="text-[#A4A4A4] hover:text-[#1C1C1C] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
              <div className="relative flex items-center justify-center">
                {/* Mostrar nueva imagen si existe, sino mostrar imagen actual */}
                {nuevaImagen ? (
                  <img
                    src={URL.createObjectURL(nuevaImagen)}
                    alt="Vista previa de la nueva imagen"
                    className="rounded-lg shadow-lg"
                    style={{
                      maxWidth: '600px',
                      maxHeight: '400px',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : imagenExistente ? (
                  <img
                    src={imagenExistente.startsWith('/') ? `http://localhost:8080${imagenExistente}` : imagenExistente}
                    alt="Vista previa de la imagen actual"
                    className="rounded-lg shadow-lg"
                    style={{
                      maxWidth: '600px',
                      maxHeight: '400px',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="text-gray-500 text-center">
                    <p>No hay imagen para mostrar</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white px-[20px] py-[16px] border-t border-gray-200 flex justify-end">
              <GradientOutlineButton
                onClick={() => setShowImagePreview(false)}
                className="px-6 py-2"
              >
                Cerrar
              </GradientOutlineButton>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
