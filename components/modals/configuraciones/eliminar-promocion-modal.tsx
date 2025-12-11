"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { AlertIcon } from "@/components/icons/adminitracion-icon"
import { NotificationToast } from "@/components/ui/notification-toast"
import { promocionAPI } from "@/lib/api"
import { toast } from "sonner"

interface EliminarPromocionModalProps {
  isOpen: boolean
  onClose: () => void
  promocion: {
    id: string
    nombre: string
    promocionesSolicitadas: number
    monto: string
    estado: string
  }
  onConfirm: () => void
}

export function EliminarPromocionModal({ isOpen, onClose, promocion, onConfirm }: EliminarPromocionModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: "", message: "" })
  const [toastType, setToastType] = useState<"success" | "error">("success")

  if (!isOpen) return null

  const handleConfirm = async () => {
    setIsDeleting(true)
    
    try {
      const id = parseInt(promocion.id)
      const result = await promocionAPI.delete(id)
      
      if (result.success) {
        showToastMessage("success", "Promoción eliminada", "La promoción ha sido eliminada exitosamente")
        toast.success("Promoción eliminada exitosamente")
        
        // Llamar al callback para refrescar la lista
        onConfirm()
        
        // Cerrar el modal después de un breve delay
        setTimeout(() => {
          onClose()
        }, 1500)
      } else {
        showToastMessage("error", "Error", "No se pudo eliminar la promoción")
        toast.error("Error al eliminar la promoción")
      }
    } catch (error) {
      console.error("Error deleting promoción:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al eliminar la promoción. Por favor, intenta nuevamente."
      showToastMessage("error", "Error", errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsDeleting(false)
    }
  }

  const showToastMessage = (type: "success" | "error", title: string, message: string) => {
    setToastType(type)
    setToastMessage({ title, message })
    setShowToast(true)
    
    setTimeout(() => {
      setShowToast(false)
    }, 5000)
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
              <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Eliminar promoción</h2>
              <div className="text-[12px] text-gray-600 mt-4">
                <span className="text-[#9C82EF]">Configuraciones</span> &gt;{" "}
                <span className="text-[#9C82EF]">Promociones</span> &gt;{" "}
                <span 
                  className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                  Eliminar promoción
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
                  alt="Eliminar promoción" 
                  className="w-32 h-32 object-contain"
                />
              </div>
              
              {/* Texto de confirmación */}
              <div className="space-y-3 mb-6">
                <p className="text-[14px] text-gray-600">
                  Estás por eliminar la siguiente promoción:
                </p>
                <p className="text-[18px] font-bold text-[#1C1C1C]">
                  {promocion.nombre}
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
                  Se eliminará toda la información registrada de ésta promoción
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
              className="w-[138px] h-[40px]"
              disabled={isDeleting}
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </GradientButton>
          </div>
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
