"use client"

import { useState } from "react"
import {
  IngresosIconColor, IngresosIcon,
  SalidasIconColor, SalidasIcon
} from "@/components/icons/transaction-icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangeSelect } from "@/components/shared/date-range-select"
import { TodasSalidas } from "@/components/transactions/todas-salidas"
import { EnProcesoSalidas } from "@/components/transactions/en-proceso-salidas"
import { AprobadasSalidas } from "@/components/transactions/aprobadas-salidas"
import { IncomeModal } from "@/components/modals/income-modal"
import { Temporales } from "@/components/transactions/temporales"
import { Permanentes } from "@/components/transactions/permanentes"
import { DetalleSuscriptor } from "@/components/transactions/detalle-suscriptor"

export default function TransaccionesPage() {
  const [activeTransactionTab, setActiveTransactionTab] = useState("ingresos")
  const [activeSubTab, setActiveSubTab] = useState("permanentes")
  const [activeWithdrawalTab, setActiveWithdrawalTab] = useState("todas")
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")
  const [editingIncome, setEditingIncome] = useState<any>(null)
  const [showDetailView, setShowDetailView] = useState(false)
  const [selectedSubscriber, setSelectedSubscriber] = useState<any>(null)
  const [withdrawalDateRange, setWithdrawalDateRange] = useState("")

  const handleDateRangeChange = (value: string) => {
    console.log("Selected date range for Transactions:", value)
  }

  const handleWithdrawalDateRangeChange = (value: string) => {
    setWithdrawalDateRange(value)
    console.log("Selected date range for Withdrawals:", value)
  }

  const handleOpenAddModal = () => {
    setModalMode("add")
    setEditingIncome(null)
    setIsIncomeModalOpen(true)
  }

  const handleOpenEditModal = (income: any) => {
    setModalMode("edit")
    setEditingIncome(income)
    setIsIncomeModalOpen(true)
  }

  const handleSaveIncome = (data: any) => {
    if (modalMode === "add") {
      console.log("Agregando nuevo ingreso:", data)
      // Aquí iría la lógica para agregar
    } else {
      console.log("Editando ingreso:", data)
      // Aquí iría la lógica para editar
    }
  }

  const handleViewSubscriberDetail = (subscriber: any) => {
    setSelectedSubscriber(subscriber)
    setShowDetailView(true)
  }
  
  // Si se debe mostrar la vista de detalles, renderizamos esa vista
  if (showDetailView && selectedSubscriber) {
    return (
      <div className="p-0">
        <DetalleSuscriptor
          onBack={() => setShowDetailView(false)}
          subscriberData={{
            usuarioTiktok: selectedSubscriber.nombre,
            nombre: "Jesús",
            apellido: "López",
            documento: "000000012",
            fechaNacimiento: "12/02/1992",
            celular: "938 000 000",
            nacionalidad: "Peruana",
            ciudad: "Lima",
            distrito: "Miraflores",
            correo: "Jesus@gmail.com",
            genero: "Masculino",
            wcDisponibles: selectedSubscriber.wcDisponibles,
            billeteraMovil: "Yape",
            celularBilletera: "941000321",
            institucionBancaria: "BCP",
            numeroCuenta: "000 000 000 000 08",
            esPPE: false
          }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-5 pt-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#DB086E] to-[#3A05DF] bg-clip-text text-transparent">
            Transacciones
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {/* Rango de fecha solo visible en Permanentes */}
          {activeTransactionTab === "ingresos" && activeSubTab === "permanentes" && (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600">Rango de fecha</span>
              <DateRangeSelect onSelectChange={handleDateRangeChange} />
            </div>
          )}
          
          {/* Botón Generar reporte solo visible en Ingresos > Permanentes */}
          {activeTransactionTab === "ingresos" && activeSubTab === "permanentes" && (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600">&nbsp;</span>
              <button className="bg-gradient-to-r from-[#DB086E] to-[#3A05DF] text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity font-medium">
                Generar reporte
              </button>
            </div>
          )}
          
          {/* Botón Agregar solo visible en Ingresos > Temporales */}
          {activeTransactionTab === "ingresos" && activeSubTab === "temporales" && (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600">&nbsp;</span>
              <button 
                onClick={handleOpenAddModal}
                className="bg-gradient-to-r from-[#DB086E] to-[#3A05DF] text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity font-medium"
              >
                Agregar
              </button>
            </div>
          )}

          {/* Rango de fecha solo visible en Salidas */}
          {activeTransactionTab === "salidas" && (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600">Rango de fecha</span>
              <DateRangeSelect onSelectChange={handleWithdrawalDateRangeChange} selectedValue={withdrawalDateRange} />
            </div>
          )}
          
          {/* Botón Generar reporte solo visible en Salidas */}
          {activeTransactionTab === "salidas" && (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600">&nbsp;</span>
              <button 
                onClick={() => console.log("Generando reporte de salidas con rango:", withdrawalDateRange)}
                className="bg-gradient-to-r from-[#DB086E] to-[#3A05DF] text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity font-medium"
              >
                Generar reporte
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pestañas principales */}
      <Tabs value={activeTransactionTab} onValueChange={setActiveTransactionTab} className="w-full">
        <TabsList className="flex w-full justify-start gap-2 mb-6 bg-transparent border-none shadow-none">
          <TabsTrigger
            value="ingresos"
            className="flex items-center gap-0 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeTransactionTab === "ingresos" ? <IngresosIconColor /> : <IngresosIcon />}
            Ingresos
          </TabsTrigger>
          <TabsTrigger
            value="salidas"
            className="flex items-center gap-0 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeTransactionTab === "salidas" ? <SalidasIconColor /> : <SalidasIcon />}
            Salidas
          </TabsTrigger>
        </TabsList>

        {/* Contenido de Ingresos */}
        <TabsContent value="ingresos" className="space-y-6">
          {/* Sub-pestañas para Ingresos */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setActiveSubTab("permanentes")}
              className={`w-[100px] h-6 px-1  rounded-[50px] font-medium transition-all duration-200 text-sm ${
                activeSubTab === "permanentes" 
                  ? "bg-[#890277] text-white shadow-md" 
                  : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
              }`}
              style={{
                boxShadow: activeSubTab === "permanentes" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : '0 2px 8px rgba(219, 8, 110, 0.15)'
              }}
            >
              Permanentes
            </button>
            <button
              onClick={() => setActiveSubTab("temporales")}
              className={`w-[100px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
                activeSubTab === "temporales" 
                  ? "bg-[#890277] text-white shadow-md" 
                  : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
              }`}
              style={{
                boxShadow: activeSubTab === "temporales" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : '0 2px 8px rgba(219, 8, 110, 0.15)'
              }}
            >
              Temporales
            </button>
          </div>

          {/* Contenido específico según sub-pestaña */}
          {activeSubTab === "permanentes" && (
            <div>
              <Permanentes />
            </div>
          )}
          
          {activeSubTab === "temporales" && (
            <div>
              <Temporales
                onOpenAddModal={handleOpenAddModal}
                onEditIncome={handleOpenEditModal}
              />
            </div>
          )}
        </TabsContent>

        {/* Contenido de Salidas */}
        <TabsContent value="salidas" className="space-y-6">
          {/* Sub-pestañas para Salidas */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveWithdrawalTab("todas")}
              className={`w-[90px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
                activeWithdrawalTab === "todas" 
                  ? "bg-[#890277] text-white shadow-md" 
                  : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
              }`}
              style={{
                boxShadow: activeWithdrawalTab === "todas" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : '0 2px 8px rgba(219, 8, 110, 0.15)'
              }}
            >
              Todas
            </button>
            <button
              onClick={() => setActiveWithdrawalTab("en-proceso")}
              className={`w-[90px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
                activeWithdrawalTab === "en-proceso" 
                  ? "bg-[#890277] text-white shadow-md" 
                  : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
              }`}
              style={{
                boxShadow: activeWithdrawalTab === "en-proceso" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : '0 2px 8px rgba(219, 8, 110, 0.15)'
              }}
            >
              En proceso
            </button>
            <button
              onClick={() => setActiveWithdrawalTab("aprobadas")}
              className={`w-[90px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
                activeWithdrawalTab === "aprobadas" 
                  ? "bg-[#890277] text-white shadow-md" 
                  : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
              }`}
              style={{
                boxShadow: activeWithdrawalTab === "aprobadas" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : '0 2px 8px rgba(219, 8, 110, 0.15)'
              }}
            >
              Aprobadas
            </button>
          </div>

          {/* Contenido de las sub-pestañas de salidas */}
                      {activeWithdrawalTab === "todas" && <TodasSalidas onViewDetail={handleViewSubscriberDetail} />}
            {activeWithdrawalTab === "en-proceso" && <EnProcesoSalidas onViewDetail={handleViewSubscriberDetail} />}
            {activeWithdrawalTab === "aprobadas" && <AprobadasSalidas onViewDetail={handleViewSubscriberDetail} />}
        </TabsContent>
      </Tabs>

      {/* Modal de Ingresos */}
      <IncomeModal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        mode={modalMode}
        initialData={editingIncome}
        onSave={handleSaveIncome}
      />


    </div>
  )
}
