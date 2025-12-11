"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  PromocionesIcon, PromocionesIconColor,
  NovedadesIcon, NovedadesIconColor,
  AutocuidadoIcon, AutocuidadoIconColor,
  ParametrosIcon, ParametrosIconColor,
  SponsorsIcon, SponsorsIconColor
} from "@/components/icons/configuraciones-icons"
import { PromocionesActuales } from "@/components/configuraciones/promociones/actuales"
import { PromocionesSolicitadas } from "@/components/configuraciones/promociones/solicitadas"
import { PromocionesVencidas } from "@/components/configuraciones/promociones/vencidas"
import { NovedadesActivas, NovedadesInactivas, NovedadesBorrador } from "@/components/configuraciones/novedades"
import { Autocuidado } from "@/components/configuraciones/autocuidado"
import { Parametros } from "@/components/configuraciones/parametros"
import { Sponsors } from "@/components/configuraciones/sponsors"
import { AgregarPromocionModal, AgregarNovedadModal, AgregarParametroModal, AgregarSponsorModal } from "@/components/modals/configuraciones"

export default function ConfiguracionesPage() {
  const [activeTab, setActiveTab] = useState("promociones")
  const [activeSubTab, setActiveSubTab] = useState("actuales")
  const [activeNovedadesSubTab, setActiveNovedadesSubTab] = useState("activas")

  
  // Estado para el modal de agregar promoción
  const [isAgregarModalOpen, setIsAgregarModalOpen] = useState(false)
  
  // Estado para el modal de agregar novedad
  const [isAgregarNovedadModalOpen, setIsAgregarNovedadModalOpen] = useState(false)
  
  // Estado para el modal de agregar parámetro
  const [isAgregarParametroModalOpen, setIsAgregarParametroModalOpen] = useState(false)
  
  // Estado para el modal de agregar sponsor
  const [isAgregarSponsorModalOpen, setIsAgregarSponsorModalOpen] = useState(false)
  
  // Estado para el filtro de alertas en autocuidado
  const [filtroAlerta, setFiltroAlerta] = useState<string>("todas")
  
  // Estado para forzar recarga de listas
  const [refreshKey, setRefreshKey] = useState(0)
  
  const handleAgregarPromocion = (data: any) => {
    console.log("Promoción agregada exitosamente:", data)
    // Forzar recarga de las listas de promociones
    setRefreshKey(prev => prev + 1)
    setIsAgregarModalOpen(false)
  }
  
  const handleAgregarNovedad = (data: any) => {
    console.log("Novedad agregada exitosamente:", data)
    // Forzar recarga de las listas de novedades
    setRefreshKey(prev => prev + 1)
    setIsAgregarNovedadModalOpen(false)
  }
  
  const handleAgregarParametro = (data: any) => {
    console.log("Agregando parámetro:", data)
    // Aquí iría la lógica para agregar el parámetro
    setIsAgregarParametroModalOpen(false)
  }
  
  const handleAgregarSponsor = (data: any) => {
    console.log("Sponsor agregado exitosamente:", data)
    // Forzar recarga de la lista de sponsors
    setRefreshKey(prev => prev + 1)
    setIsAgregarSponsorModalOpen(false)
  }
  
  return (
    <div className="space-y-6 p-5 pt-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#DB086E] to-[#3A05DF] bg-clip-text text-transparent">
            Configuraciones
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {/* Filtro y Botón Agregar visible en Promociones y Novedades */}
          {activeTab === "promociones" ? (
            <>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-600">&nbsp;</span>
                <Select defaultValue="todas">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar promociones" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="activas">Activas</SelectItem>
                    <SelectItem value="inactivas">Inactivas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {activeSubTab === "actuales" && (
                 <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-600">&nbsp;</span>
                <button 
                  onClick={() => setIsAgregarModalOpen(true)}
                  className="bg-gradient-to-r from-[#DB086E] to-[#3A05DF] text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity font-medium flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Agregar
                </button>
                </div>
              )}
            </>
          ) : activeTab === "novedades" ? (
            <>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-600">&nbsp;</span>
                <button 
                  onClick={() => setIsAgregarNovedadModalOpen(true)}
                  className="bg-gradient-to-r from-[#DB086E] to-[#3A05DF] text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity font-medium flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Agregar
                </button>
              </div>
            </>
          ) : activeTab === "autocuidado" ? (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600">&nbsp;</span>
              <Select value={filtroAlerta} onValueChange={setFiltroAlerta}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar alertas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="programada">Programada</SelectItem>
                  <SelectItem value="enviada">Enviada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : activeTab === "parametros" ? (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600">&nbsp;</span>
              <button 
                onClick={() => setIsAgregarParametroModalOpen(true)}
                className="bg-gradient-to-r from-[#DB086E] to-[#3A05DF] text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Agregar
              </button>
            </div>
          ) : activeTab === "sponsors" ? (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600">&nbsp;</span>
              <button 
                onClick={() => setIsAgregarSponsorModalOpen(true)}
                className="bg-gradient-to-r from-[#DB086E] to-[#3A05DF] text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Agregar
              </button>
            </div>
          ) : (
            /* Espacio invisible para mantener la altura en otras pestañas */
            <div className="h-10 w-24"></div>
          )}
        </div>
      </div>

      {/* Pestañas principales */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex w-full justify-start gap-1 mb-6 bg-transparent border-none shadow-none">
          <TabsTrigger
            value="promociones"
            className="flex items-center gap-2 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeTab === "promociones" ? <PromocionesIconColor /> : <PromocionesIcon />}
            Promociones
          </TabsTrigger>
          <TabsTrigger
            value="novedades"
            className="flex items-center gap-2 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeTab === "novedades" ? <NovedadesIconColor /> : <NovedadesIcon />}
            Novedades
          </TabsTrigger>
          <TabsTrigger
            value="autocuidado"
            className="flex items-center gap-2 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeTab === "autocuidado" ? <AutocuidadoIconColor /> : <AutocuidadoIcon />}
            Autocuidado
          </TabsTrigger>
          <TabsTrigger
            value="parametros"
            className="flex items-center gap-2 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeTab === "parametros" ? <ParametrosIconColor /> : <ParametrosIcon />}
            Parámetros
          </TabsTrigger>
          <TabsTrigger
            value="sponsors"
            className="flex items-center gap-2 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeTab === "sponsors" ? <SponsorsIconColor /> : <SponsorsIcon />}
            Sponsors
          </TabsTrigger>
        </TabsList>

        {/* Contenido de Promociones */}
        <TabsContent value="promociones" className="space-y-6 min-h-[600px]">
          {/* Sub-pestañas de Promociones */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setActiveSubTab("actuales")}
              className={`w-[100px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
                activeSubTab === "actuales" 
                  ? "bg-[#890277] text-white shadow-md" 
                  : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
              }`}
              style={{
                boxShadow: activeSubTab === "actuales" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : '0 2px 8px rgba(219, 8, 110, 0.15)'
              }}
            >
              Actuales
            </button>
            <button
              onClick={() => setActiveSubTab("solicitadas")}
              className={`w-[100px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
                activeSubTab === "solicitadas" 
                  ? "bg-[#890277] text-white shadow-md" 
                  : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
              }`}
              style={{
                boxShadow: activeSubTab === "solicitadas" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : '0 2px 8px rgba(219, 8, 110, 0.15)'
              }}
            >
              Solicitadas
            </button>
            <button
              onClick={() => setActiveSubTab("vencidas")}
              className={`w-[100px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
                activeSubTab === "vencidas" 
                  ? "bg-[#890277] text-white shadow-md" 
                  : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
              }`}
              style={{
                boxShadow: activeSubTab === "vencidas" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : '0 2px 8px rgba(219, 8, 110, 0.15)'
              }}
            >
              Vencidas
            </button>
          </div>

          {/* Componentes de Promociones según sub-pestaña activa */}
          {activeSubTab === "actuales" && <PromocionesActuales key={`actuales-${refreshKey}`} />}
          {activeSubTab === "solicitadas" && <PromocionesSolicitadas key={`solicitadas-${refreshKey}`} />}
          {activeSubTab === "vencidas" && <PromocionesVencidas key={`vencidas-${refreshKey}`} />}
        </TabsContent>

        {/* Contenido de Novedades */}
        <TabsContent value="novedades" className="space-y-6 min-h-[600px]">
          {/* Sub-pestañas de Novedades */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setActiveNovedadesSubTab("activas")}
              className={`w-[100px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
                activeNovedadesSubTab === "activas" 
                  ? "bg-[#890277] text-white shadow-md" 
                  : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
              }`}
              style={{
                boxShadow: activeNovedadesSubTab === "activas" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : '0 2px 8px rgba(219, 8, 110, 0.15)'
              }}
            >
              Activas
            </button>
            <button
              onClick={() => setActiveNovedadesSubTab("inactivas")}
              className={`w-[100px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
                activeNovedadesSubTab === "inactivas" 
                  ? "bg-[#890277] text-white shadow-md" 
                  : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
              }`}
              style={{
                boxShadow: activeNovedadesSubTab === "inactivas" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : '0 2px 8px rgba(219, 8, 110, 0.15)'
              }}
            >
              Inactivas
            </button>
            <button
              onClick={() => setActiveNovedadesSubTab("borrador")}
              className={`w-[100px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
                activeNovedadesSubTab === "borrador" 
                  ? "bg-[#890277] text-white shadow-md" 
                  : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
              }`}
              style={{
                boxShadow: activeNovedadesSubTab === "borrador" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : '0 2px 8px rgba(219, 8, 110, 0.15)'
              }}
            >
              Borrador
            </button>
          </div>

          {/* Componentes de Novedades según sub-pestaña activa */}
          {activeNovedadesSubTab === "activas" && <NovedadesActivas key={`activas-${refreshKey}`} />}
          {activeNovedadesSubTab === "inactivas" && <NovedadesInactivas key={`inactivas-${refreshKey}`} />}
          {activeNovedadesSubTab === "borrador" && <NovedadesBorrador key={`borrador-${refreshKey}`} />}
        </TabsContent>

        {/* Contenido de Autocuidado */}
        <TabsContent value="autocuidado" className="space-y-6 min-h-[600px]">
          <Autocuidado filtroAlerta={filtroAlerta} />
        </TabsContent>

        {/* Contenido de Parámetros */}
        <TabsContent value="parametros" className="space-y-6 min-h-[600px]">
          <Parametros />
        </TabsContent>

        {/* Contenido de Sponsors */}
        <TabsContent value="sponsors" className="space-y-6 min-h-[600px]">
          <Sponsors key={`sponsors-${refreshKey}`} />
        </TabsContent>
      </Tabs>

      {/* Modal de Agregar Promoción */}
      <AgregarPromocionModal
        isOpen={isAgregarModalOpen}
        onClose={() => setIsAgregarModalOpen(false)}
        onSave={handleAgregarPromocion}
      />

      {/* Modal de Agregar Novedad */}
      <AgregarNovedadModal
        isOpen={isAgregarNovedadModalOpen}
        onClose={() => setIsAgregarNovedadModalOpen(false)}
        onSave={handleAgregarNovedad}
      />

      {/* Modal de Agregar Parámetro */}
      <AgregarParametroModal
        isOpen={isAgregarParametroModalOpen}
        onClose={() => setIsAgregarParametroModalOpen(false)}
        onSave={handleAgregarParametro}
      />

      {/* Modal de Agregar Sponsor */}
      <AgregarSponsorModal
        isOpen={isAgregarSponsorModalOpen}
        onClose={() => setIsAgregarSponsorModalOpen(false)}
        onSave={handleAgregarSponsor}
      />
    </div>
  )
}
