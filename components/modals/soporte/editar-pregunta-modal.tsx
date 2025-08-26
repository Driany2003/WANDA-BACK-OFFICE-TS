"use client"

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GradientButton } from '@/components/ui/gradient-button'
import { GradientOutlineButton } from '@/components/ui/gradient-outline-button'
import { Pregunta } from '@/types/soporte'

interface EditarPreguntaModalProps {
  isOpen: boolean
  onClose: () => void
  pregunta: Pregunta | null
  onSave: (pregunta: Pregunta) => void
}

export function EditarPreguntaModal({
  isOpen,
  onClose,
  pregunta,
  onSave
}: EditarPreguntaModalProps) {
  const [formData, setFormData] = useState({
    pregunta: '',
    respuesta: ''
  })

  useEffect(() => {
    if (pregunta) {
      setFormData({
        pregunta: pregunta.pregunta,
        respuesta: pregunta.respuesta
      })
    }
  }, [pregunta])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pregunta) {
      onSave({
        ...pregunta,
        ...formData
      })
      onClose()
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!isOpen || !pregunta) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#FBFBFB] rounded-xl w-[95vw] max-w-[584px] h-[60vh] max-h-[700px] mx-4 flex flex-col overflow-hidden">
        {/* Header */}
        <div 
          className="flex justify-between items-start px-4 sm:px-[30px] pt-4 sm:pt-[30px] pb-4 sm:pb-6 flex-shrink-0 bg-[#FEFEFE]"
          style={{ 
            boxShadow: '0 4px 10px rgba(219, 8, 110, 0.08)'
          }}
        >
          <div className="flex-1">
            <h2 className="text-lg sm:text-[24px] font-medium text-[#1C1C1C] mb-2">Editar pregunta</h2>
            <div className="text-[10px] sm:text-[12px] text-gray-600 mt-2 sm:mt-4">
              <span className="text-[#9C82EF]">Soporte</span> &gt;{" "}
              <span className="text-[#9C82EF]">Preguntas frecuentes</span> &gt;{" "}
              <span 
                className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                Editar pregunta
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
              {/* Datos de la pregunta */}
              <div className="space-y-6">
                <h3 className="text-base font-medium text-gray-800 mb-4">Datos de la pregunta</h3>
                
                {/* Pregunta */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Pregunta</label>
                  <Input
                    type="text"
                    placeholder="Ingresa una pregunta"
                    value={formData.pregunta}
                    onChange={(e) => handleInputChange('pregunta', e.target.value)}
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
                    onChange={(e) => handleInputChange('respuesta', e.target.value)}
                    className="w-full sm:w-[484px] h-[95px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm resize-none"
                    style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                  />
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
            onClick={() => handleSubmit({} as React.FormEvent)}
            className="w-[138px] h-[40px]"
          >
            Guardar
          </GradientButton>
        </div>
      </div>
    </div>
  )
}
