"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RefreshCw, MoreVertical } from "lucide-react"
import { LapizIcon, CandadoIcon, TachoIcon } from "@/components/icons/adminitracion-icon"
import { EditarUsuarioModal, RestablecerPasswordModal, EliminarUsuarioModal } from "@/components/modals/administracion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Usuario {
  id: string
  usuario: string
  nombre: string
  email: string
  rol: string
  estado: string
}

export function Usuarios() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  
  // Estados para modales
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
  const [isRestablecerModalOpen, setIsRestablecerModalOpen] = useState(false)
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null)

  // Datos de ejemplo para usuarios
  const USUARIOS_DATA: Usuario[] = [
    {
      id: "1",
      usuario: "USER_admin1",
      nombre: "María Ramírez",
      email: "Mar@admin.com",
      rol: "Administrador",
      estado: "Activo"
    },
    {
      id: "2",
      usuario: "USER_admin2",
      nombre: "Roy López",
      email: "Roy@admin.com",
      rol: "Administrador",
      estado: "Inactivo"
    }
  ]

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(USUARIOS_DATA.map(item => item.id))
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
    console.log("Refrescando usuarios...")
  }

  const handleDeleteSelected = () => {
    console.log("Eliminando usuarios seleccionados:", selectedItems)
  }

  const handleEditUser = (id: string) => {
    const usuario = USUARIOS_DATA.find(u => u.id === id)
    if (usuario) {
      setUsuarioSeleccionado(usuario)
      setIsEditarModalOpen(true)
    }
  }

  const handleResetPassword = (id: string) => {
    const usuario = USUARIOS_DATA.find(u => u.id === id)
    if (usuario) {
      setUsuarioSeleccionado(usuario)
      setIsRestablecerModalOpen(true)
    }
  }

  const handleDeleteUser = (id: string) => {
    const usuario = USUARIOS_DATA.find(u => u.id === id)
    if (usuario) {
      setUsuarioSeleccionado(usuario)
      setIsEliminarModalOpen(true)
    }
  }



  const handleEditarUsuario = (data: any) => {
    console.log("Editando usuario:", data)
    // Aquí iría la lógica para editar el usuario
  }

  const handleRestablecerPassword = (data: any) => {
    console.log("Restableciendo contraseña:", data)
    // Aquí iría la lógica para restablecer la contraseña
  }

  const handleConfirmarEliminar = (id: string) => {
    console.log("Confirmando eliminación del usuario:", id)
    // Aquí iría la lógica para eliminar el usuario
  }

  return (
    <div className="space-y-6">
      {/* Controles superiores */}
      <div className="flex items-center gap-2 pl-6">
        <Checkbox
          checked={selectAll}
          onCheckedChange={handleSelectAll}
          className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
        >
          <RefreshCw className="w-5 h-5" />
        </Button>
        {selectedItems.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeleteSelected}
          >
            <TachoIcon />
          </Button>
        )}
      </div>



      {/* Validación: Mostrar imagen si no hay usuarios o tabla si hay usuarios */}
      {USUARIOS_DATA.length === 0 ? (
        // Estado vacío: Mostrar imagen
        <div className="flex flex-col items-center justify-center py-12">
          <img 
            src="/administracion_usuarios.png" 
            alt="No hay usuarios registrados" 
            className="w-80 h-80 object-contain mb-4"
          />
        </div>
      ) : (
        // Estado con datos: Mostrar tabla
        <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)' }}>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead className="border-b border-gray-200" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <tr>
                  <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                    Usuario
                  </th>
                  <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                    Nombre
                  </th>
                  <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                    Correo electrónico
                  </th>
                  <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                    Rol
                  </th>
                  <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                    Estado
                  </th>
                  <th className="w-1/6 px-6 py-3 text-center text-sm font-medium text-gray-900">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#FBFBFB]">
                {USUARIOS_DATA.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className="bg-[#FBFBFB]"
                    style={{ 
                      borderBottom: index < USUARIOS_DATA.length - 1 ? '1px solid #A4A4A4' : 'none'
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                          className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
                        />
                        <span className="text-sm font-normal text-gray-900 flex-1 text-center">{item.usuario}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                      {item.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                      {item.rol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.estado === "Activo" 
                          ? "bg-[#6137E5] text-white" 
                          : "bg-[#FBFBFB] text-[#6137E5] border border-[#6137E5]"
                      }`}>
                        {item.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#1C1C1C] hover:text-[#6137E5]"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-54">
                          <DropdownMenuItem onClick={() => handleEditUser(item.id)} className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium">
                            <LapizIcon />
                            Editar usuario
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleResetPassword(item.id)} className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium">
                            <CandadoIcon />
                            Reestablecer contraseña
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteUser(item.id)} className="flex items-center gap-2 text-[#A4A4A4] cursor-pointer text-sm font-medium">
                            <TachoIcon />
                            Eliminar usuario
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}



      {usuarioSeleccionado && (
        <>
          <EditarUsuarioModal
            isOpen={isEditarModalOpen}
            onClose={() => setIsEditarModalOpen(false)}
            initialData={usuarioSeleccionado}
            onSave={handleEditarUsuario}
          />

          <RestablecerPasswordModal
            isOpen={isRestablecerModalOpen}
            onClose={() => setIsRestablecerModalOpen(false)}
            usuario={usuarioSeleccionado}
            onSave={handleRestablecerPassword}
          />

          <EliminarUsuarioModal
            isOpen={isEliminarModalOpen}
            onClose={() => setIsEliminarModalOpen(false)}
            usuario={usuarioSeleccionado}
            onConfirm={handleConfirmarEliminar}
          />
        </>
      )}
    </div>
  )
}
