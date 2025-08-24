"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { X } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { NotificationToast } from "@/components/ui/notification-toast"
import { AlertIcon } from "@/components/icons/adminitracion-icon"

interface EditarSuscriptorModalProps {
  isOpen: boolean
  onClose: () => void
  suscriptor: {
    id: string
    nombre: string
    usuarioTiktok: string
    celular: string
    estado: string
  }
  onSave: (data: any) => void
}

export function EditarSuscriptorModal({ isOpen, onClose, suscriptor, onSave }: EditarSuscriptorModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    usuarioTiktok: "",
    celular: "",
    estado: false
  })

  // Estados para el toast
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: "", message: "" })
  const [toastType, setToastType] = useState<"success" | "error">("success")

  // Limpiar formData cuando se abra el modal
  useEffect(() => {
    if (isOpen && suscriptor) {
      setFormData({
        nombre: suscriptor.nombre.split(' ')[0] || '',
        apellido: suscriptor.nombre.split(' ').slice(1).join(' ') || '',
        usuarioTiktok: suscriptor.usuarioTiktok,
        celular: suscriptor.celular,
        estado: suscriptor.estado === "Activo"
      })
    }
  }, [isOpen, suscriptor])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar que todos los campos estén completos
    if (!formData.nombre || !formData.apellido || !formData.usuarioTiktok || !formData.celular) {
      showToastMessage("error", "Error de validación", "Por favor, completa todos los campos obligatorios")
      return
    }
    
    // Enviar datos actualizados
    onSave({
      id: suscriptor.id,
      ...formData,
      estado: formData.estado ? "Activo" : "Inactivo"
    })
    
    // Mostrar toast de éxito
    showToastMessage("success", "Suscriptor actualizado", "El suscriptor se ha actualizado exitosamente")
    
    // Cerrar el modal después de un breve delay
    setTimeout(() => {
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

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#FBFBFB] rounded-xl w-[570px] h-[709px] mx-4 flex flex-col overflow-hidden">
          {/* Header */}
          <div 
            className="flex justify-between items-start px-[30px] pt-[30px] pb-6 flex-shrink-0 bg-{#FEFEFE}"
            style={{ 
              boxShadow: '0 4px 10px rgba(219, 8, 110, 0.08)'
            }}
          >
            <div className="flex-1">
              <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Editar suscriptor</h2>
              <div className="text-[12px] text-gray-600 mt-4">
                <span className="text-[#9C82EF]">Administración</span> &gt;{" "}
                <span className="text-[#9C82EF]">Suscriptores</span> &gt;{" "}
                <span 
                  className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                  Editar suscriptor temporal
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
                  Datos del suscriptor
                </h3>
                
                <div className="space-y-6 mt-4">
                  {/* Usuario TikTok y Nombre - En la misma fila */}
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Usuario TikTok
                      </label>
                      <Input
                        type="text"
                        placeholder="@ChuRo"
                        value={formData.usuarioTiktok}
                        onChange={(e) => handleInputChange('usuarioTiktok', e.target.value)}
                        className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Nombre
                      </label>
                      <Input
                        type="text"
                        placeholder="Chuy"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                        className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px]"
                      />
                    </div>
                  </div>

                  {/* Apellido y Celular - En la misma fila */}
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Apellido
                      </label>
                      <Input
                        type="text"
                        placeholder="Román"
                        value={formData.apellido || ""}
                        onChange={(e) => handleInputChange('apellido', e.target.value)}
                        className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#777777] mb-2">
                        Celular
                      </label>
                      <div className="flex gap-2">
                        <Select value="+51" onValueChange={(value) => console.log(value)}>
                          <SelectTrigger className="w-20 h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] border-none">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+51">+51</SelectItem>
                            <SelectItem value="+1">+1</SelectItem>
                            <SelectItem value="+34">+34</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="text"
                          placeholder="987 000 000"
                          value={formData.celular}
                          onChange={(e) => handleInputChange('celular', e.target.value)}
                          className="w-[150px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contraseña y Confirmar contraseña - En la misma fila */}
                  <div className="flex gap-4 ">
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Contraseña
                      </label>
                      <div className="relative">
                        <Input
                          type="password"
                          value="***********"
                          className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] pr-10"
                          placeholder="Ingresa la contraseña"
                          readOnly
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Confirmar contraseña
                      </label>
                      <div className="relative">
                        <Input
                          type="password"
                          value="***********"
                          className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] pr-10"
                          placeholder="Confirma la contraseña"
                          readOnly
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                                                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                         </svg>
                       </button>
                      </div>
                    </div>
                  </div>
                </div>
                 {/* Mensaje de advertencia */}
                 <div className="flex items-center gap-2 text-red-500 mt-4 mb-4 rounded-lg">
                    <AlertIcon />
                    <p className="text-[12px] text-red-600">
                      Se enviará una contraseña temporal al celular del usuario para ingresar al sistema
                    </p>
                  </div>

                  <div className="flex items-center justify-between h-[40px]">
                    <label className="text-[12px] font-medium text-[#777777]">
                      Estado
                    </label>
                    <div className="flex items-center">
                      <Switch
                        checked={formData.estado}
                        onCheckedChange={(checked) => handleInputChange("estado", checked)}
                        className="data-[state=checked]:bg-[#A13592]"
                      />
                      <span className="text-[14px] text-[#1C1C1C] ml-3">
                        {formData.estado ? "Activo" : "Inactivo"}
                      </span>
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
