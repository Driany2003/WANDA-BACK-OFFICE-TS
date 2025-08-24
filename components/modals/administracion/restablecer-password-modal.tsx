"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { AlertIcon } from "@/components/icons/adminitracion-icon"
import { NotificationToast } from "@/components/ui/notification-toast"

interface RestablecerPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  usuario: {
    id: string
    nombre: string
    email: string
  }
  onSave: (data: {
    id: string
    email: string
  }) => void
}

export function RestablecerPasswordModal({ isOpen, onClose, usuario, onSave }: RestablecerPasswordModalProps) {
  const [formData, setFormData] = useState({
    email: usuario?.email || ""
  })

  // Estados para el toast
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: "", message: "" })
  const [toastType, setToastType] = useState<"success" | "error">("success")

  // Limpiar formData cuando se abra el modal
  useEffect(() => {
    if (isOpen) {
      setFormData({
        email: usuario?.email || ""
      })
    }
  }, [isOpen, usuario?.email])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar que el email esté presente
    if (!formData.email) {
      showToastMessage("error", "Error de validación", "Por favor, ingresa el correo electrónico")
      return
    }
    
    // Enviar el link de restablecimiento
    onSave({
      id: usuario.id,
      email: formData.email
    })
    
    // Mostrar toast de éxito
    showToastMessage("success", "Link enviado", "Se ha enviado el link de restablecimiento al correo electrónico")
    
    // Cerrar el modal después de un breve delay
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#FBFBFB] rounded-xl w-[570px] h-[500px] mx-4 flex flex-col overflow-hidden">
          {/* Header */}
          <div 
            className="flex justify-between items-start px-[30px] pt-[30px] pb-6 flex-shrink-0 bg-{#FEFEFE}"
            style={{ 
              boxShadow: '0 4px 10px rgba(219, 8, 110, 0.08)'
            }}
          >
            <div className="flex-1">
              <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Restablecer contraseña</h2>
              <div className="text-[12px] text-gray-600 mt-4">
                <span className="text-[#9C82EF]">Administración</span> &gt;{" "}
                <span className="text-[#9C82EF]">Usuarios</span> &gt;{" "}
                <span 
                  className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                  Restablecer contraseña
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
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-[20px] mt-4">
            <div 
              className="flex-1 rounded-lg p-6 mb-6 overflow-y-auto">
              <div className="rounded-lg p-1">
                <h3 className="text-[16px] font-medium text-[#1C1C1C] mb-6 text-start">
                  Correo electrónico del usuario
                </h3>
                
                <div className="space-y-6 mt-4">
                  {/* Campo de email */}
                  <div>
                    <label className="block text-[12px] font-medium text-[#777777] mb-2">
                      Correo electrónico
                    </label>
                    <Input
                      type="email"
                      placeholder="Mar@admin.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px]"
                    />
                  </div>

                  {/* Mensaje informativo */}
                  <div className="flex items-start gap-1 text-red-500">
                    <AlertIcon />
                    <p className="text-[12px] font-medium text-[#FF4444]">
                      Se enviará un link al correo electrónico del usuario para reestablecer la contraseña
                    </p>
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
                Enviar
              </GradientButton>
            </div>
          </form>
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
