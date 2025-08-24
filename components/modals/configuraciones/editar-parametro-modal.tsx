"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"

interface Parametro {
  id: string
  nombre: string
  descripcion: string
  valor: string
  estado: string
  fechaCreacion: string
  fechaModificacion: string
}

interface EditarParametroModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: Parametro) => void
  parametro: Parametro | null
}

export function EditarParametroModal({ isOpen, onClose, onSave, parametro }: EditarParametroModalProps) {
  const [formData, setFormData] = useState<Parametro>({
    id: "",
    nombre: "",
    descripcion: "",
    valor: "",
    estado: "Inactivo",
    fechaCreacion: "",
    fechaModificacion: ""
  })

  useEffect(() => {
    if (parametro) {
      setFormData(parametro)
    }
  }, [parametro])

  if (!isOpen) return null

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
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
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    className="w-[484px] h-[40px] text-sm font-medium placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{
                      boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)'
                    }}
                  />
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[#1C1C1C]">Descripción</label>
                  <Textarea
                    placeholder="Ingresa una descripción"
                    value={formData.descripcion}
                    onChange={(e) => handleInputChange("descripcion", e.target.value)}
                    className="w-[484px] h-[95px] text-sm font-medium resize-none placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{
                      boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)'
                    }}
                  />
                </div>

                {/* Valor */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[#1C1C1C]">Valor</label>
                  <Input
                    type="text"
                    placeholder="Ingresa un valor"
                    value={formData.valor}
                    onChange={(e) => handleInputChange("valor", e.target.value)}
                    className="w-[484px] h-[40px] text-sm font-medium placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                    style={{
                      boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)'
                    }}
                  />
                </div>

                {/* Estado */}
                <div className="flex items-center justify-between pt-4">
                  <label className="text-xs font-medium text-[#1C1C1C]">Estado</label>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.estado === "Activo"}
                      onCheckedChange={(checked) => handleInputChange("estado", checked ? "Activo" : "Inactivo")}
                      className="data-[state=checked]:bg-[#A13592]"
                    />
                    <span className="text-sm text-gray-600">
                      {formData.estado}
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
    </div>
  )
}
