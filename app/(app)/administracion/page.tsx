"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  UsuariosIconColor, UsuariosIcon,
  SuscripcionesIconColor, SuscripcionesIcon,
  ConcursosIconColor, ConcursosIcon
} from "@/components/icons/adminitracion-icon"

import { Usuarios } from "@/components/administracion/usuarios"
import { usuarioApi, concursoApi } from "@/lib/api"
import { SuscriptoresPermanentes } from "@/components/administracion/suscriptores/permanentes"
import { SuscriptoresTemporales } from "@/components/administracion/suscriptores/temporales"
import { Concursos } from "@/components/administracion/concursos"
import { AgregarUsuarioModal, AgregarConcursoModal } from "@/components/modals/administracion"
import { EditarSuscriptorPermanente } from "@/components/administracion/suscriptores/editar-suscriptor-permanente"

export default function AdministracionPage() {
  const [activeTab, setActiveTab] = useState("usuarios")
  const [activeSubTab, setActiveSubTab] = useState("permanentes")
  
  // Estado para el modal de agregar usuario
  const [isAgregarModalOpen, setIsAgregarModalOpen] = useState(false)
  
  // Estado para refrescar la lista de usuarios
  const [refreshUsers, setRefreshUsers] = useState(0)
  
  // Estado para refrescar la lista de concursos
  const [refreshConcursos, setRefreshConcursos] = useState(0)
  
  // Estados para los modales de concursos
  const [isAgregarConcursoModalOpen, setIsAgregarConcursoModalOpen] = useState(false)
  
  // Estados para la vista de edición de suscriptor
  const [showEditView, setShowEditView] = useState(false)
  const [selectedSuscriptor, setSelectedSuscriptor] = useState<any>(null)

  // Función para manejar el modal de agregar usuario
  const handleAgregarUsuario = async (data: any) => {
    console.log("✅ Usuario creado desde el modal:", data)
    setIsAgregarModalOpen(false)
    setRefreshUsers(prev => prev + 1)
  }

  // Funciones para manejar los modales de concursos
  const handleAgregarConcurso = async (data: any) => {
    console.log("✅ Concurso creado desde el modal:", data)
    setIsAgregarConcursoModalOpen(false)
    setRefreshConcursos(prev => prev + 1)
  }


  // Función para manejar la vista de edición de suscriptor
  const handleEditSuscriptor = (suscriptor: any) => {
    setSelectedSuscriptor(suscriptor)
    setShowEditView(true)
  }

  // Si se debe mostrar la vista de edición, renderizamos esa vista
  if (showEditView && selectedSuscriptor) {
    return (
      <div className="p-0">
        <EditarSuscriptorPermanente
          onBack={() => setShowEditView(false)}
          subscriberData={{
            usuarioTiktok: selectedSuscriptor.usuarioTiktok,
            nombre: selectedSuscriptor.nombre.split(' ')[0] || '',
            apellido: selectedSuscriptor.nombre.split(' ').slice(1).join(' ') || '',
            documento: "000000012",
            fechaNacimiento: "12/02/1992",
            celular: "938 000 000",
            nacionalidad: "Peruana",
            ciudad: "Lima",
            distrito: "Miraflores",
            correo: "jesus@gmail.com",
            genero: "Masculino",
            wcDisponibles: "938 000 000",
            billeteraMovil: "Yape",
            celularBilletera: "938 000 000",
            institucionBancaria: "BCP",
            numeroCuenta: "000 000 000 000 08",
            esPPE: false,
            estado: selectedSuscriptor.estado === "Activo"
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
            Administración
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {/* Botón Agregar solo visible en Usuarios y Concursos */}
          {activeTab === "usuarios" ? (
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
          ) : activeTab === "concursos" ? (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600">&nbsp;</span>
              <button 
                onClick={() => setIsAgregarConcursoModalOpen(true)}
                className="bg-gradient-to-r from-[#DB086E] to-[#3A05DF] text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Agregar
              </button>
            </div>
          ) : (
            /* Espacio invisible para mantener la altura en Suscriptores */
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600">&nbsp;</span>
              <div className="h-10 w-24"></div>
            </div>
          )}
        </div>
      </div>

      {/* Pestañas principales */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex w-full justify-start gap-1 mb-6 bg-transparent border-none shadow-none">
          <TabsTrigger
            value="usuarios"
            className="flex items-center gap-0 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeTab === "usuarios" ? <UsuariosIconColor /> : <UsuariosIcon />}
            Usuarios
          </TabsTrigger>
          <TabsTrigger
            value="suscriptores"
            className="flex items-center gap-0 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeTab === "suscriptores" ? <SuscripcionesIconColor /> : <SuscripcionesIcon />}
            Suscriptores
          </TabsTrigger>
          <TabsTrigger
            value="concursos"
            className="flex items-center gap-0 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {activeTab === "concursos" ? <ConcursosIconColor /> : <ConcursosIcon />}
            Concursos
          </TabsTrigger>
        </TabsList>

        {/* Contenido de Usuarios */}
        <TabsContent value="usuarios" className="space-y-6">
          <Usuarios refreshTrigger={refreshUsers} />
        </TabsContent>

        {/* Contenido de Suscriptores */}
        <TabsContent value="suscriptores" className="space-y-6">
          {/* Sub-pestañas de Suscriptores */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setActiveSubTab("permanentes")}
              className={`w-[100px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
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

          {/* Contenido de las sub-pestañas */}
          {activeSubTab === "permanentes" && (
            <SuscriptoresPermanentes onEditSuscriptor={handleEditSuscriptor} />
          )}
          {activeSubTab === "temporales" && (
            <SuscriptoresTemporales onEditSuscriptor={handleEditSuscriptor} />
          )}
        </TabsContent>

        {/* Contenido de Concursos */}
        <TabsContent value="concursos" className="space-y-6">
          <Concursos 
            refreshTrigger={refreshConcursos}
          />
        </TabsContent>
      </Tabs>

      {/* Modal de Agregar Usuario */}
      <AgregarUsuarioModal
        isOpen={isAgregarModalOpen}
        onClose={() => setIsAgregarModalOpen(false)}
        onSave={handleAgregarUsuario}
      />

      {/* Modales de Concursos */}
      <AgregarConcursoModal
        isOpen={isAgregarConcursoModalOpen}
        onClose={() => setIsAgregarConcursoModalOpen(false)}
        onSave={handleAgregarConcurso}
      />

    </div>
  )
}
