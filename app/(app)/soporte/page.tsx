"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { SendIcon, Plus, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangeModal } from "@/components/shared/date-range-modal"
import { 
  MensajeIcon, MensajeColorIcon,
  PreguntasIcon, PreguntasColorIcon,
  PaginasEstaticasIcon, PaginasEstaticasColorIcon,
  NormativaIcon, NormativaColorIcon,
  ReclamosIcon, ReclamosColorIcon
} from "@/components/icons/soporte-icons"
import { Notificaciones } from "@/components/soporte/notificaciones"
import { PreguntasFrecuentes } from "@/components/soporte/preguntas-frecuentes/preguntas-frecuentes"
import { PaginasEstaticas } from "@/components/soporte/paginas-estaticas/paginas-estaticas"
import { Normativa } from "@/components/soporte/normativa/normativa"
import { Reclamos } from "@/components/soporte/reclamos"
import { EnviarNotificacionModal, EnviarMensajeModal, AgregarPreguntaModal, AgregarPaginaEstaticaModal, AgregarNormativaModal } from "@/components/modals/soporte"

interface NotificacionData {
  para: string
  asunto: string
  notificacion: string
  link: string
}

interface MensajeData {
  para: string
  asunto: string
  mensaje: string
  link: string
}

export default function SoportePage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("notificaciones")
  const [isEnviarModalOpen, setIsEnviarModalOpen] = useState(false)
  const [isEnviarMensajeModalOpen, setIsEnviarMensajeModalOpen] = useState(false)
  const [isAgregarPreguntaModalOpen, setIsAgregarPreguntaModalOpen] = useState(false)
  const [isAgregarPaginaEstaticaModalOpen, setIsAgregarPaginaEstaticaModalOpen] = useState(false)
  const [isAgregarNormativaModalOpen, setIsAgregarNormativaModalOpen] = useState(false)
  const [isDateRangeModalOpen, setIsDateRangeModalOpen] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState("hoy")
  const [preguntasRefreshTrigger, setPreguntasRefreshTrigger] = useState(0)
  const [paginasRefreshTrigger, setPaginasRefreshTrigger] = useState(0)

  // Manejar el parámetro tab de la URL
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam && ['notificaciones', 'preguntas', 'paginas', 'normativa', 'reclamos'].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  const handleSendNotification = (data: NotificacionData) => {
    console.log("Enviando notificación:", data)
    // Aquí iría la lógica para enviar la notificación
  }

  const handleSendMensaje = (data: MensajeData) => {
    console.log("Enviando mensaje:", data)
    // Aquí iría la lógica para enviar el mensaje
  }

  const handleAddPregunta = (data: any) => {
    console.log("Pregunta agregada exitosamente:", data)
    // Solo actualizar la tabla de preguntas, no recargar toda la página
    setPreguntasRefreshTrigger(prev => prev + 1)
    setIsAgregarPreguntaModalOpen(false)
  }

  const handleAddPaginaEstatica = (data: any) => {
    console.log("Página estática agregada exitosamente:", data)
    // Actualizar la tabla de páginas estáticas, no recargar toda la página
    setPaginasRefreshTrigger(prev => prev + 1)
    setIsAgregarPaginaEstaticaModalOpen(false)
  }

  const handleAddNormativa = (data: { titulo: string; descripcion: string; archivo?: File; link: string; enviarAlerta: boolean }) => {
    console.log("Agregando normativa:", data)
    // Aquí iría la lógica para agregar la normativa
  }

  const handleDateRangeChange = (value: string) => {
    setSelectedDateRange(value)
    if (value === "especifica") {
      setIsDateRangeModalOpen(true)
    }
  }

  return (
    <div className="space-y-6 p-5 pt-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#DB086E] to-[#3A05DF] bg-clip-text text-transparent">
            Soporte
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {/* Rango de fechas y botón Enviar (solo para reclamos) */}
          {activeTab === "reclamos" ? (
            <div className="flex items-end gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-600">Rango de fecha</span>
                <Select value={selectedDateRange} onValueChange={handleDateRangeChange}>
                  <SelectTrigger className="w-48 h-10 text-[#A4A4A4] text-sm font-medium border-gray-300 hover:bg-gray-50">
                    <SelectValue placeholder="Seleccionar rango" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hoy">Hoy</SelectItem>
                    <SelectItem value="semana-pasada">La semana pasada</SelectItem>
                    <SelectItem value="mes-pasado">El mes pasado</SelectItem>
                    <SelectItem value="especifica">Una fecha específica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <GradientButton 
                onClick={() => setIsEnviarMensajeModalOpen(true)}
                className="px-6 py-2 rounded-md font-medium flex items-center gap-2"
              >
                <SendIcon className="w-4 h-4" />
                Enviar
              </GradientButton>
            </div>
          ) : activeTab === "notificaciones" ? (
            <GradientButton 
              onClick={() => setIsEnviarModalOpen(true)}
              className="px-6 py-2 rounded-md font-medium flex items-center gap-2"
            >
              <SendIcon className="w-4 h-4" />
              Enviar
            </GradientButton>
          ) : activeTab === "preguntas" ? (
            <GradientButton 
              onClick={() => setIsAgregarPreguntaModalOpen(true)}
              className="px-6 py-2 rounded-md font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Agregar
            </GradientButton>
          ) : activeTab === "paginas" ? (
            <GradientButton 
              onClick={() => setIsAgregarPaginaEstaticaModalOpen(true)}
              className="px-6 py-2 rounded-md font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Agregar
            </GradientButton>
          ) : activeTab === "normativa" ? (
            <GradientButton 
              onClick={() => setIsAgregarNormativaModalOpen(true)}
              className="px-6 py-2 rounded-md font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Agregar
            </GradientButton>
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
            value="notificaciones"
            className="flex items-center gap-2 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeTab === "notificaciones" ? <MensajeColorIcon /> : <MensajeIcon />}
            Notificaciones
          </TabsTrigger>
          <TabsTrigger
            value="preguntas"
            className="flex items-center gap-2 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeTab === "preguntas" ? <PreguntasColorIcon /> : <PreguntasIcon />}
            Preguntas frecuentes
          </TabsTrigger>
          <TabsTrigger
            value="paginas"
            className="flex items-center gap-2 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeTab === "paginas" ? <PaginasEstaticasColorIcon /> : <PaginasEstaticasIcon />}
            Páginas estáticas
          </TabsTrigger>
          <TabsTrigger
            value="normativa"
            className="flex items-center gap-2 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeTab === "normativa" ? <NormativaColorIcon /> : <NormativaIcon />}
            Normativa
          </TabsTrigger>
          <TabsTrigger
            value="reclamos"
            className="flex items-center gap-2 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeTab === "reclamos" ? <ReclamosColorIcon /> : <ReclamosIcon />}
            Reclamos
          </TabsTrigger>
        </TabsList>

        {/* Contenido de Notificaciones */}
        <TabsContent value="notificaciones" className="space-y-6 h-[600px] overflow-y-auto">
          <Notificaciones />
        </TabsContent>

        {/* Contenido de Preguntas Frecuentes */}
        <TabsContent value="preguntas" className="space-y-6 h-[600px] overflow-y-auto">
          <PreguntasFrecuentes refreshTrigger={preguntasRefreshTrigger} />
        </TabsContent>

        {/* Contenido de Páginas Estáticas */}
        <TabsContent value="paginas" className="space-y-6 h-[600px] overflow-y-auto">
          <PaginasEstaticas refreshTrigger={paginasRefreshTrigger} />
        </TabsContent>

        {/* Contenido de Normativa */}
        <TabsContent value="normativa" className="space-y-6 h-[600px] overflow-y-auto">
          <Normativa />
        </TabsContent>

        {/* Contenido de Reclamos */}
        <TabsContent value="reclamos" className="space-y-6 h-[600px] overflow-y-auto">
          <Reclamos />
        </TabsContent>
      </Tabs>

      {/* Modal de Enviar Notificación */}
      <EnviarNotificacionModal
        isOpen={isEnviarModalOpen}
        onClose={() => setIsEnviarModalOpen(false)}
        onSend={handleSendNotification}
      />

      {/* Modal de Enviar Mensaje */}
      <EnviarMensajeModal
        isOpen={isEnviarMensajeModalOpen}
        onClose={() => setIsEnviarMensajeModalOpen(false)}
        onSend={handleSendMensaje}
      />

              {/* Modal de Agregar Pregunta */}
        <AgregarPreguntaModal
          isOpen={isAgregarPreguntaModalOpen}
          onClose={() => setIsAgregarPreguntaModalOpen(false)}
          onAdd={handleAddPregunta}
        />

        {/* Modal de Agregar Página Estática */}
        <AgregarPaginaEstaticaModal
          isOpen={isAgregarPaginaEstaticaModalOpen}
          onClose={() => setIsAgregarPaginaEstaticaModalOpen(false)}
          onAdd={handleAddPaginaEstatica}
        />

        {/* Modal de Agregar Normativa */}
        <AgregarNormativaModal
          isOpen={isAgregarNormativaModalOpen}
          onClose={() => setIsAgregarNormativaModalOpen(false)}
          onAdd={handleAddNormativa}
        />

        {/* Modal de Rango de Fechas */}
        <DateRangeModal
          isOpen={isDateRangeModalOpen}
          onClose={() => setIsDateRangeModalOpen(false)}
          onSelectDates={(startDate: Date, endDate: Date) => {
            console.log("Fechas seleccionadas:", startDate, endDate)
            setIsDateRangeModalOpen(false)
          }}
        />
    </div>
  )
}
