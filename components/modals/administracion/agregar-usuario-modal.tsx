"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { Switch } from "@/components/ui/switch"
import { NotificationToast } from "@/components/ui/notification-toast"
import { usuarioApi } from "@/lib/api"

interface AgregarUsuarioModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
}

interface ValidationErrors {
  nombre?: string
  apellido?: string
  correo?: string
  authUsername?: string
  authPassword?: string
  validarAuthPassword?: string
  authRol?: string
}

export function AgregarUsuarioModal({ isOpen, onClose, onSave }: AgregarUsuarioModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    authUsername: "",
    authPassword: "",
    validarAuthPassword: "",
    authRol: "",
    isActive: true
  })

  // Estados para validaciones y toast
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: "", message: "" })
  const [toastType, setToastType] = useState<"success" | "error">("success")
  const [isCreating, setIsCreating] = useState(false)

  // Limpiar formData cuando se abra el modal
  useEffect(() => {
    if (isOpen) {
      setFormData({
        nombre: "",
        apellido: "",
        correo: "",
        authUsername: "",
        authPassword: "",
        validarAuthPassword: "",
        authRol: "",
        isActive: true
      })
      setValidationErrors({})
    }
  }, [isOpen])

  // Función para validar el formulario según el DTO
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {}

    // Validar nombre
    if (!formData.nombre.trim()) {
      errors.nombre = "El nombre es obligatorio"
    } else if (formData.nombre.length > 255) {
      errors.nombre = "El nombre no puede exceder 255 caracteres"
    }

    // Validar apellido
    if (!formData.apellido.trim()) {
      errors.apellido = "El apellido es obligatorio"
    } else if (formData.apellido.length > 255) {
      errors.apellido = "El apellido no puede exceder 255 caracteres"
    }

    // Validar correo
    if (!formData.correo.trim()) {
      errors.correo = "El correo electrónico es obligatorio"
    } else if (formData.correo.length > 255) {
      errors.correo = "El correo no puede exceder 255 caracteres"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.correo)) {
        errors.correo = "El formato del correo electrónico no es válido"
      }
    }

    // Validar nombre de usuario
    if (!formData.authUsername.trim()) {
      errors.authUsername = "El nombre de usuario es obligatorio"
    } else if (formData.authUsername.length < 3) {
      errors.authUsername = "El nombre de usuario debe tener al menos 3 caracteres"
    } else if (formData.authUsername.length > 50) {
      errors.authUsername = "El nombre de usuario no puede exceder 50 caracteres"
    }

    // Validar contraseña
    if (!formData.authPassword.trim()) {
      errors.authPassword = "La contraseña es obligatoria"
    } else if (formData.authPassword.length < 6) {
      errors.authPassword = "La contraseña debe tener al menos 6 caracteres"
    }

    // Validar confirmación de contraseña
    if (!formData.validarAuthPassword.trim()) {
      errors.validarAuthPassword = "La validación de contraseña es obligatoria"
    } else if (formData.authPassword !== formData.validarAuthPassword) {
      errors.validarAuthPassword = "Las contraseñas no coinciden"
    }

    // Validar rol
    if (!formData.authRol.trim()) {
      errors.authRol = "El rol es obligatorio"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar formulario
    if (!validateForm()) {
      showToastMessage("error", "Error de validación", "Por favor, corrige los errores en el formulario")
      return
    }
    
    try {
      setIsCreating(true)
      
      // Preparar datos del usuario para el backend
      const userData = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        authUsername: formData.authUsername,
        authPassword: formData.authPassword,
        validarAuthPassword: formData.validarAuthPassword,
        authRol: formData.authRol,
        isActive: formData.isActive
      }
      
      // Crear usuario
      const result = await usuarioApi.create(userData)
      
      // Mostrar toast de éxito
      showToastMessage("success", "Usuario agregado", "El usuario se ha agregado exitosamente")
      
      // Cerrar el modal después de un breve delay
      setTimeout(() => {
        onSave(result)
        onClose()
      }, 1000)
      
    } catch (error) {
      console.error("Error al crear usuario:", error)
      showToastMessage("error", "Error", "Error al crear el usuario")
    } finally {
      setIsCreating(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Limpiar error de validación cuando el usuario empiece a escribir
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }))
    }
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
                    <div className="flex-1">
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Nombre(s) *
                      </label>
                      <Input
                        type="text"
                        placeholder="María"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange("nombre", e.target.value)}
                        className={`w-full h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px] ${
                          validationErrors.nombre ? 'border-red-500' : ''
                        }`}
                      />
                      {validationErrors.nombre && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.nombre}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Apellido(s) *
                      </label>
                      <Input
                        type="text"
                        placeholder="Ramírez"
                        value={formData.apellido}
                        onChange={(e) => handleInputChange("apellido", e.target.value)}
                        className={`w-full h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px] ${
                          validationErrors.apellido ? 'border-red-500' : ''
                        }`}
                      />
                      {validationErrors.apellido && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.apellido}</p>
                      )}
                    </div>
                  </div>

                  {/* Email y Username - En la misma fila */}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Correo electrónico *
                      </label>
                      <Input
                        type="email"
                        placeholder="Mar@admin.com"
                        value={formData.correo}
                        onChange={(e) => handleInputChange("correo", e.target.value)}
                        className={`w-full h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px] ${
                          validationErrors.correo ? 'border-red-500' : ''
                        }`}
                      />
                      {validationErrors.correo && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.correo}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Nombre de usuario *
                      </label>
                      <Input
                        type="text"
                        placeholder="USER_ADMIN1"
                        value={formData.authUsername}
                        onChange={(e) => handleInputChange("authUsername", e.target.value)}
                        className={`w-full h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px] ${
                          validationErrors.authUsername ? 'border-red-500' : ''
                        }`}
                      />
                      {validationErrors.authUsername && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.authUsername}</p>
                      )}
                    </div>
                  </div>

                  {/* Contraseña y Validar contraseña - En la misma fila */}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Contraseña *
                      </label>
                      <Input
                        type="password"
                        placeholder="**********"
                        value={formData.authPassword}
                        onChange={(e) => handleInputChange("authPassword", e.target.value)}
                        className={`w-full h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px] ${
                          validationErrors.authPassword ? 'border-red-500' : ''
                        }`}
                      />
                      {validationErrors.authPassword && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.authPassword}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Validar contraseña *
                      </label>
                      <Input
                        type="password"
                        placeholder="**********"
                        value={formData.validarAuthPassword}
                        onChange={(e) => handleInputChange("validarAuthPassword", e.target.value)}
                        className={`w-full h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px] ${
                          validationErrors.validarAuthPassword ? 'border-red-500' : ''
                        }`}
                      />
                      {validationErrors.validarAuthPassword && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.validarAuthPassword}</p>
                      )}
                    </div>
                  </div>

                  {/* Rol - Ancho completo */}
                  <div>
                    <label className="block text-[12px] font-medium text-[#777777] mb-2">
                      Rol *
                    </label>
                    <Select value={formData.authRol} onValueChange={(value) => handleInputChange("authRol", value)}>
                      <SelectTrigger className={`w-full h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] border-none ${
                        validationErrors.authRol ? 'border-red-500' : ''
                      }`}>
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Administrador">Administrador</SelectItem>
                        <SelectItem value="Trabajador">Trabajador</SelectItem>
                        <SelectItem value="Anfitrion">Anfitrión</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.authRol && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.authRol}</p>
                    )}
                  </div>

                  {/* Estado - Debajo del rol */}
                  <div className="flex items-center justify-between h-[40px]">
                    <label className="text-[12px] font-medium text-[#777777]">
                      Estado
                    </label>
                    <div className="flex items-center">
                      <Switch
                        checked={formData.isActive}
                        onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                        className="data-[state=checked]:bg-[#A13592]"
                      />
                      <span className="text-[14px] text-[#1C1C1C] ml-3">
                        {formData.isActive ? "Activo" : "Inactivo"}
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
                disabled={isCreating}
                className="w-[138px] h-[40px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? 'Creando...' : 'Agregar'}
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
