"use client"

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { RefreshCw, MoreVertical, ChevronDown } from 'lucide-react'
import { TachoIcon, AlertIcon } from '@/components/icons/soporte-icons'
import { EliminarReclamoModal } from '@/components/modals/soporte'
import { useRouter } from 'next/navigation'

// Mock data para reclamos resueltos
const RECLAMOS_RESUELTOS = [
  {
    id: '0065',
    mensaje: 'Reclamo 0065: Configuración de límite diario, no reporta alerta...',
    estado: 'Resuelto',
    fecha: '2024-01-14 09:15'
  },
  {
    id: '0078',
    mensaje: 'Reclamo 0078: Error en el cálculo de comisiones...',
    estado: 'Resuelto',
    fecha: '2024-01-13 16:20'
  }
]

export function Resueltos() {
  const router = useRouter()
  const [selectedReclamos, setSelectedReclamos] = useState<string[]>([])
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [reclamoSeleccionado, setReclamoSeleccionado] = useState<{ id: string; mensaje: string } | null>(null)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedReclamos(RECLAMOS_RESUELTOS.map(reclamo => reclamo.id))
    } else {
      setSelectedReclamos([])
    }
  }

  const handleSelectReclamo = (reclamoId: string, checked: boolean) => {
    if (checked) {
      setSelectedReclamos(prev => [...prev, reclamoId])
    } else {
      setSelectedReclamos(prev => prev.filter(id => id !== reclamoId))
    }
  }

  const handleEliminarReclamo = (reclamo: { id: string; mensaje: string }) => {
    setReclamoSeleccionado(reclamo)
    setIsEliminarModalOpen(true)
  }

  const handleConfirmarEliminar = (id: string) => {
    console.log("Eliminando reclamo:", id)
    // Aquí iría la lógica para eliminar el reclamo
  }

  const handleClickReclamo = (e: React.MouseEvent, reclamoId: string) => {
    e.stopPropagation()
    router.push(`/soporte/reclamos/${reclamoId}`)
  }

  const isAllSelected = selectedReclamos.length === RECLAMOS_RESUELTOS.length

  const getStatusButton = (estado: string) => {
    switch (estado) {
      case "En proceso":
        return (
          <Button 
            variant="outline" 
            className={`h-8 px-3 rounded-full border-0 bg-[#FBFBFB] text-[#6137E5] border border-[#6137E5] hover:bg-[#FBFBFB] hover:text-[#6137E5]`}
          >
            {estado}
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        )
      case "Resuelto":
        return (
          <Button 
            variant="outline" 
            className={`h-8 px-3 rounded-full border-0 bg-[#6137E5] text-white hover:bg-[#6137E5] hover:text-white`}
          >
            {estado}
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Acciones */}
      <div className="flex items-center gap-4 ml-3 sm:ml-4 md:ml-6">
        <Checkbox
          checked={isAllSelected}
          onCheckedChange={handleSelectAll}
          className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
        />
        <button
          onClick={() => console.log("Refrescando reclamos...")}
          className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100"
          title="Refrescar"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      {/* Lista de reclamos */}
      <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
        <div className="p-3 sm:p-4 md:p-6">
          {/* Lista de items */}
          <div className="space-y-0">
            {RECLAMOS_RESUELTOS.map((reclamo, index) => (
              <div key={reclamo.id}>
                <div className="flex items-center justify-between py-2 sm:py-3">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                    <Checkbox 
                      checked={selectedReclamos.includes(reclamo.id)}
                      onCheckedChange={(checked) => handleSelectReclamo(reclamo.id, checked as boolean)}
                      className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777] flex-shrink-0"
                    />
                    <span 
                      className="text-sm font-normal text-[#333333] truncate cursor-pointer hover:text-[#6137E5] transition-colors"
                      onClick={(e) => handleClickReclamo(e, reclamo.id)}
                    >
                      {reclamo.mensaje}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Dropdown de estado */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        {getStatusButton(reclamo.estado)}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-auto min-w-[120px] rounded-full border-0 shadow-lg bg-white">
                        {reclamo.estado === 'En proceso' ? (
                          <DropdownMenuItem className="rounded-full text-[#6137E5] hover:bg-white hover:text-[#6137E5]">Resuelto</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="rounded-full text-[#6137E5] hover:bg-white hover:text-[#6137E5]">En proceso</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Dropdown de opciones - solo eliminar */}
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
                          onClick={() => handleEliminarReclamo(reclamo)}
                        >
                          <TachoIcon />
                          Eliminar reclamo
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Línea separadora horizontal */}
                {index < RECLAMOS_RESUELTOS.length - 1 && (
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
        <span>Los reclamos se procesan en orden de llegada</span>
      </div>

      {/* Modal de Eliminar Reclamo */}
      {reclamoSeleccionado && (
        <EliminarReclamoModal
          isOpen={isEliminarModalOpen}
          onClose={() => {
            setIsEliminarModalOpen(false)
            setReclamoSeleccionado(null)
          }}
          reclamo={reclamoSeleccionado}
          onConfirm={handleConfirmarEliminar}
        />
      )}
    </div>
  )
}
