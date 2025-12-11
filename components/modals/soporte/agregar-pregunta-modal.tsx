"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { preguntasFrecuentesAPI, PreguntaCreateDTO, PreguntaResponse } from "@/lib/api"
import { toast } from "sonner"

interface AgregarPreguntaModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (pregunta: PreguntaResponse) => void
}

export function AgregarPreguntaModal({ isOpen, onClose, onAdd }: AgregarPreguntaModalProps) {
  const [formData, setFormData] = useState({
    pregunta: "",
    respuesta: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setFormData({ pregunta: "", respuesta: "" })
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async () => {
    if (!formData.pregunta.trim()) {
      toast.error("La pregunta es obligatoria")
      return
    }
    if (!formData.respuesta.trim()) {
      toast.error("La respuesta es obligatoria")
      return
    }

    setIsSubmitting(true)
    try {
      const preguntaData: PreguntaCreateDTO = {
        pregPregunta: formData.pregunta.trim(),
        pregRespuesta: formData.respuesta.trim()
      }

      const response = await preguntasFrecuentesAPI.createFromDTO(preguntaData)

      if (response.pfreeId) {
        toast.success("Pregunta creada exitosamente")
        setFormData({ pregunta: "", respuesta: "" })
        onClose()
        // Llamar a onAdd después de cerrar el modal para actualizar la tabla
        setTimeout(() => {
          onAdd(response)
        }, 100)
      } else {
        toast.error(response.mensaje || "Error al crear la pregunta")
      }
    } catch (error) {
      console.error("Error creating pregunta:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al crear la pregunta. Por favor, intenta nuevamente."
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFormData({ pregunta: "", respuesta: "" })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#FBFBFB] rounded-xl w-[95vw] max-w-[584px] h-[60vh] max-h-[700px] mx-4 flex flex-col overflow-hidden">
        {/* Header */}
        <div 
          className="flex justify-between items-start px-[30px] pt-[30px] pb-6 flex-shrink-0 bg-{#FEFEFE}"
          style={{ 
            boxShadow: '0 4px 10px rgba(219, 8, 110, 0.08)'
          }}
        >
          <div className="flex-1">
            <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Agregar pregunta</h2>
            <div className="text-[12px] text-gray-600 mt-4">
              <span className="text-[#9C82EF]">Soporte</span> &gt;{" "}
              <span className="text-[#9C82EF]">Preguntas frecuentes</span> &gt;{" "}
              <span 
                className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                Agregar pregunta
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
            <div className="space-y-4">
              {/* Datos de la pregunta */}
              <div className="space-y-6 mb-12">
                <h3 className="text-base font-medium text-gray-800 mb-4">Datos de la pregunta</h3>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Pregunta</label>
                  <Input
                    type="text"
                    placeholder="Ingresa una pregunta"
                    value={formData.pregunta}
                    onChange={(e) => setFormData(prev => ({ ...prev, pregunta: e.target.value }))}
                    className="w-full sm:w-[484px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                  />
                </div>

                {/* Respuesta */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Respuesta</label>
                  <Textarea
                    placeholder="Ingresa una respuesta"
                    value={formData.respuesta}
                    onChange={(e) => setFormData(prev => ({ ...prev, respuesta: e.target.value }))}
                    className="w-full sm:w-[484px] h-[95px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm resize-none"
                    style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
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
            disabled={isSubmitting}
            className="w-[138px] h-[40px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Guardando..." : "Agregar"}
          </GradientButton>
        </div>
      </div>
    </div>
  )
}
