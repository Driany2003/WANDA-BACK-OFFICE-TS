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
import { anfitrionApi, AnfitrionDTO, ConcursoAdminDTO } from "@/lib/api"
import { ConcursoImageUpload } from "@/components/shared/image-upload"

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
  const [imagenActual, setImagenActual] = useState<string>("")
  const [nuevaImagen, setNuevaImagen] = useState<File | null>(null)
  const [showImagePreview, setShowImagePreview] = useState(false)
  
  const [formData, setFormData] = useState({
    nombreConcurso: "",
    fecha: new Date(),
    usuaId: 0,
    nombreAnfitrion: "",
    wcNecesarias: 0,
    imagen: null as File | null,
    imagenes: [] as File[],
    estado: false
  })

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
    if (concurso) {
      console.log('Concurso recibido:', concurso)
      console.log('Fecha original:', concurso.concFechaPropuesta)
      
      // Convertir el formato de fecha del backend a un objeto Date válido
      let fecha = new Date()
      try {
        fecha = new Date(concurso.concFechaPropuesta)
        console.log('Fecha convertida:', fecha)
        
        // Verificar que la fecha sea válida
        if (isNaN(fecha.getTime())) {
          console.warn('Fecha inválida, usando fecha actual')
          fecha = new Date()
        }
      } catch (error) {
        console.warn('Error al parsear fecha:', error)
        fecha = new Date()
      }
      
      // Buscar el anfitrión por nombre para obtener su ID
      const anfitrionEncontrado = anfitriones.find(a => a.nombre === concurso.nombreAnfitrion)
      
      setFormData({
        nombreConcurso: concurso.concNombre,
        fecha: fecha,
        usuaId: anfitrionEncontrado?.id || 0,
        nombreAnfitrion: concurso.nombreAnfitrion,
        wcNecesarias: concurso.concWc,
        imagen: null,
        imagenes: [],
        estado: concurso.estado === "Activo"
      })
      
      // Cargar la imagen actual del concurso
      if (concurso.concImagen) {
        setImagenActual(concurso.concImagen)
        console.log('🖼️ Imagen actual cargada:', concurso.concImagen)
      }
    }
  }, [concurso, anfitriones])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const updateData = {
      concId: concurso.concId,
      concNombre: formData.nombreConcurso,
      concFechaPropuesta: format(formData.fecha, "yyyy-MM-dd HH:mm:ss"), // Formato que espera el backend
      usuaId: formData.usuaId,
      concWc: formData.wcNecesarias,
      concImagen: nuevaImagen ? "nueva_imagen" : concurso.concImagen, // Usar nueva imagen o mantener la actual
      concIsActive: formData.estado,
      nuevaImagen: nuevaImagen // Incluir la nueva imagen si existe
    }
    
    console.log('📝 Datos para actualizar concurso:', updateData)
    console.log('📸 Nueva imagen file:', nuevaImagen)
    console.log('🖼️ Imagen actual:', concurso.concImagen)
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
                  {/* Nombre del concurso y Fecha - En la misma fila */}
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Nombre del concurso
                      </label>
                      <Input
                        type="text"
                        placeholder="Nombre"
                        value={formData.nombreConcurso}
                        onChange={(e) => setFormData(prev => ({ ...prev, nombreConcurso: e.target.value }))}
                        className="w-[230px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                        style={{ boxShadow: '0 4px 20px rgba(219,8,110,0.08)' }}
                        required
                      />
                    </div>
                    
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
                  </div>

                  {/* Nombre anfitrión y WC necesarias - En la misma fila */}
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Nombre concurso
                      </label>
                      <Select 
                        value={formData.usuaId.toString()} 
                        onValueChange={handleAnfitrionChange}
                        disabled={loadingAnfitriones}
                      >
                        <SelectTrigger className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_20px_rgba(219,8,110,0.08)] border-none">
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
                      onImageChange={(file, previewUrl) => {
                        if (file) {
                          setNuevaImagen(file)
                          setFormData(prev => ({ 
                            ...prev, 
                            imagen: file,
                            imagenes: [...prev.imagenes, file]
                          }))
                          console.log('📸 Nueva imagen seleccionada:', file.name)
                        } else {
                          setNuevaImagen(null)
                          setFormData(prev => ({
                            ...prev,
                            imagen: null,
                            imagenes: []
                          }))
                          console.log('🗑️ Imagen eliminada')
                        }
                      }}
                      existingImageUrl={imagenActual ? (imagenActual.startsWith('/') ? `http://localhost:8080${imagenActual}` : imagenActual) : undefined}
                      onPreviewOpen={() => setShowImagePreview(true)} // Mostrar preview
                      onPreviewClose={() => setShowImagePreview(false)} // Ocultar preview
                      className="mb-0"
                    />
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
                      console.error('Error al cargar nueva imagen:', nuevaImagen.name);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : imagenActual ? (
                  <img
                    src={imagenActual.startsWith('/') ? `http://localhost:8080${imagenActual}` : imagenActual}
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
                      console.error('Error al cargar imagen actual:', imagenActual);
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
