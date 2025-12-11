"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { Switch } from "@/components/ui/switch"
import { NotificationToast } from "@/components/ui/notification-toast"
import { usuarioApi, UsuarioUpdateDTO, UsuarioResponseDTO } from "@/lib/api"

interface EditarUsuarioModalProps {
  isOpen: boolean
  onClose: () => void
  initialData: {
    id: string
    username: string
    nombre: string
    email: string
    authRol: string
    estado: string
  }
  onSave: (result: UsuarioResponseDTO) => void
}

export function EditarUsuarioModal({ isOpen, onClose, initialData, onSave }: EditarUsuarioModalProps) {
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    username: "",
    authRol: "",
    estado: false
  })

  // Estados para el toast
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: "", message: "" })
  const [toastType, setToastType] = useState<"success" | "error">("success")
  const [isUpdating, setIsUpdating] = useState(false)

  // Actualizar formData cuando cambie initialData
  useEffect(() => {
    if (initialData && isOpen) {
      // Separar nombre completo en nombre y apellido
      const nombreCompleto = (initialData.nombre || "").split(" ")
      const nombre = nombreCompleto[0] || ""
      const apellido = nombreCompleto.slice(1).join(" ") || ""

      setFormData({
        id: initialData.id || "",
        nombre: nombre,
        apellido: apellido,
        email: initialData.email || "",
        username: initialData.username || "",
        authRol: initialData.authRol || "",
        estado: initialData.estado === "Activo"
      })
    }
  }, [initialData, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar que todos los campos estén llenos
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.username || !formData.authRol) {
      showToastMessage("error", "Error de validación", "Por favor, completa todos los campos obligatorios")
      return
    }
    
    try {
      setIsUpdating(true)
      
      // Preparar datos para el backend
      const updateData: UsuarioUpdateDTO = {
        id: parseInt(formData.id),
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.email,
        authUsername: formData.username,
        authRol: formData.authRol,
        isActive: formData.estado
      }
      
      // Actualizar usuario en el backend
      const result = await usuarioApi.update(updateData)
      
      // Combinar el resultado de la API con los datos del formulario
      const completeResult = {
        ...result,
        id: result.id || parseInt(formData.id),
        nombre: result.nombre || formData.nombre,
        apellido: result.apellido || formData.apellido,
        correo: result.correo || formData.email,
        username: result.username || formData.username,
        authUsername: result.username || formData.username,
        authRol: result.authRol || formData.authRol,
        isActive: result.isActive !== undefined ? result.isActive : formData.estado
      }
      
      // Mostrar toast de éxito
      showToastMessage("success", "Usuario actualizado", "El usuario se ha actualizado exitosamente")
      
      // Pasar el resultado completo para evitar SELECT completo
      setTimeout(() => {
        onSave(completeResult)
        onClose()
      }, 1000)
    } catch (error) {
      console.error("Error al actualizar usuario:", error)
      showToastMessage("error", "Error", "Error al actualizar el usuario")
    } finally {
      setIsUpdating(false)
    }
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
        <div className="bg-[#FBFBFB] rounded-xl w-[570px] h-[639px] mx-4 flex flex-col overflow-hidden">
          {/* Header */}
          <div 
            className="flex justify-between items-start px-[30px] pt-[30px] pb-6 flex-shrink-0 bg-{#FEFEFE}"
            style={{ 
              boxShadow: '0 4px 10px rgba(219, 8, 110, 0.08)'
            }}
          >
            <div className="flex-1">
              <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Editar usuario</h2>
              <div className="text-[12px] text-gray-600 mt-4">
                <span className="text-[#9C82EF]">Administración</span> &gt;{" "}
                <span className="text-[#9C82EF]">Usuarios</span> &gt;{" "}
                <span 
                  className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                  Editar usuario
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

                  {/* Rol - Ancho completo */}
                  <div>
                    <label className="block text-[12px] font-medium text-[#777777] mb-2">
                      Rol
                    </label>
                    <Select 
                      key={formData.authRol} 
                      value={formData.authRol} 
                        onValueChange={(value) => handleInputChange("authRol", value)}
                    >
                      <SelectTrigger className="w-full h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] border-none">
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Administrador">Administrador</SelectItem>
                        <SelectItem value="Trabajador">Trabajador</SelectItem>
                        <SelectItem value="Anfitrion">Anfitrión</SelectItem>
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
                disabled={isUpdating}
                className="w-[138px] h-[40px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Guardando...' : 'Guardar'}
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
