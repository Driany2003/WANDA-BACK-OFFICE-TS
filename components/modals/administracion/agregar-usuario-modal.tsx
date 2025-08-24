"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { Switch } from "@/components/ui/switch"
import { NotificationToast } from "@/components/ui/notification-toast"

interface AgregarUsuarioModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: {
    nombre: string
    apellido: string
    email: string
    username: string
    password: string
    confirmPassword: string
    rol: string
    estado: boolean
  }) => void
}

export function AgregarUsuarioModal({ isOpen, onClose, onSave }: AgregarUsuarioModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    rol: "",
    estado: true
  })

  // Estados para el toast
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: "", message: "" })
  const [toastType, setToastType] = useState<"success" | "error">("success")

  // Limpiar formData cuando se abra el modal
  useEffect(() => {
    if (isOpen) {
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        rol: "",
        estado: true
      })
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar que todos los campos estén llenos
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.username || !formData.password || !formData.confirmPassword || !formData.rol) {
      showToastMessage("error", "Error de validación", "Por favor, completa todos los campos obligatorios")
      return
    }

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      showToastMessage("error", "Error de validación", "Las contraseñas no coinciden")
      return
    }
    
    // Guardar los datos
    onSave(formData)
    
    // Mostrar toast de éxito
    showToastMessage("success", "Usuario agregado", "El usuario se ha agregado exitosamente")
    
    // Cerrar el modal después de un breve delay
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
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
        <div className="bg-[#FBFBFB] rounded-xl w-[570px] h-[720px] mx-4 flex flex-col overflow-hidden">
          {/* Header */}
          <div 
            className="flex justify-between items-start px-[30px] pt-[30px] pb-6 flex-shrink-0 bg-{#FEFEFE}"
            style={{ 
              boxShadow: '0 4px 10px rgba(219, 8, 110, 0.08)'
            }}
          >
            <div className="flex-1">
              <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Agregar usuario</h2>
              <div className="text-[12px] text-gray-600 mt-4">
                <span className="text-[#9C82EF]">Administración</span> &gt;{" "}
                <span className="text-[#9C82EF]">Usuarios</span> &gt;{" "}
                <span 
                  className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                  Agregar nuevo usuario
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
                  Datos del usuario
                </h3>
                
                <div className="space-y-6 mt-4">
                  {/* Nombre y Apellido - En la misma fila */}
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Nombre(s)
                      </label>
                      <Input
                        type="text"
                        placeholder="María"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange("nombre", e.target.value)}
                        className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Apellido(s)
                      </label>
                      <Input
                        type="text"
                        placeholder="Ramírez"
                        value={formData.apellido}
                        onChange={(e) => handleInputChange("apellido", e.target.value)}
                        className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px]"
                      />
                    </div>
                  </div>

                  {/* Email y Username - En la misma fila */}
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Correo electrónico *
                      </label>
                      <Input
                        type="email"
                        placeholder="Mar@admin.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Nombre de usuario *
                      </label>
                      <Input
                        type="text"
                        placeholder="USER_ADMIN1"
                        value={formData.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px]"
                      />
                    </div>
                  </div>

                  {/* Contraseña y Validar contraseña - En la misma fila */}
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Contraseña *
                      </label>
                      <Input
                        type="password"
                        placeholder="**********"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Validar contraseña *
                      </label>
                      <Input
                        type="password"
                        placeholder="**********"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px]"
                      />
                    </div>
                  </div>

                  {/* Rol - Ancho completo */}
                  <div>
                    <label className="block text-[12px] font-medium text-[#777777] mb-2">
                      Rol
                    </label>
                    <Select value={formData.rol} onValueChange={(value) => handleInputChange("rol", value)}>
                      <SelectTrigger className="w-full h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] border-none">
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Administrador">Administrador</SelectItem>
                        <SelectItem value="Editor">Editor</SelectItem>
                        <SelectItem value="Usuario">Usuario</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Estado - Debajo del rol */}
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
                Agregar
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
