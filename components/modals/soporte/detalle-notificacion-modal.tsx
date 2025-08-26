"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"

interface DetalleNotificacionModalProps {
  isOpen: boolean
  onClose: () => void
  notificacion: {
    id: string
    mensaje: string
    tiempo: string
    tipo?: string
    usuario?: string
    promocion?: string
  }
  onAceptar?: () => void
  onCancelar?: () => void
}

export function DetalleNotificacionModal({ 
  isOpen, 
  onClose, 
  notificacion, 
  onAceptar, 
  onCancelar 
}: DetalleNotificacionModalProps) {
  if (!isOpen) return null

  const handleAceptar = () => {
    onAceptar?.()
    onClose()
  }

  const handleCancelar = () => {
    onCancelar?.()
    onClose()
  }

  const handleIrAPromociones = () => {
    // Aquí iría la lógica para navegar a promociones
    console.log("Navegando a promociones...")
  }

  return (
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
            <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Notificación</h2>
            <div className="text-[12px] text-gray-600 mt-4">
              <span className="text-[#4E1EE2] font-medium">{notificacion.tiempo}</span>
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
            {/* Imagen */}
            <div className="mb-6">
              <img 
                src="/eliminar.png" 
                alt="Detalle notificación" 
                className="w-32 h-32 object-contain"
              />
            </div>
            
            {/* Contenido de texto */}
            <div className="space-y-3 mb-6">
              <h3 className="text-[18px] font-bold text-[#1C1C1C]">
                {notificacion.tipo || "Notificación"}
              </h3>
              <p className="text-[14px] text-gray-600">
                {notificacion.mensaje}
                {notificacion.usuario && (
                  <span className="text-[#9C82EF] font-medium"> {notificacion.usuario}</span>
                )}
                {notificacion.promocion && (
                  <span className="text-[#9C82EF] font-medium"> {notificacion.promocion}</span>
                )}
              </p>
            </div>

            {/* Enlace */}
            <button
              onClick={handleIrAPromociones}
              className="text-[#4E1EE2] underline text-[14px] hover:text-[#6137E5] transition-colors mb-6 font-medium"
            >
              Ir a promociones
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-[10px] px-[30px] pb-6 justify-center">
          <GradientOutlineButton
            onClick={handleCancelar}
            className="w-[138px] h-[40px] text-purple-600 border-purple-300 hover:bg-purple-50"
          >
            Cancelar
          </GradientOutlineButton>
          <GradientButton
            type="button"
            onClick={handleAceptar}
            className="w-[138px] h-[40px]"
          >
            Aceptar
          </GradientButton>
        </div>
      </div>
    </div>
  )
}
