"use client"

import { useState } from "react"
import { X, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { AlertIcon } from "@/components/icons/soporte-icons"

interface PaginaEstatica {
  nombre: string
  descripcion: string
  link: string
  imagenes: File[]
}

interface AgregarPaginaEstaticaModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (pagina: PaginaEstatica) => void
}

export const AgregarPaginaEstaticaModal = ({ 
  isOpen, 
  onClose, 
  onAdd 
}: AgregarPaginaEstaticaModalProps) => {
  const [formData, setFormData] = useState<PaginaEstatica>({
    nombre: "",
    descripcion: "",
    link: "",
    imagenes: []
  })

  const handleInputChange = (field: keyof PaginaEstatica, value: string | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setFormData(prev => ({ ...prev, imagenes: [...prev.imagenes, ...files] }))
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = () => {
    if (formData.nombre.trim() && formData.descripcion.trim() && formData.link.trim()) {
      onAdd(formData)
      setFormData({ nombre: "", descripcion: "", link: "", imagenes: [] })
      onClose()
    }
  }

  const handleCancel = () => {
    setFormData({ nombre: "", descripcion: "", link: "", imagenes: [] })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#FBFBFB] rounded-xl w-[95vw] max-w-[684px] h-[95vh] max-h-[800px] mx-4 flex flex-col overflow-hidden">
        <div className="flex justify-between items-start px-[30px] pt-[30px] pb-6 flex-shrink-0 bg-[#FEFEFE] shadow-lg">
          <div className="flex-1">
            <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Agregar página estática</h2>
            <div className="text-[12px] text-gray-600 mt-4">
              <span className="text-[#9C82EF]">Soporte</span> &gt;{" "}
              <span className="text-[#9C82EF]">Páginas estáticas</span> &gt;{" "}
              <span className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                Agregar página estática
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

        <div className="flex-1 overflow-y-auto px-4 sm:px-[30px] py-4 sm:py-3 flex items-center justify-center">
          <div className="w-full max-w-[484px]">
            <div className="space-y-4 mb-12">
              <div className="space-y-6">
                <h3 className="text-base font-medium text-gray-800 mb-4">Datos de la página estática</h3>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Nombre</label>
                  <Input
                    type="text"
                    placeholder="Ingresa un nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    className="w-full sm:w-[484px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Descripción</label>
                  <Textarea
                    placeholder="Ingresa una descripción"
                    value={formData.descripcion}
                    onChange={(e) => handleInputChange("descripcion", e.target.value)}
                    className="w-full sm:w-[484px] h-[95px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm resize-none"
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
                    className="w-full sm:w-[484px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                  />
                </div>

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
                                onClick={() => removeImage(index)}
                                className="text-white hover:text-gray-200 transition-colors text-[16px]"
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
            </div>
          </div>
        </div>

        <div className="flex gap-[10px] px-[30px] pb-6 justify-center">
          <GradientOutlineButton
            onClick={handleCancel}
            className="w-[138px] h-[40px] text-red-600 border-red-300 hover:bg-red-50"
          >
            Cancelar
          </GradientOutlineButton>
          <GradientButton
            type="button"
            onClick={handleSubmit}
            className="w-[138px] h-[40px]"
          >
            Agregar
          </GradientButton>
        </div>
      </div>
    </div>
  )
}
