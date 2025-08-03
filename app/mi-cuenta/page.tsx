"use client"

import { useState } from "react"
import {
  PerfilIcon, PerfilIconNegro,
  PromocionesIcon, PromocionesIconNegro,
  HistorialIcon, HistorialIconNegro,
  AutocuidadoIcon, AutocuidadoIconNegro,
  ContraseñaIcon, ContraseñaIconNegro,
} from "@/components/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PromotionCard, PromotionCardWithoutButton } from "@/components/mi-cuenta/promotion-card"
import { PromotionRequestedTable } from "@/components/mi-cuenta/promotion-requested-table"
import { ProfileForm } from "@/components/mi-cuenta/profile-form"
import { HistoryTable } from "@/components/mi-cuenta/history-table"
import { ContestTable } from "@/components/shared/contest-table"
import { PromotionTable } from "@/components/mi-cuenta/promotion-table"
import { AutocuidadoForm } from "@/components/mi-cuenta/autocuidado-form"
import { PasswordForm } from "@/components/mi-cuenta/password-form" // Importar el nuevo componente
import { PromotionDetailsModal } from "@/components/mi-cuenta/promotion-details-modal" // Importar el modal de detalles
import { DateRangeSelect } from "@/components/shared/date-range-select" // Importar el DateRangeSelect
import { GradientButton } from "@/components/ui/gradient-button" // Importar el botón con degradado
import { NotificationToast } from "@/components/ui/notification-toast"
import {
  PROMOTIONS_DATA,
  PROFILE_DATA,
  HISTORY_TRANSACTIONS_DATA,
  HISTORY_CONTESTS_DATA,
  HISTORY_PROMOTIONS_DATA,
} from "@/lib/constants"
import type { PromotionCardData } from "@/types"

export default function MiCuentaPage() {
  const [activeMainTab, setActiveMainTab] = useState("perfil")
  const [activePromotionsSubTab, setActivePromotionsSubTab] = useState("activas")
  const [activeHistorySubTab, setActiveHistorySubTab] = useState("transacciones")
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  // State para el modal de promociones
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false)
  const [selectedPromotion, setSelectedPromotion] = useState<PromotionCardData | null>(null)
  const [showPromotionToast, setShowPromotionToast] = useState(false)
  const [showProfileToast, setShowProfileToast] = useState(false)

  const handleViewPromotionDetails = (promotion: PromotionCardData) => {
    setSelectedPromotion(promotion)
    setIsPromotionModalOpen(true)
  }

  const handleDateRangeChange = (value: string) => {
    console.log("Selected date range for Mi Cuenta:", value)
    // Implement filtering logic here based on the selected value
  }

  const handleEditProfile = () => {
    setIsEditingProfile(true)
  }

  const handleSaveProfile = () => {
    setIsEditingProfile(false)
    // Aquí se implementaría la lógica para guardar los datos
    console.log("Guardando perfil...")
    // Se ejecutará la limpieza automática de entradas vacías en el ProfileForm
    setShowProfileToast(true)
  }

  const handlePromotionRequest = () => {
    setShowPromotionToast(true)
  }

  return (
    <div className="space-y-6 p-[50px]">
      {/* Header */}
      <div className="flex items-center justify-between min-h-[80px]">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mi cuenta</h1>
        </div>
        <div className="flex items-center">
          {activeMainTab === "perfil" && (
            <GradientButton onClick={isEditingProfile ? handleSaveProfile : handleEditProfile}>
              {isEditingProfile ? "Guardar" : "Editar"}
            </GradientButton>
          )}
          {(activeMainTab === "promociones" || activeMainTab === "historial") && (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600">Rango de fecha</span>
              <DateRangeSelect onSelectChange={handleDateRangeChange} />
            </div>
          )}
        </div>
      </div>

      {/* Pestañas principales */}
      <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
        <TabsList className="flex w-full justify-start gap-5 mb-6 bg-transparent border-none shadow-none">
          <TabsTrigger
            value="perfil"
            className="flex items-center gap-3 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeMainTab === "perfil" ? <PerfilIcon /> : <PerfilIconNegro />}
            Perfil
          </TabsTrigger>
          <TabsTrigger
            value="promociones"
            className="flex items-center gap-3 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeMainTab === "promociones" ? <PromocionesIcon /> : <PromocionesIconNegro />}
            Promociones
          </TabsTrigger>
          <TabsTrigger
            value="historial"
            className="flex items-center gap-3 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeMainTab === "historial" ? <HistorialIcon /> : <HistorialIconNegro />}
            Historial
          </TabsTrigger>
          <TabsTrigger
            value="autocuidado"
            className="flex items-center gap-3 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeMainTab === "autocuidado" ? <AutocuidadoIcon /> : <AutocuidadoIconNegro />}
            Autocuidado
          </TabsTrigger>
          <TabsTrigger
            value="contrasena"
            className="flex items-center gap-3 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeMainTab === "contrasena" ? <ContraseñaIcon /> : <ContraseñaIconNegro />}
            Contraseña
          </TabsTrigger>
        </TabsList>

        {/* Contenido de Perfil */}
        <TabsContent value="perfil" className="pt-6">
          <div className="space-y-6">
            <ProfileForm 
              data={PROFILE_DATA} 
              isEditing={isEditingProfile}
              onSave={handleSaveProfile}
              onEdit={handleEditProfile}
            />
          </div>
        </TabsContent>

        {/* Contenido de Promociones */}
        <TabsContent value="promociones" className="pt-6">
          <div className="space-y-6">
            {/* Sub-pestañas para Promociones */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActivePromotionsSubTab("activas")}
                className={`w-[90px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
                  activePromotionsSubTab === "activas"
                    ? "bg-[#890277] text-white shadow-md"
                    : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
                }`}
              >
                Activas
              </button>
              <button
                onClick={() => setActivePromotionsSubTab("vencidas")}
                className={`w-[90px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
                  activePromotionsSubTab === "vencidas"
                    ? "bg-[#890277] text-white shadow-md"
                    : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
                }`}
              >
                Vencidas
              </button>
              <button
                onClick={() => setActivePromotionsSubTab("solicitadas")}
                className={`w-[90px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
                  activePromotionsSubTab === "solicitadas"
                    ? "bg-[#890277] text-white shadow-md"
                    : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
                }`}
              >
                Solicitadas
              </button>
            </div>

            {/* Contenido de las sub-pestañas de Promociones */}
            {activePromotionsSubTab === "activas" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROMOTIONS_DATA.filter(promo => promo.status === "activas").map((promo) => (
                  <PromotionCard key={promo.id} {...promo} onViewDetails={handleViewPromotionDetails} />
                ))}
              </div>
            )}
            {activePromotionsSubTab === "vencidas" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROMOTIONS_DATA.filter(promo => promo.status === "vencidas").map((promo) => (
                  <PromotionCardWithoutButton key={promo.id} {...promo} onViewDetails={handleViewPromotionDetails} />
                ))}
              </div>
            )}
                          {activePromotionsSubTab === "solicitadas" && (
                <PromotionRequestedTable data={PROMOTIONS_DATA.filter(promo => promo.status === "solicitadas" || promo.status === "activas")} onViewDetails={handleViewPromotionDetails} />
              )}
          </div>
        </TabsContent>

        {/* Contenido de Historial */}
        <TabsContent value="historial" className="pt-6">
          <div className="space-y-6">
            {/* Sub-pestañas para Historial */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveHistorySubTab("transacciones")}
                className={`w-[100px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
                  activeHistorySubTab === "transacciones"
                    ? "bg-[#890277] text-white shadow-md"
                    : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
                }`}
              >
                Transacciones
              </button>
              <button
                onClick={() => setActiveHistorySubTab("concursos")}
                className={`w-[90px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
                  activeHistorySubTab === "concursos" 
                    ? "bg-[#890277] text-white shadow-md" 
                    : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
                }`}
              >
                Concursos
              </button>
              <button
                onClick={() => setActiveHistorySubTab("promociones")}
                className={`w-[90px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
                  activeHistorySubTab === "promociones"
                    ? "bg-[#890277] text-white shadow-md"
                    : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
                }`}
              >
                Promociones
              </button>
            </div>

            {/* Contenido de las sub-pestañas de Historial */}
            {activeHistorySubTab === "transacciones" && <HistoryTable data={HISTORY_TRANSACTIONS_DATA} />}
            {activeHistorySubTab === "concursos" && <ContestTable data={HISTORY_CONTESTS_DATA} showStatus={true} showReward={false} />}
            {activeHistorySubTab === "promociones" && <PromotionTable data={HISTORY_PROMOTIONS_DATA} />}
          </div>
        </TabsContent>

        {/* Contenido de Autocuidado */}
        <TabsContent value="autocuidado" className="pt-6">
          <div className="space-y-6">
            <AutocuidadoForm />
          </div>
        </TabsContent>

        {/* Contenido de Contraseña */}
        <TabsContent value="contrasena" className="pt-6">
          <div className="space-y-6">
            <PasswordForm />
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de detalles de promoción */}
      {selectedPromotion && (
        <PromotionDetailsModal
          isOpen={isPromotionModalOpen}
          onClose={() => setIsPromotionModalOpen(false)}
          promotion={selectedPromotion.details}
          onRequest={handlePromotionRequest}
          isExpired={selectedPromotion.status === "vencidas"}
        />
      )}

      {/* Toast de promoción solicitada */}
      <NotificationToast
        title="Promoción solicitada"
        message="Tu solicitud ha sido enviada exitosamente."
        type="success"
        isVisible={showPromotionToast}
        onClose={() => setShowPromotionToast(false)}
      />

      {/* Toast de perfil guardado */}
      <NotificationToast
        title="Perfil actualizado"
        message="Tu información ha sido guardada exitosamente."
        type="success"
        isVisible={showProfileToast}
        onClose={() => setShowProfileToast(false)}
      />
    </div>
  )
}
