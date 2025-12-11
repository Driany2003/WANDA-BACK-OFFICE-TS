"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { AlertIcon } from "@/components/icons/adminitracion-icon"
import { novedadesAPI } from "@/lib/api"
import { toast } from "sonner"

interface EliminarNovedadModalProps {
  isOpen: boolean
  onClose: () => void
  novedad: {
    id: string
    nombre: string
  }
  onConfirm: (id: string) => void
}

export function EliminarNovedadModal({ isOpen, onClose, novedad, onConfirm }: EliminarNovedadModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  if (!isOpen) return null

  const handleConfirm = async () => {
    setIsDeleting(true)
    
    try {
      const id = parseInt(novedad.id)
      const result = await novedadesAPI.delete(id)
      
      if (result.success) {
        toast.success("Novedad eliminada exitosamente")
        onConfirm(novedad.id)
        setTimeout(() => {
          onClose()
        }, 1500)
      } else {
        toast.error(result.message || "No se pudo eliminar la novedad")
      }
    } catch (error) {
      console.error("Error deleting novedad:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al eliminar la novedad. Por favor, intenta nuevamente."
      toast.error(errorMessage)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#FBFBFB] rounded-xl w-[500px] h-[600px] mx-4 flex flex-col overflow-hidden">
          {/* Header */}
          <div 
            className="flex justify-between items-start px-[30px] pt-[30px] pb-6 flex-shrink-0 bg-{#FEFEFE}"
            style={{ 
              boxShadow: '0 4px 10px rgba(219, 8, 110, 0.08)'
            }}
          >
            <div className="flex-1">
              <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Eliminar novedad</h2>
              <div className="text-[12px] text-gray-600 mt-4">
                <span className="text-[#9C82EF]">Configuraciones</span> &gt;{" "}
                <span className="text-[#9C82EF]">Novedades</span> &gt;{" "}
                <span 
                  className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                  Eliminar novedad
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
          <div className="flex-1 flex flex-col px-[30px] py-6">
            <div className="flex flex-col items-center text-center mb-8">
              {/* Imagen de eliminación */}
              <div className="mb-6">
                <img 
                  src="/eliminar.png" 
                  alt="Eliminar novedad" 
                  className="w-32 h-32 object-contain"
                />
              </div>
              
              {/* Texto de confirmación */}
              <div className="space-y-3 mb-6">
                <p className="text-[14px] text-gray-600">
                  Estás por eliminar la siguiente novedad:
                </p>
                <p className="text-[18px] font-bold text-[#1C1C1C]">
                  {novedad.nombre}
                </p>
                <p className="text-[14px] text-gray-600">
                  ¿Estás seguro de realizar dicha acción?
                </p>
              </div>

              {/* Línea divisoria */}
              <div className="w-full border-t border-gray-200 mb-4"></div>

              {/* Mensaje de advertencia */}
              <div className="flex items-center gap-2 text-red-500">
                <AlertIcon />
                <p className="text-[14px] text-red-500">
                  Se eliminará toda la información registrada de ésta novedad
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-[10px] px-[30px] pb-6 justify-center">
            <GradientOutlineButton
              onClick={onClose}
              className="w-[138px] h-[40px] text-purple-600 border-purple-300 hover:bg-purple-50"
            >
              Cancelar
            </GradientOutlineButton>
            <GradientButton
              type="button"
              onClick={handleConfirm}
              disabled={isDeleting}
              className="w-[138px] h-[40px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </GradientButton>
          </div>
        </div>
      </div>
    </>
  )
}
