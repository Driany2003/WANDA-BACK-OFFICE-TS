"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { parametrosAPI, ParametroResponse, ParametroUpdateDTO } from "@/lib/api"
import { NotificationToast } from "@/components/ui/notification-toast"

interface EditarParametroModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: ParametroResponse) => void
  parametro: ParametroResponse | null
}

export function EditarParametroModal({ isOpen, onClose, onSave, parametro }: EditarParametroModalProps) {
  const [formData, setFormData] = useState({
    paraNombre: "",
    paraDescripcion: "",
    paraValor: "",
    paraEstado: "Inactivo" as "Activo" | "Inactivo"
  })
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: "", message: "" })
  const [toastType, setToastType] = useState<"success" | "error">("success")

  useEffect(() => {
    if (parametro && isOpen) {
      setFormData({
        paraNombre: parametro.paraNombre || "",
        paraDescripcion: parametro.paraDescripcion || "",
        paraValor: parametro.paraValor || "",
        paraEstado: (parametro.paraEstado === "Activo" || parametro.paraEstado === "Activa") ? "Activo" : "Inactivo"
      })
    }
  }, [parametro, isOpen])

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        paraNombre: "",
        paraDescripcion: "",
        paraValor: "",
        paraEstado: "Inactivo"
      })
      setShowToast(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const showToastMessage = (type: "success" | "error", title: string, message: string) => {
    setToastType(type)
    setToastMessage({ title, message })
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 5000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!parametro?.paraId) {
      showToastMessage("error", "Error", "No se pudo identificar el parámetro a editar")
      return
    }

    // Validaciones
    if (!formData.paraNombre.trim()) {
      showToastMessage("error", "Error de validación", "El nombre es obligatorio")
      return
    }

    if (!formData.paraValor.trim()) {
      showToastMessage("error", "Error de validación", "El valor es obligatorio")
      return
    }

    try {
      setLoading(true)
      const updateData: ParametroUpdateDTO = {
        paraNombre: formData.paraNombre.trim(),
        paraValor: formData.paraValor.trim(),
        paraDescripcion: formData.paraDescripcion.trim() || undefined,
        paraEstado: formData.paraEstado
      }

      const result = await parametrosAPI.updateFromDTO(parametro.paraId, updateData)
      showToastMessage("success", "Parámetro actualizado", "El parámetro ha sido actualizado exitosamente")
      
      setTimeout(() => {
        onSave(result)
        onClose()
      }, 1000)
    } catch (error: any) {
      console.error('Error al actualizar parámetro:', error)
      showToastMessage("error", "Error al actualizar", error.message || "No se pudo actualizar el parámetro")
    } finally {
      setLoading(false)
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
            <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Editar parámetro</h2>
            <div className="text-[12px] text-gray-600 mt-4">
              <span className="text-[#9C82EF]">Configuraciones</span> &gt;{" "}
              <span className="text-[#9C82EF]">Parámetros</span> &gt;{" "}
              <span
                className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                Editar parámetro
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
                    value={formData.paraNombre}
                    onChange={(e) => handleInputChange("paraNombre", e.target.value)}
                    className="w-[484px] h-[40px] text-sm font-medium placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{
                      boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)'
                    }}
                    disabled={loading}
                  />
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[#1C1C1C]">Descripción</label>
                  <Textarea
                    placeholder="Ingresa una descripción"
                    value={formData.paraDescripcion}
                    onChange={(e) => handleInputChange("paraDescripcion", e.target.value)}
                    className="w-[484px] h-[95px] text-sm font-medium resize-none placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{
                      boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)'
                    }}
                    disabled={loading}
                  />
                </div>

                {/* Valor */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[#1C1C1C]">Valor</label>
                  <Input
                    type="text"
                    placeholder="Ingresa un valor"
                    value={formData.paraValor}
                    onChange={(e) => handleInputChange("paraValor", e.target.value)}
                    className="w-[484px] h-[40px] text-sm font-medium placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{
                      boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)'
                    }}
                    disabled={loading}
                  />
                </div>

                {/* Estado */}
                <div className="flex items-center justify-between pt-4">
                  <label className="text-xs font-medium text-[#1C1C1C]">Estado</label>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.paraEstado === "Activo"}
                      onCheckedChange={(checked) => handleInputChange("paraEstado", checked ? "Activo" : "Inactivo")}
                      className="data-[state=checked]:bg-[#A13592]"
                      disabled={loading}
                    />
                    <span className="text-sm text-gray-600">
                      {formData.paraEstado}
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
                disabled={loading}
              >
                Cancelar
              </GradientOutlineButton>
              <GradientButton
                type="submit"
                className="w-[138px] h-[40px]"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar"}
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
    </div>
  )
}
