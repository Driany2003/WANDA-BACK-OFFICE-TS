"use client"

import { X } from 'lucide-react'
import { GradientButton } from '@/components/ui/gradient-button'
import { GradientOutlineButton } from '@/components/ui/gradient-outline-button'
import { PaginaEstatica } from '@/types/soporte'

interface EliminarPaginaEstaticaModalProps {
  isOpen: boolean
  onClose: () => void
  pagina: PaginaEstatica | null
  onConfirm: (pagina: PaginaEstatica) => void
}

export function EliminarPaginaEstaticaModal({
  isOpen,
  onClose,
  pagina,
  onConfirm
}: EliminarPaginaEstaticaModalProps) {
  if (!isOpen || !pagina) return null

  const handleConfirm = () => {
    onConfirm(pagina)
    onClose()
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
            <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Eliminar página estática</h2>
            <div className="text-[12px] text-gray-600 mt-4">
              <span className="text-[#9C82EF]">Soporte</span> &gt;{" "}
              <span className="text-[#9C82EF]">Páginas estáticas</span> &gt;{" "}
              <span 
                className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                Eliminar página estática
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
                alt="Eliminar página estática" 
                className="w-32 h-32 object-contain"
              />
            </div>
            
            {/* Texto de confirmación */}
            <div className="space-y-3 mb-6">
              <p className="text-[14px] text-gray-600">
                Estás por eliminar la siguiente página estática:
              </p>
              <p className="text-[18px] font-bold text-[#1C1C1C]">
                {pagina.nombre}
              </p>
              <p className="text-[14px] text-gray-600">
                Esta acción no se puede deshacer.
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
            onClick={handleConfirm}
            className="w-[138px] h-[40px]"
          >
            Eliminar
          </GradientButton>
        </div>
      </div>
    </div>
  )
}
