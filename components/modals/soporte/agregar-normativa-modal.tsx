"use client"

import { useState } from 'react'
import { X, Upload } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GradientButton } from '@/components/ui/gradient-button'
import { GradientOutlineButton } from '@/components/ui/gradient-outline-button'
import { CargarIcon } from '@/components/icons'
import { AlertIcon } from '@/components/icons/soporte-icons'
import { normativasAPI, NormativaResponse } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

interface AgregarNormativaModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (data: NormativaResponse) => void
}

export function AgregarNormativaModal({
  isOpen,
  onClose,
  onAdd
}: AgregarNormativaModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    archivo: undefined as File | undefined,
    link: '',
    enviarAlerta: false
  })

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    
    if (!formData.titulo.trim()) {
      toast({
        title: "Error",
        description: "El título es requerido",
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

    setIsLoading(true)

    try {
      const response = await normativasAPI.createFromDTO({
        normaTitulo: formData.titulo.trim(),
        normaDescripcion: formData.descripcion.trim(),
        normaLink: formData.link.trim(),
        normaArchivo: formData.archivo,
        normaEnviarAlerta: formData.enviarAlerta
      })

      onAdd(response)
      setFormData({ titulo: '', descripcion: '', archivo: undefined, link: '', enviarAlerta: false })
      onClose()
    } catch (error: any) {
      console.error("Error al crear normativa:", error)
      toast({
        title: "Error",
        description: error.message || "Error al crear la normativa",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        archivo: file
      }))
    }
  }

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      archivo: undefined
    }))
  }

  if (!isOpen) return null

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
            <h2 className="text-lg sm:text-[24px] font-medium text-[#1C1C1C] mb-2">Agregar normativa</h2>
            <div className="text-[10px] sm:text-[12px] text-gray-600 mt-2 sm:mt-4">
              <span className="text-[#9C82EF]">Soporte</span> &gt;{" "}
              <span className="text-[#9C82EF]">Normativa</span> &gt;{" "}
              <span 
                className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                Agregar normativa
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
              {/* Datos de la normativa */}
              <div className="space-y-6 mb-12">
                <h3 className="text-base font-medium text-gray-800 mb-4">Datos de la normativa</h3>
                
                {/* Título */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Título</label>
                    <Input
                      type="text"
                      placeholder="Ingresa un título"
                      value={formData.titulo}
                      onChange={(e) => handleInputChange('titulo', e.target.value)}
                      className="w-full sm:w-[484px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                      style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                      required
                    />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Descripción</label>
                    <Textarea
                      placeholder="Ingresa una descripción"
                      value={formData.descripcion}
                      onChange={(e) => handleInputChange('descripcion', e.target.value)}
                      className="w-full sm:w-[484px] h-[95px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm resize-none"
                      style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                      required
                    />
                </div>

                {/* Archivo */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Archivo</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
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
                    {/* Tag de archivo seleccionado */}
                    {formData.archivo && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div
                          className="bg-[#6137E5] text-white flex items-center gap-2"
                          style={{ 
                            width: '84px', 
                            height: '24px', 
                            borderRadius: '12px',
                            padding: '0 8px'
                          }}
                        >
                          <span className="text-[14px] font-medium truncate">Arch.01</span>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="text-white hover:text-gray-200 transition-colors text-[16px]"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Información de archivo */}
                  <div className="flex items-center gap-2 text-sm text-[#FF4444] mt-2">
                    <AlertIcon />
                    <span>Puedes cargar un archivo / JPG, PNG / Máx 40 MB</span>
                  </div>
                </div>

                {/* Link */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Link</label>
                    <Input
                      type="text"
                      placeholder="Ingresa un link"
                      value={formData.link}
                      onChange={(e) => handleInputChange('link', e.target.value)}
                      className="w-full sm:w-[484px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                      style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                      required
                    />
                </div>

                {/* Checkbox para alerta automática */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.enviarAlerta}
                    onChange={(e) => handleInputChange('enviarAlerta', e.target.checked)}
                    className="w-4 h-4 text-[#DB086E] bg-white border-[#DB086E] rounded focus:ring-[#DB086E] focus:ring-2"
                    style={{ accentColor: '#DB086E' }}
                  />
                  <label className="text-sm text-[#DB086E]">
                    Enviar alerta automáticamente al registrarse una actualización
                  </label>
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
            onClick={() => handleSubmit()}
            className="w-[138px] h-[40px]"
            disabled={isLoading}
          >
            {isLoading ? "Agregando..." : "Agregar"}
          </GradientButton>
        </div>
      </div>
    </div>
  )
}
