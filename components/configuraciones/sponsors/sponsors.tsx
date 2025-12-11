"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, RefreshCw } from "lucide-react"
import { LapizIcon, TachoIcon } from "@/components/icons/configuraciones-icons"
import { EditarSponsorModal, EliminarSponsorModal } from "@/components/modals/configuraciones"
import { sponsorsAPI, SponsorListDTO } from "@/lib/api"
import { toast } from "sonner"

interface Sponsor {
  sponId: number
  nombre: string
}

export function Sponsors() {
  const [sponsorsData, setSponsorsData] = useState<Sponsor[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [loading, setLoading] = useState(true)
  
  // Estados para los modales
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [sponsorSeleccionado, setSponsorSeleccionado] = useState<any>(null)

  // Cargar sponsors desde la API
  useEffect(() => {
    loadSponsors()
  }, [])

  const loadSponsors = async () => {
    try {
      setLoading(true)
      const sponsors = await sponsorsAPI.getAll()
      // Convertir SponsorListDTO[] a Sponsor[] usando el sponId real del backend
      const sponsorsWithId: Sponsor[] = sponsors.map((sponsor) => ({
        sponId: sponsor.sponId,
        nombre: sponsor.sponNombre
      }))
      setSponsorsData(sponsorsWithId)
    } catch (error) {
      console.error("Error loading sponsors:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al cargar los sponsors"
      toast.error(errorMessage)
      setSponsorsData([])
    } finally {
      setLoading(false)
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(sponsorsData.map(item => item.sponId.toString()))
    } else {
      setSelectedItems([])
    }
    setSelectAll(checked)
  }

  const handleSelectItem = (sponId: number, checked: boolean) => {
    const idString = sponId.toString()
    if (checked) {
      setSelectedItems(prev => [...prev, idString])
    } else {
      setSelectedItems(prev => prev.filter(item => item !== idString))
    }
  }

  const handleRefresh = () => {
    loadSponsors()
  }

  const handleEditarSponsor = (sponsor: Sponsor) => {
    setSponsorSeleccionado(sponsor)
    setIsEditarModalOpen(true)
  }

  const handleEliminarSponsor = (sponsor: Sponsor) => {
    setSponsorSeleccionado(sponsor)
    setIsEliminarModalOpen(true)
  }

  const handleConfirmarEditar = (data: any) => {
    console.log("Sponsor editado exitosamente:", data)
    // Recargar la lista después de editar
    loadSponsors()
    setIsEditarModalOpen(false)
    setSponsorSeleccionado(null)
  }

  const handleConfirmarEliminar = (id: string) => {
    console.log("Eliminando sponsor con ID:", id)
    // Recargar la lista después de eliminar
    loadSponsors()
    setIsEliminarModalOpen(false)
    setSponsorSeleccionado(null)
  }

  return (
    <div className="space-y-6">
      {/* Acciones */}
      <div className="flex items-center gap-4 pl-6">
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
        {selectedItems.length > 0 && (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Eliminar seleccionados ({selectedItems.length})
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-gray-400 mb-4" />
          <p className="text-gray-500">Cargando sponsors...</p>
        </div>
      )}

      {/* Empty State or List */}
      {!loading && sponsorsData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Image
            src="/no-hay-concursos.png"
            alt="No hay sponsors"
            width={320}
            height={320}
            className="w-80 h-80 object-contain mb-4"
          />
          <p className="text-gray-500">No hay sponsors disponibles</p>
        </div>
      )}
      {!loading && sponsorsData.length > 0 && (
        <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
          <div className="p-3 sm:p-4 md:p-6">
            {/* Lista de items */}
            <div className="space-y-0">
              {sponsorsData.map((item, index) => (
              <div key={item.sponId}>
                <div className="flex items-center justify-between py-2 sm:py-3 ">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                    <Checkbox 
                      checked={selectedItems.includes(item.sponId.toString())}
                      onCheckedChange={(checked) => handleSelectItem(item.sponId, checked as boolean)}
                      className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777] flex-shrink-0"
                    />
                    <span className="text-xs sm:text-sm font-normal text-gray-900 truncate">{item.nombre}</span>
                  </div>
                  
                  {/* Dropdown de acciones */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#1C1C1C] hover:text-[#6137E5] flex-shrink-0 ml-2"
                      >
                        <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 sm:w-54" align="end">
                      <DropdownMenuItem 
                        className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-xs sm:text-sm font-medium"
                        onClick={() => handleEditarSponsor(item)}
                      >
                        <LapizIcon />
                        <span className="hidden sm:inline">Editar sponsor</span>
                        <span className="sm:hidden">Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-xs sm:text-sm font-medium"
                        onClick={() => handleEliminarSponsor(item)}
                      >
                        <TachoIcon />
                        <span className="hidden sm:inline">Eliminar sponsor</span>
                        <span className="sm:hidden">Eliminar</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                {/* Línea separadora horizontal */}
                {index < sponsorsData.length - 1 && (
                  <div className="border-b border-gray-200 mx-3 sm:mx-4 md:mx-6"></div>
                )}
              </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Editar Sponsor */}
      {sponsorSeleccionado && (
        <EditarSponsorModal
          isOpen={isEditarModalOpen}
          onClose={() => setIsEditarModalOpen(false)}
          sponsor={sponsorSeleccionado}
          onSave={handleConfirmarEditar}
        />
      )}

      {/* Modal de Eliminar Sponsor */}
      {sponsorSeleccionado && (
        <EliminarSponsorModal
          isOpen={isEliminarModalOpen}
          onClose={() => setIsEliminarModalOpen(false)}
          sponsor={sponsorSeleccionado}
          onConfirm={handleConfirmarEliminar}
        />
      )}
    </div>
  )
}
