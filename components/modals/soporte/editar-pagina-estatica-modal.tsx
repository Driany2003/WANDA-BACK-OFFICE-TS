"use client"

import { useState, useEffect } from 'react'
import { X, Upload, RefreshCw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GradientButton } from '@/components/ui/gradient-button'
import { GradientOutlineButton } from '@/components/ui/gradient-outline-button'
import { AlertIcon } from '@/components/icons/soporte-icons'
import { paginasEstaticasAPI, PaginaEstaticaResponse, PaginaEstaticaUpdateDTO } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

interface EditarPaginaEstaticaModalProps {
  isOpen: boolean
  onClose: () => void
  pagina: PaginaEstaticaResponse | null
  onSave: (pagina: PaginaEstaticaResponse) => void
}

export function EditarPaginaEstaticaModal({
  isOpen,
  onClose,
  pagina,
  onSave
}: EditarPaginaEstaticaModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    link: '',
    imagenes: [] as File[]
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [paginaCompleta, setPaginaCompleta] = useState<PaginaEstaticaResponse | null>(null)
  const [imagenesExistentes, setImagenesExistentes] = useState<string[]>([])

  // Cargar datos completos de la página cuando se abre el modal
  useEffect(() => {
    const fetchPaginaCompleta = async () => {
      if (pagina?.pestId && isOpen) {
        try {
          setIsLoadingData(true)
          // Cargar los datos actualizados
          const data = await paginasEstaticasAPI.getById(pagina.pestId)
          setPaginaCompleta(data)
          // Guardar las imágenes existentes
          setImagenesExistentes(data.pestImagenes || [])
          // Actualizar el formulario con los datos más recientes
          setFormData({
            nombre: data.pestNombre || '',
            descripcion: data.pestDescripcion || '',
            link: data.pestLink || '',
            imagenes: []
          })
        } catch (error) {
          console.error('Error al cargar página estática:', error)
          // Si falla, usar los datos que ya tenemos del listado
          setFormData({
            nombre: pagina.pestNombre || '',
            descripcion: pagina.pestDescripcion || '',
            link: pagina.pestLink || '',
            imagenes: []
          })
          setImagenesExistentes([])
        } finally {
          setIsLoadingData(false)
        }
      }
    }

    fetchPaginaCompleta()
  }, [pagina?.pestId, isOpen])

  useEffect(() => {
    if (!isOpen) {
      setFormData({ nombre: '', descripcion: '', link: '', imagenes: [] })
      setPaginaCompleta(null)
      setImagenesExistentes([])
      setIsLoadingData(false)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const paginaId = paginaCompleta?.pestId || pagina?.pestId
    
    if (!paginaId) {
      toast({
        title: "Error",
        description: "No se pudo identificar la página a editar",
        variant: "destructive",
      })
      return
    }

    if (!formData.nombre.trim()) {
      toast({
        title: "Error",
        description: "El nombre es requerido",
        variant: "destructive",
      })
      return
    }

    if (!formData.descripcion.trim()) {
      toast({
        title: "Error",
        description: "La descripción es requerida",
        variant: "destructive",
      })
      return
    }

    if (!formData.link.trim()) {
      toast({
        title: "Error",
        description: "El link es requerido",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      const updateData: PaginaEstaticaUpdateDTO = {
        pestNombre: formData.nombre.trim(),
        pestDescripcion: formData.descripcion.trim(),
        pestLink: formData.link.trim(),
        pestImagenes: formData.imagenes.length > 0 ? formData.imagenes : undefined
      }

      const result = await paginasEstaticasAPI.updateFromDTO(paginaId, updateData)
      onSave(result)
      onClose()
    } catch (error: any) {
      console.error('Error al actualizar página estática:', error)
      toast({
        title: "Error",
        description: error.message || "Error al actualizar la página estática",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        imagenes: [...prev.imagenes, ...files].slice(0, 4) // Máximo 4 imágenes
      }))
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index)
    }))
  }

  const removeImagenExistente = (index: number) => {
    setImagenesExistentes(prev => prev.filter((_, i) => i !== index))
  }

  const getImageName = (imageUrl: string): string => {
    // Extraer el nombre del archivo de la URL
    const parts = imageUrl.split('/')
    const fileName = parts[parts.length - 1]
    // Si tiene extensión, mostrar solo el nombre sin extensión (opcional)
    return fileName || 'Imagen'
  }

  const handleButtonSubmit = () => {
    const syntheticEvent = {
      preventDefault: () => {}
    } as React.FormEvent
    handleSubmit(syntheticEvent)
  }

  // No mostrar el modal hasta que los datos estén cargados
  if (!isOpen || !pagina || isLoadingData) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#FBFBFB] rounded-xl w-[95vw] max-w-[684px] h-[95vh] max-h-[800px] mx-2 sm:mx-4 flex flex-col overflow-hidden">
        {/* Header */}
        <div 
          className="flex justify-between items-start px-4 sm:px-[30px] pt-4 sm:pt-[30px] pb-4 sm:pb-6 flex-shrink-0 bg-[#FEFEFE]"
          style={{ 
            boxShadow: '0 4px 10px rgba(219, 8, 110, 0.08)'
          }}
        >
          <div className="flex-1">
            <h2 className="text-lg sm:text-[24px] font-medium text-[#1C1C1C] mb-2">Editar página estática</h2>
            <div className="text-[10px] sm:text-[12px] text-gray-600 mt-2 sm:mt-4">
              <span className="text-[#9C82EF]">Soporte</span> &gt;{" "}
              <span className="text-[#9C82EF]">Páginas estáticas</span> &gt;{" "}
              <span 
                className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                Editar página estática
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Datos de la página */}
              <div className="space-y-6 mb-12">
                <h3 className="text-base font-medium text-gray-800 mb-4">Datos de la página</h3>
                
                {/* Nombre */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Nombre</label>
                  <Input
                    type="text"
                    placeholder="Ingresa el nombre de la página"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className="w-full sm:w-[484px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Descripción</label>
                  <Textarea
                    placeholder="Ingresa la descripción de la página"
                    value={formData.descripcion}
                    onChange={(e) => handleInputChange('descripcion', e.target.value)}
                    className="w-full sm:w-[484px] h-[95px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm resize-none"
                    style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                  />
                </div>

                {/* Link */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Link</label>
                  <Input
                    type="text"
                    placeholder="Ingresa el link de la página"
                    value={formData.link}
                    onChange={(e) => handleInputChange('link', e.target.value)}
                    className="w-full sm:w-[484px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                  />
                </div>

                {/* Imagen */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Imagen</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        id="file-input"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('file-input')?.click()}
                        className="w-[484px] h-[40px] bg-white border border-gray-300 rounded-md text-left px-3 text-[#BBBBBB] font-semibold text-sm hover:border-gray-400 transition-colors cursor-pointer flex items-center justify-between"
                        style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                      >
                        <span className="text-[14px] font-semibold">Selecciona una imagen</span>
                        <Upload className="w-4 h-4 text-gray-400" />
                      </button>
                      {/* Tags de imágenes existentes */}
                      {imagenesExistentes.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {imagenesExistentes.map((imagenUrl, index) => (
                            <div
                              key={`existente-${index}`}
                              className="bg-[#6137E5] text-white flex items-center gap-2"
                              style={{ 
                                minWidth: '84px', 
                                height: '24px', 
                                borderRadius: '12px',
                                padding: '0 8px'
                              }}
                            >
                              <span className="text-[14px] font-medium truncate max-w-[60px]">
                                {getImageName(imagenUrl)}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeImagenExistente(index)}
                                className="text-white hover:text-gray-200 transition-colors text-[16px] flex-shrink-0"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Tags de imágenes nuevas seleccionadas */}
                      {formData.imagenes && formData.imagenes.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.imagenes.map((imagen, index) => (
                            <div
                              key={`nueva-${index}`}
                              className="bg-[#6137E5] text-white flex items-center gap-2"
                              style={{ 
                                minWidth: '84px', 
                                height: '24px', 
                                borderRadius: '12px',
                                padding: '0 8px'
                              }}
                            >
                              <span className="text-[14px] font-medium truncate max-w-[60px]">
                                {imagen.name || `Img.${String(index + 1).padStart(2, '0')}`}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="text-white hover:text-gray-200 transition-colors text-[16px] flex-shrink-0"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Información de imágenes */}
                  <div className="flex items-center gap-2 text-sm text-[#FF4444]">
                    <AlertIcon />
                    <span>Puedes cargar un máximo de cuatro (4) imágenes / JPG, PNG / Máx 40 MB</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-[10px] px-[30px] pb-6 justify-center">
          <GradientOutlineButton
            onClick={onClose}
            className="w-[138px] h-[40px] text-purple-600 border-purple-300 hover:bg-purple-50"
          >
            Cancelar
          </GradientOutlineButton>
          <GradientButton
            type="button"
            onClick={handleButtonSubmit}
            className="w-[138px] h-[40px]"
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </GradientButton>
        </div>
      </div>
    </div>
  )
}
