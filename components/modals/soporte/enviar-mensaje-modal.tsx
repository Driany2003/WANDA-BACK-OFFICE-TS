"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { NotificationToast } from "@/components/ui/notification-toast"

interface EnviarMensajeModalProps {
  isOpen: boolean
  onClose: () => void
  onSend: (data: MensajeData) => void
  reclamo?: {
    id: string
    usuario: string
    asunto: string
  }
}

interface MensajeData {
  para: string
  asunto: string
  mensaje: string
  link: string
}

export function EnviarMensajeModal({ isOpen, onClose, onSend, reclamo }: EnviarMensajeModalProps) {
  // Estados para el formulario
  const [formData, setFormData] = useState<MensajeData>({
    para: reclamo?.usuario || "",
    asunto: reclamo?.asunto ? `Re: ${reclamo.asunto}` : "",
    mensaje: `Estimado ${reclamo?.usuario || "usuario"},

Gracias por contactarnos. Lamentamos los inconvenientes que ha experimentado y agradecemos su paciencia mientras revisamos su caso.

Hemos recibido su reclamo y nuestro equipo está trabajando para resolverlo lo antes posible. Le mantendremos informado sobre cualquier actualización.

Si tiene alguna pregunta adicional, no dude en contactarnos.

Saludos cordiales,
Equipo de Soporte`,
    link: ""
  })

  // Estados para el toast
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: "", message: "" })
  const [toastType, setToastType] = useState<"success" | "error">("success")

  if (!isOpen) return null

  const handleInputChange = (field: keyof MensajeData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSend = () => {
    // Validación básica
    if (!formData.para || !formData.asunto || !formData.mensaje) {
      showToastMessage("error", "Campos requeridos", "Por favor completa todos los campos obligatorios")
      return
    }

    onSend(formData)
    
    // Mostrar toast de éxito
    showToastMessage("success", "Mensaje enviado", "El mensaje ha sido enviado exitosamente")
    
    // Limpiar formulario y cerrar modal
    setTimeout(() => {
      setFormData({
        para: "",
        asunto: "",
        mensaje: "",
        link: ""
      })
      onClose()
    }, 1500)
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

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
        <div className="bg-white rounded-xl w-[95vw] max-w-[684px] h-[75vh] max-h-[800px] mx-2 sm:mx-4 flex flex-col overflow-hidden">
          {/* Header */}
          <div 
            className="flex justify-between items-start px-4 sm:px-[30px] pt-4 sm:pt-[30px] pb-4 sm:pb-6 flex-shrink-0 bg-[#FEFEFE]"
            style={{ 
              boxShadow: '0 4px 10px rgba(219, 8, 110, 0.08)'
            }}
          >
            <div className="flex-1">
              <h2 className="text-lg sm:text-[24px] font-medium text-[#1C1C1C] mb-2">Enviar mensaje</h2>
              <div className="text-[10px] sm:text-[12px] text-gray-600 mt-2 sm:mt-4">
                <span className="text-[#9C82EF]">Soporte</span> &gt;{" "}
                <span className="text-[#9C82EF]">Reclamos</span> &gt;{" "}
                <span 
                  className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                  Enviar mensaje
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
                {/* Datos del mensaje */}
                <div className="space-y-5 mb-12">
                  <h3 className="text-base font-medium text-gray-800 mb-4">Datos del mensaje</h3>
                  
                  {/* Campo Para */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Para</label>
                    <Input
                      type="text"
                      placeholder="Ingresa un destinatario"
                      value={formData.para}
                      onChange={(e) => handleInputChange('para', e.target.value)}
                      className="w-full sm:w-[484px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                      style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                    />
                  </div>

                  {/* Campo Asunto */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Asunto</label>
                    <Input
                      type="text"
                      placeholder="Ingresa un asunto"
                      value={formData.asunto}
                      onChange={(e) => handleInputChange('asunto', e.target.value)}
                      className="w-full sm:w-[484px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                      style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                    />
                  </div>

                  {/* Campo Mensaje */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Mensaje</label>
                    <Textarea
                      placeholder="Ingresa una notificación"
                      value={formData.mensaje}
                      onChange={(e) => handleInputChange('mensaje', e.target.value)}
                      className="w-full sm:w-[484px] h-[95px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm resize-none"
                      style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                    />
                  </div>

                  {/* Campo Link */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Link</label>
                    <Input
                      type="url"
                      placeholder="Ingresa un link"
                      value={formData.link}
                      onChange={(e) => handleInputChange('link', e.target.value)}
                      className="w-full sm:w-[484px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                      style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-[10px] px-4 sm:px-[30px] pb-4 sm:pb-6 justify-center">
            <GradientOutlineButton
              onClick={onClose}
              className="w-[138px] h-[40px] text-purple-600 border-purple-300 hover:bg-purple-50"
            >
              Cancelar
            </GradientOutlineButton>
            <GradientButton
              type="button"
              onClick={handleSend}
              className="w-[138px] h-[40px]"
            >
              Enviar
            </GradientButton>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <NotificationToast
          type={toastType}
          title={toastMessage.title}
          message={toastMessage.message}
          onClose={() => setShowToast(false)}
          isVisible={showToast}
        />
      )}
    </>
  )
}
