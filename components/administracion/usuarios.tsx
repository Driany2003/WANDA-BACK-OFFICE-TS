"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RefreshCw, MoreVertical, AlertCircle } from "lucide-react"
import { LapizIcon, CandadoIcon, TachoIcon } from "@/components/icons/adminitracion-icon"
import { EditarUsuarioModal, RestablecerPasswordModal, EliminarUsuarioModal } from "@/components/modals/administracion"
import { usuarioApi, UsuarioAdminDTO, UsuarioUpdateDTO } from "@/lib/api"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Usuario {
  id: string
  username: string
  nombre: string
  apellido: string
  email: string
  authRol: string
  estado: string
}

interface UsuariosProps {
  refreshTrigger?: number;
}

export function Usuarios({ refreshTrigger = 0 }: UsuariosProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  
  // Estados para modales
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
  const [isRestablecerModalOpen, setIsRestablecerModalOpen] = useState(false)
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null)

  // Fetch users from API
  const fetchUsuarios = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await usuarioApi.findAll()
      
      // Transform API data to component format
      const transformedData: Usuario[] = data.map((user: UsuarioAdminDTO) => ({
        id: user.id,
        username: user.authUsername,
        nombre: `${user.nombre} ${user.apellido}`,
        apellido: user.apellido,
        email: user.correo,
        authRol: user.authRol,
        estado: user.estado === "Activo" ? "Activo" : "Inactivo"
      }))
      
      setUsuarios(transformedData)
    } catch (err) {
      console.error('Error fetching users:', err)
      setError(err instanceof Error ? err.message : 'Error al cargar los usuarios')
    } finally {
      setLoading(false)
    }
  }

  // Load users on component mount and when refreshTrigger changes
  useEffect(() => {
    fetchUsuarios()
  }, [refreshTrigger])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(usuarios.map(item => item.id))
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
    fetchUsuarios()
  }

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;
    
    const confirmMessage = selectedItems.length === 1 
      ? "¿Estás seguro de que deseas eliminar el usuario seleccionado?"
      : `¿Estás seguro de que deseas eliminar los ${selectedItems.length} usuarios seleccionados?`;
    
    if (!confirm(confirmMessage)) return;

    setDeleting(true);
    try {
      // Eliminar usuarios uno por uno
      const deletePromises = selectedItems.map(id => usuarioApi.delete(id));
      await Promise.all(deletePromises);
      
      // Refrescar la lista
      await fetchUsuarios();
      
      // Limpiar selección
      setSelectedItems([]);
      setSelectAll(false);
      
      alert(`Se eliminaron ${selectedItems.length} usuario(s) exitosamente`);
    } catch (error) {
      console.error("Error deleting selected users:", error);
      alert(`Error al eliminar usuarios: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setDeleting(false);
    }
  }

  const handleEditUser = (id: string) => {
    const usuario = usuarios.find(u => u.id === id)
    if (usuario) {
      setUsuarioSeleccionado(usuario)
      setIsEditarModalOpen(true)
    }
  }

  const handleResetPassword = (id: string) => {
    const usuario = usuarios.find(u => u.id === id)
    if (usuario) {
      setUsuarioSeleccionado(usuario)
      setIsRestablecerModalOpen(true)
    }
  }

  const handleDeleteUser = (id: string) => {
    const usuario = usuarios.find(u => u.id === id)
    if (usuario) {
      setUsuarioSeleccionado(usuario)
      setIsEliminarModalOpen(true)
    }
  }



  const handleEditarUsuario = async (data: any) => {
    try {
      // Transform data to UsuarioUpdateDTO format
      const updateData: UsuarioUpdateDTO = {
        id: parseInt(data.id),
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.email,
        authUsername: data.username,
        authRol: data.authRol,
        isActive: data.estado
      }
      
      const response = await usuarioApi.update(updateData)
      await fetchUsuarios() // Refresh the list
      setIsEditarModalOpen(false)
      alert(response.mensaje || "Usuario actualizado exitosamente")
    } catch (error) {
      console.error("Error updating user:", error)
      alert(`Error: ${error instanceof Error ? error.message : 'Error al actualizar el usuario'}`)
    }
  }

  const handleRestablecerPassword = async (data: any) => {
    try {
      const response = await usuarioApi.resetPassword(data.id, data.newPassword)
      setIsRestablecerModalOpen(false)
      alert(response.mensaje || "Contraseña restablecida exitosamente")
    } catch (error) {
      console.error("Error resetting password:", error)
      alert(`Error: ${error instanceof Error ? error.message : 'Error al restablecer la contraseña'}`)
    }
  }

  const handleConfirmarEliminar = async (id: string) => {
    try {
      const response = await usuarioApi.delete(id)
      await fetchUsuarios() // Refresh the list
      setIsEliminarModalOpen(false)
      alert(response.mensaje || "Usuario eliminado exitosamente")
    } catch (error) {
      console.error("Error deleting user:", error)
      alert(`Error: ${error instanceof Error ? error.message : 'Error al eliminar el usuario'}`)
    }
  }

  // Esta función se maneja en page.tsx, no aquí

  return (
    <div className="space-y-6">
      {/* Controles superiores */}
      <div className="flex items-center gap-2 pl-6">
        <Checkbox
          checked={selectAll}
          onCheckedChange={handleSelectAll}
          disabled={loading || usuarios.length === 0}
          className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </Button>
        {selectedItems.length > 0 && (
          <>
            <span className="text-sm text-gray-600">
              {selectedItems.length} usuario{selectedItems.length > 1 ? 's' : ''} seleccionado{selectedItems.length > 1 ? 's' : ''}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeleteSelected}
              disabled={deleting}
              className="text-red-600 hover:text-red-700"
            >
              {deleting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <TachoIcon />
              )}
            </Button>
          </>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-gray-400 mb-4" />
          <p className="text-gray-500">Cargando usuarios...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-8 h-8 text-red-500 mb-4" />
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={fetchUsuarios} variant="outline">
            Reintentar
          </Button>
        </div>
      )}

      {/* Empty State or Table */}
      {!loading && !error && usuarios.length === 0 ? (
        // Estado vacío: Mostrar imagen
        <div className="flex flex-col items-center justify-center py-12">
          <img 
            src="/administracion_usuarios.png" 
            alt="No hay usuarios registrados" 
            className="w-80 h-80 object-contain mb-4"
          />
        </div>
      ) : !loading && !error && usuarios.length > 0 ? (
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
                {usuarios.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className="bg-[#FBFBFB]"
                    style={{ 
                      borderBottom: index < usuarios.length - 1 ? '1px solid #A4A4A4' : 'none'
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                          className="data-[state=checked]:bg-[#777777] data-[state=checked]:border-[#777777]"
                        />
                        <span className="text-sm font-normal text-gray-900 flex-1 text-center">{item.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                      {item.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                      {item.authRol}
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
      ) : null}



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
