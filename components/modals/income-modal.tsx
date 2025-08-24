"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Calendar } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"

interface IncomeModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "add" | "edit"
  initialData?: {
    usuarioTiktok: string
    celular: string
    cantidadWC: string
    fecha: string
    estado: string
  }
  onSave: (data: {
    usuarioTiktok: string
    celular: string
    cantidadWC: string
    fecha: string
    estado: string
  }) => void
}

export function IncomeModal({ isOpen, onClose, mode, initialData, onSave }: IncomeModalProps) {
  const [formData, setFormData] = useState({
    usuarioTiktok: initialData?.usuarioTiktok || "",
    celular: initialData?.celular || "",
    cantidadWC: String(initialData?.cantidadWC || ""),
    fecha: initialData?.fecha || "",
    estado: initialData?.estado || ""
  })

  // Actualizar formData cuando cambie initialData (para modo edición)
  useEffect(() => {
    if (initialData) {
      const newFormData = {
        usuarioTiktok: initialData.usuarioTiktok || "",
        celular: initialData.celular || "",
        cantidadWC: String(initialData.cantidadWC || ""),
        fecha: initialData.fecha || "",
        estado: initialData.estado || ""
      }
      setFormData(newFormData)
    }
  }, [initialData])

  // Limpiar formData cuando se abra el modal en modo add
  useEffect(() => {
    if (isOpen && mode === "add") {
      setFormData({
        usuarioTiktok: "",
        celular: "",
        cantidadWC: "",
        fecha: "",
        estado: ""
      })
    }
  }, [isOpen, mode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar que todos los campos estén llenos
    if (!formData.usuarioTiktok || !formData.celular || !formData.cantidadWC || !formData.fecha || !formData.estado) {
      alert("Por favor, completa todos los campos")
      return
    }
    
    // Convertir la fecha de YYYY-MM-DD a DD/MM/YYYY antes de guardar
    const formattedData = {
      ...formData,
      fecha: convertDateFormat(formData.fecha)
    }
    
    // Guardar los datos
    onSave(formattedData)
    
    // Cerrar el modal inmediatamente
    onClose()
  }

  // Función para convertir fecha de YYYY-MM-DD a DD/MM/YYYY
  const convertDateFormat = (dateString: string) => {
    if (!dateString) return ""
    
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    
    return `${day}/${month}/${year}`
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  const isEditMode = mode === "edit"
  const title = isEditMode ? "Editar ingreso" : "Agregar ingreso"
  const breadcrumbCurrent = isEditMode ? "Editar ingreso" : "Nuevo ingreso"
  const buttonText = isEditMode ? "Guardar" : "Agregar"

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
              <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">{title}</h2>
              <div className="text-[12px] text-gray-600 mt-4">
                <span className="text-[#9C82EF]">Transacciones</span> &gt;{" "}
                <span className="text-[#9C82EF]">Ingresos</span> &gt;{" "}
                <span 
                  className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                  {breadcrumbCurrent}
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
                <h3 className="text-[16px] font-medium text-[#1C1C1C] mb-6">
                  Datos del suscriptor temporal
                </h3>
                
                <div className="space-y-6 mt-4">
                  {/* Usuario TikTok - Fila completa */}
                  <div>
                    <label className="block text-[12px] font-medium text-[#777777] mb-2">
                      Usuario TikTok
                    </label>
                    <Input
                      type="text"
                      placeholder="Ingresa tu usuario de TikTok"
                      value={formData.usuarioTiktok}
                      onChange={(e) => handleInputChange("usuarioTiktok", e.target.value)}
                      className="w-[484px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium  placeholder:text-[14px] "
                    />
                  </div>

                  {/* Celular y Cantidad WC - En la misma fila */}
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Celular
                      </label>
                      <div className="relative flex justify-start" style={{ width: '230px', height: '40px' }}>
                        <Input
                          type="text"
                          placeholder="000000000"
                          value={formData.celular}
                          onChange={(e) => {
                            let numbersOnly = e.target.value.replace(/[^\d]/g, '')
                            if (numbersOnly.length > 0 && !numbersOnly.startsWith('9')) {
                              return // No permitir si no empieza con 9
                            }
                            if (numbersOnly.length > 9) {
                              numbersOnly = numbersOnly.substring(0, 9)
                            }
                            
                            handleInputChange("celular", numbersOnly)
                          }}
                          className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px] pl-16 text-left"
                          maxLength={15}
                        />
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 ">
                          <Select
                            value={formData.celular.startsWith("+51") ? "+51" : "+51"}
                            onValueChange={(value) => {
                              const currentNumber = formData.celular.replace(/^\+\d+/, "")
                              handleInputChange("celular", value + currentNumber)
                            }}
                          >
                            <SelectTrigger className="w-[68px] h-[30px] bg-transparent border-none shadow-none text-[#777777] text-sm font-medium hover:bg-gray-100 rounded transition-colors">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="+51">+51</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Cantidad WC
                      </label>
                      <Input
                        type="text"
                        placeholder="Ingresa una cantidad"
                        value={formData.cantidadWC}
                        onChange={(e) => handleInputChange("cantidadWC", e.target.value)}
                        className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px]"
                      />
                    </div>
                  </div>

                  {/* Fecha y Estado - En la misma fila */}
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Fecha
                      </label>
                      <div className="relative">
                        <Input
                          type="date"
                          placeholder="00/00/0000"
                          value={formData.fecha}
                          onChange={(e) => handleInputChange("fecha", e.target.value)}
                          className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] pr-10 placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px]"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Estado
                      </label>
                      <Select
                        value={formData.estado}
                        onValueChange={(value) => handleInputChange("estado", value)}
                        key={formData.estado} // Forzar re-render cuando cambie el valor
                      >
                        <SelectTrigger className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] text-[#777777]">
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pendiente">Pendiente</SelectItem>
                          <SelectItem value="aprobado">Aprobado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-[10px] pb-[30px] flex-shrink-0 justify-center">
              <GradientOutlineButton
                onClick={onClose}
                width="138px"
                height="40px"
                className="border-red-300 text-red-600 hover:bg-red-50 rounded-lg"
              >
                Cancelar
              </GradientOutlineButton>
              <GradientButton
                type="submit"
                className="rounded-lg"
              >
                {buttonText}
              </GradientButton>
            </div>
          </form>
        </div>
      </div>
      
      {/* Toast notification - Fuera del modal para que persista */}
      {/* The toast state and useEffect were removed, so this block is no longer needed */}
    </>
  )
}
