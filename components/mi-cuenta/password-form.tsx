"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { NotificationToast } from "@/components/ui/notification-toast"

export function PasswordForm() {
  const [showToast, setShowToast] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [errors, setErrors] = useState<{current?: string, new?: string, match?: string}>({})

  const handleChangePassword = () => {
    // Limpiar errores anteriores
    setErrors({})
    
    // Validar que se haya ingresado contraseña actual
    if (!currentPassword.trim()) {
      setErrors(prev => ({ ...prev, current: "Debes ingresar tu contraseña actual" }))
      return
    }
    
    // Validar que se haya ingresado nueva contraseña
    if (!newPassword.trim()) {
      setErrors(prev => ({ ...prev, new: "Debes ingresar una nueva contraseña" }))
      return
    }
    
    // Validar que las contraseñas sean diferentes
    if (currentPassword === newPassword) {
      setErrors(prev => ({ ...prev, match: "La nueva contraseña debe ser diferente a la actual" }))
      return
    }
    
    // Si todo está bien, mostrar toast de éxito
    setShowToast(true)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-[20px] text-[#333333] font-medium text-gray-900">Cambiar contraseña</h2>
      <p className="text-[777777] font-medium text-[16px]">
        Una contraseña segura contribuye a evitar el acceso no autorizado a tu cuenta en la plataforma.
      </p>

      {/* Contraseña actual */}
      <div>
        <Label htmlFor="current-password" className="text-[14px] text-[#777777] font-medium pb-2">Contraseña</Label>
        <div className="relative mb-4">
          <Input
            id="current-password"
            type="password"
            placeholder="********"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={`w-[484px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium placeholder:text-[#777777] placeholder:text-sm placeholder:font-semibold ${errors.current ? 'border-red-500' : ''}`}
          />
          {errors.current && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.current}
            </p>
          )}
        </div>
      </div>

      <a href="#" className="text-[#3A05DF] underline text-sm text-[14px] font-semibold mt-4">
        Olvidé mi contraseña
      </a>     
      
       {/* Nueva contraseña */}
      <div>
        <Label htmlFor="new-password" className="text-[14px] text-[#777777] font-medium mb-2">Nueva contraseña</Label>
        <div className="relative">
          <Input
            id="new-password"
            type="password"
            placeholder="********"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-[484px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium placeholder:text-[#777777] placeholder:text-sm placeholder:font-semibold ${errors.new ? 'border-red-500' : ''}`}
          />
          {errors.new && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.new}
            </p>
          )}
        </div>
        {errors.match && (
          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.match}
          </p>
        )}
        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          La contraseña debe contener al menos {`{8}`} caracteres, {`{1}`} letra mayúscula, {`{1}`} número y {`{1}`}
          carácter especial
        </p>
      </div>

      {/* Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox id="auto-change" />
        <Label htmlFor="auto-change" className="text-sm text-gray-700">
          Solicitar automáticamente el cambio de contraseña cada 120 días
        </Label>
      </div>

      <GradientButton className="px-8 py-2" onClick={handleChangePassword}>Cambiar</GradientButton>
      
      <NotificationToast
        title="Contraseña actualizada"
        message="Tu contraseña ha sido cambiada exitosamente."
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  )
}
