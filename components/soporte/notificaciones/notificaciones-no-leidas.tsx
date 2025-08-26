"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { RefreshCw, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TachoIcon, AlertIcon } from "@/components/icons/soporte-icons"
import { EliminarNotificacionModal, DetalleNotificacionModal } from "@/components/modals/soporte"

interface Notificacion {
  id: string
  mensaje: string
  tiempo: string
  leida: boolean
  tipo?: string
  usuario?: string
  promocion?: string
}

export function NotificacionesNoLeidas() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  
  // Estados para los modales
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)
  const [notificacionSeleccionada, setNotificacionSeleccionada] = useState<Notificacion | null>(null)
  
  // Datos de ejemplo para notificaciones no leídas
  const NOTIFICACIONES_DATA: Notificacion[] = [
    {
      id: "1",
      mensaje: "ha solicitado la promoción",
      tiempo: "14:40",
      leida: false,
      tipo: "Solicitud de promoción",
      usuario: "@José2509",
      promocion: "2x1"
    },
    {
      id: "2",
      mensaje: "ha solicitado la promoción",
      tiempo: "25 Sept",
      leida: false,
      tipo: "Solicitud de promoción",
      usuario: "@Maria123",
      promocion: "3x2"
    }
  ]

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(NOTIFICACIONES_DATA.map(item => item.id))
    } else {
      setSelectedItems([])
    }
    setSelectAll(checked)
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id])
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id))
    }
  }

  const handleRefresh = () => {
    console.log("Refrescando notificaciones...")
  }

  const handleMarcarComoLeida = (id: string) => {
    console.log("Marcando como leída:", id)
  }

  const handleEliminar = (notificacion: Notificacion) => {
    setNotificacionSeleccionada(notificacion)
    setIsEliminarModalOpen(true)
  }

  const handleConfirmarEliminar = (id: string) => {
    console.log("Eliminando notificación con ID:", id)
    // Aquí iría la lógica para eliminar la notificación
    setIsEliminarModalOpen(false)
    setNotificacionSeleccionada(null)
  }

  const handleVerDetalle = (notificacion: Notificacion) => {
    setNotificacionSeleccionada(notificacion)
    setIsDetalleModalOpen(true)
  }

  const handleAceptarNotificacion = () => {
    console.log("Aceptando notificación:", notificacionSeleccionada?.id)
    // Aquí iría la lógica para aceptar la notificación
  }

  const handleCancelarNotificacion = () => {
    console.log("Cancelando notificación:", notificacionSeleccionada?.id)
    // Aquí iría la lógica para cancelar la notificación
  }

  return (
    <div className="space-y-6">
      {/* Acciones */}
      <div className="flex items-center gap-4 ml-3 sm:ml-4 md:ml-6">
        <Checkbox
          checked={selectAll}
          onCheckedChange={handleSelectAll}
          className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
        />
        <button
          onClick={handleRefresh}
          className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100"
          title="Refrescar"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      {/* Lista de notificaciones */}
      <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
        <div className="p-3 sm:p-4 md:p-6">
          {/* Lista de items */}
          <div className="space-y-0">
            {NOTIFICACIONES_DATA.map((notificacion, index) => (
              <div key={notificacion.id}>
                <div className="flex items-center justify-between py-2 sm:py-3">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                    <Checkbox 
                      checked={selectedItems.includes(notificacion.id)}
                      onCheckedChange={(checked) => handleSelectItem(notificacion.id, checked as boolean)}
                      className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777] flex-shrink-0"
                    />
                    <span 
                      className="text-sm font-normal text-[#333333] truncate cursor-pointer hover:text-[#4E1EE2] transition-colors"
                      onClick={() => handleVerDetalle(notificacion)}
                    >
                      {notificacion.mensaje}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#4E1EE2] font-medium">
                      {notificacion.tiempo}
                    </span>
                    
                    {/* Dropdown de acciones */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#1C1C1C] hover:text-[#6137E5]"
                        >
                          <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48 sm:w-54" align="end">
                        <DropdownMenuItem 
                          className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-xs sm:text-sm font-medium"
                          onClick={() => handleEliminar(notificacion)}
                        >
                          <TachoIcon />
                          <span className="hidden sm:inline">Eliminar notificación</span>
                          <span className="sm:hidden">Eliminar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Línea separadora horizontal */}
                {index < NOTIFICACIONES_DATA.length - 1 && (
                  <div className="border-b-2 border-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <div className="flex items-center space-x-2 text-[#FF4444] text-sm">
        <AlertIcon />
        <span>Las notificaciones en papelera permaneceran visibles por un máximo de 80 días</span>
      </div>

      {/* Modal de Eliminar Notificación */}
      {notificacionSeleccionada && (
        <EliminarNotificacionModal
          isOpen={isEliminarModalOpen}
          onClose={() => setIsEliminarModalOpen(false)}
          notificacion={notificacionSeleccionada}
          onConfirm={handleConfirmarEliminar}
        />
      )}

      {/* Modal de Detalle de Notificación */}
      {notificacionSeleccionada && (
        <DetalleNotificacionModal
          isOpen={isDetalleModalOpen}
          onClose={() => setIsDetalleModalOpen(false)}
          notificacion={notificacionSeleccionada}
          onAceptar={handleAceptarNotificacion}
          onCancelar={handleCancelarNotificacion}
        />
      )}
    </div>
  )
}

