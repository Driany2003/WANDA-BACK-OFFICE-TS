"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { AlertIcon } from "@/components/icons/adminitracion-icon"

interface EliminarSuscriptorModalProps {
  isOpen: boolean
  onClose: () => void
  suscriptor: {
    id: string
    nombre: string
    usuarioTiktok: string
    celular: string
    estado: string
  }
  onConfirm: (id: string) => void
}

export function EliminarSuscriptorModal({ isOpen, onClose, suscriptor, onConfirm }: EliminarSuscriptorModalProps) {
  const handleConfirm = () => {
    onConfirm(suscriptor.id)
    onClose()
  }

  if (!isOpen) return null

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
              <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Eliminar suscriptor</h2>
              <div className="text-[12px] text-gray-600 mt-4">
                <span className="text-[#9C82EF]">Administración</span> &gt;{" "}
                <span className="text-[#9C82EF]">Suscriptores</span> &gt;{" "}
                <span 
                  className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                  Eliminar suscriptor
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
                  src="/administracion_eliminar.png" 
                  alt="Eliminar suscriptor" 
                  className="w-32 h-32 object-contain"
                />
              </div>
              
              {/* Texto de confirmación */}
              <div className="space-y-3 mb-6">
                <p className="text-[14px] text-gray-600">
                  Estás por eliminar al siguiente suscriptor:
                </p>
                <p className="text-[18px] font-bold text-[#1C1C1C]">
                  {suscriptor.nombre}
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
                  Se eliminará toda la información registrada de éste suscriptor
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
            >
              Eliminar
            </GradientButton>
          </div>
        </div>
      </div>
    </>
  )
}
