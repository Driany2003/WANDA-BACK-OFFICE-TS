"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { parametrosAPI, ParametroCreateDTO, ParametroResponse } from "@/lib/api"
import { toast } from "sonner"

interface AgregarParametroModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: ParametroResponse) => void
}

export function AgregarParametroModal({ isOpen, onClose, onSave }: AgregarParametroModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    valor: "",
    estado: true // Por defecto Activo según el backend
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setFormData({ nombre: "", descripcion: "", valor: "", estado: true })
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateForm = (): boolean => {
    if (!formData.nombre.trim()) {
      toast.error("El nombre es obligatorio")
      return false
    }
    if (!formData.valor.trim()) {
      toast.error("El valor es obligatorio")
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
      const parametroData: ParametroCreateDTO = {
        paraNombre: formData.nombre.trim(),
        paraDescripcion: formData.descripcion.trim() || undefined,
        paraValor: formData.valor.trim(),
        paraEstado: formData.estado ? 'Activo' : 'Inactivo'
      }

      const response = await parametrosAPI.createFromDTO(parametroData)

      if (response.paraId) {
        toast.success("Parámetro creado exitosamente")
        onSave(response)
        onClose()
      } else {
        toast.error(response.mensaje || "Error al crear el parámetro")
      }
    } catch (error) {
      console.error("Error creating parámetro:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al crear el parámetro. Por favor, intenta nuevamente."
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#FBFBFB] rounded-xl w-[684px] h-[700px] mx-4 flex flex-col overflow-hidden">
        {/* Header */}
        <div
          className="flex justify-between items-start px-[30px] pt-[30px] pb-6 flex-shrink-0 bg-[#FEFEFE]"
          style={{
            boxShadow: '0 4px 10px rgba(219, 8, 110, 0.08)'
          }}
        >
          <div className="flex-1">
            <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Agregar parámetro</h2>
            <div className="text-[12px] text-gray-600 mt-4">
              <span className="text-[#9C82EF]">Configuraciones</span> &gt;{" "}
              <span className="text-[#9C82EF]">Parámetros</span> &gt;{" "}
              <span
                className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                Agregar parámetro
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
        <div className="flex-1 flex flex-col px-[30px] py-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            {/* Form content div */}
            <div className="w-[484px] h-[453px] mx-auto flex flex-col justify-start space-y-3 pt-8">
              {/* Datos del parámetro */}
              <div className="space-y-3">
                <h3 className="text-base font-medium text-[#1C1C1C]">Datos del parámetro</h3>
                
                {/* Nombre */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[#1C1C1C]">Nombre</label>
                  <Input
                    type="text"
                    placeholder="Ingresa un nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    className="w-[484px] h-[40px] text-sm font-medium placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{
                      boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)'
                    }}
                  />
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[#1C1C1C]">Descripción</label>
                  <Textarea
                    placeholder="Ingresa una descripción"
                    value={formData.descripcion}
                    onChange={(e) => handleInputChange("descripcion", e.target.value)}
                    className="w-[484px] h-[95px] text-sm font-medium resize-none placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{
                      boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)'
                    }}
                  />
                </div>

                {/* Valor */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[#1C1C1C]">Valor</label>
                  <Input
                    type="text"
                    placeholder="Ingresa un valor"
                    value={formData.valor}
                    onChange={(e) => handleInputChange("valor", e.target.value)}
                    className="w-[484px] h-[40px] text-sm font-medium placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{
                      boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)'
                    }}
                  />
                </div>

                {/* Estado */}
                <div className="flex items-center justify-between pt-4">
                  <label className="text-xs font-medium text-[#1C1C1C]">Estado</label>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.estado}
                      onCheckedChange={(checked) => handleInputChange("estado", checked)}
                      className="data-[state=checked]:bg-[#A13592]"
                    />
                    <span className="text-sm text-gray-600">
                      {formData.estado ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-[10px] justify-center mt-8">
              <GradientOutlineButton
                onClick={onClose}
                className="w-[138px] h-[40px] text-purple-600 border-purple-300 hover:bg-purple-50"
              >
                Cancelar
              </GradientOutlineButton>
              <GradientButton
                type="submit"
                disabled={isSubmitting}
                className="w-[138px] h-[40px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Guardando..." : "Agregar"}
              </GradientButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
