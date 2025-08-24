"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar, ArrowLeft } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"

interface EditarSuscriptorPermanenteProps {
  onBack: () => void
  subscriberData: {
    usuarioTiktok: string
    nombre: string
    apellido: string
    documento: string
    fechaNacimiento: string
    celular: string
    nacionalidad: string
    ciudad: string
    distrito: string
    correo: string
    genero: string
    wcDisponibles: string
    billeteraMovil: string
    celularBilletera: string
    institucionBancaria: string
    numeroCuenta: string
    esPPE: boolean
    estado: boolean
  }
}

export function EditarSuscriptorPermanente({ onBack, subscriberData }: EditarSuscriptorPermanenteProps) {
  const [formData, setFormData] = useState(subscriberData)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log("Guardando cambios:", formData)
    // Aquí iría la lógica para guardar los cambios
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-transparent p-4 sm:p-6 lg:p-10 mb-0">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 font-bold bg-gradient-to-r from-[#DB086E] to-[#3A05DF] bg-clip-text text-transparent">Administración</h1>
          <p className="text-sm text-[#9C82EF]">
            Administración <span className="mx-2">{'>'}</span> Suscriptores <span className="mx-2">{'>'}</span> <span className="text-[#6137E5] font-medium">Editar suscriptor permanente</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 pt-0 mb-0">
        {/* Datos personales */}
        <div className="rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-medium text-[#333333] mb-4">Datos personales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-5">
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Usuario TikTok</label>
              <Input 
                value={formData.usuarioTiktok} 
                onChange={(e) => handleInputChange('usuarioTiktok', e.target.value)}
                className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg"
                style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.25)' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Nombre</label>
              <Input 
                value={formData.nombre} 
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg"
                style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.25)' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Apellido</label>
              <Input 
                value={formData.apellido} 
                onChange={(e) => handleInputChange('apellido', e.target.value)}
                className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg"
                style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.25)' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Documento de Identidad</label>
              <div className="relative flex justify-start" style={{ width: '230px', height: '40px' }}>
                <Input
                  value={formData.documento}
                  onChange={(e) => handleInputChange('documento', e.target.value)}
                  className="w-[230px] h-[40px] bg-white rounded-lg pl-16 text-left"
                  style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.25)' }}
                />
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                  <Select value="DNI" onValueChange={(value) => handleInputChange('documento', value)}>
                    <SelectTrigger className="w-[68px] h-[30px] bg-transparent border-none shadow-none text-[#777777] text-sm font-medium rounded">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DNI">DNI</SelectItem>
                      <SelectItem value="CE">CE</SelectItem>
                      <SelectItem value="PASAPORTE">PASAPORTE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Fecha de nacimiento</label>
              <div className="relative">
                <Input 
                  value={formData.fechaNacimiento} 
                  onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                  className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg pr-10"
                  style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.25)' }}
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Celular</label>
              <div className="relative flex justify-start" style={{ width: '230px', height: '40px' }}>
                <Input
                  value={formData.celular}
                  onChange={(e) => handleInputChange('celular', e.target.value)}
                  className="w-[230px] h-[40px] bg-white rounded-lg pl-16 text-left"
                  style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.25)' }}
                />
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                  <Select value="+51" onValueChange={(value) => handleInputChange('celular', value)}>
                    <SelectTrigger className="w-[68px] h-[30px] bg-transparent border-none shadow-none text-[#777777] text-sm font-medium rounded">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+51">+51</SelectItem>
                      <SelectItem value="+1">+1</SelectItem>
                      <SelectItem value="+34">+34</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Nacionalidad</label>
              <Select value={formData.nacionalidad} onValueChange={(value) => handleInputChange('nacionalidad', value)}>
                <SelectTrigger className="w-[230px] h-[40px] bg-white border-gray-300 rounded-lg" style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.25)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Peruana">Peruana</SelectItem>
                  <SelectItem value="Chilena">Chilena</SelectItem>
                  <SelectItem value="Colombiana">Colombiana</SelectItem>
                  <SelectItem value="Mexicana">Mexicana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Ciudad</label>
              <Select value={formData.ciudad} onValueChange={(value) => handleInputChange('ciudad', value)}>
                <SelectTrigger className="w-[230px] h-[40px] bg-white border-gray-300 rounded-lg" style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.25)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lima">Lima</SelectItem>
                  <SelectItem value="Arequipa">Arequipa</SelectItem>
                  <SelectItem value="Trujillo">Trujillo</SelectItem>
                  <SelectItem value="Cusco">Cusco</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Distrito</label>
              <Select value={formData.distrito} onValueChange={(value) => handleInputChange('distrito', value)}>
                <SelectTrigger className="w-[230px] h-[40px] bg-white border-gray-300 rounded-lg" style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.25)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Miraflores">Miraflores</SelectItem>
                  <SelectItem value="San Isidro">San Isidro</SelectItem>
                  <SelectItem value="Barranco">Barranco</SelectItem>
                  <SelectItem value="Surco">Surco</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Correo electrónico</label>
              <Input 
                value={formData.correo} 
                onChange={(e) => handleInputChange('correo', e.target.value)}
                className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg"
                style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Género</label>
              <Select value={formData.genero} onValueChange={(value) => handleInputChange('genero', value)}>
                <SelectTrigger className="w-[230px] h-[40px] bg-white border-gray-300 rounded-lg" style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.25)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Femenino">Femenino</SelectItem>
                  <SelectItem value="No binario">No binario</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">WC disponibles</label>
              <Input 
                value={formData.wcDisponibles} 
                onChange={(e) => handleInputChange('wcDisponibles', e.target.value)}
                className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg"
                style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}
              />
            </div>
            <div className="col-span-3">
              <label className="block text-xs font-medium text-[#777777] mb-2">Persona Políticamente Expuesta (PPE)</label>
              <div className="flex items-center justify-between h-[40px]">
                <span className="text-sm text-gray-600">No</span>
                <Switch
                  checked={formData.esPPE}
                  onCheckedChange={(checked) => handleInputChange('esPPE', checked)}
                  className="data-[state=checked]:bg-[#A13592]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Datos bancarios */}
        <div className="rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-medium text-[#333333] mb-4 sm:mb-6">Datos bancarios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-5">
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Billetera móvil disponible</label>
              <Select value={formData.billeteraMovil} onValueChange={(value) => handleInputChange('billeteraMovil', value)}>
                <SelectTrigger className="w-[230px] h-[40px] bg-white border-gray-300 rounded-lg" style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.25)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yape">Yape</SelectItem>
                  <SelectItem value="Plin">Plin</SelectItem>
                  <SelectItem value="Tunki">Tunki</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Celular asociado a la billetera móvil</label>
              <Input 
                value={formData.celularBilletera} 
                onChange={(e) => handleInputChange('celularBilletera', e.target.value)}
                className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg"
                style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Institución bancaria</label>
              <Select value={formData.institucionBancaria} onValueChange={(value) => handleInputChange('institucionBancaria', value)}>
                <SelectTrigger className="w-[230px] h-[40px] bg-white border-gray-300 rounded-lg" style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.25)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BCP">BCP</SelectItem>
                  <SelectItem value="BBVA">BBVA</SelectItem>
                  <SelectItem value="Scotiabank">Scotiabank</SelectItem>
                  <SelectItem value="Interbank">Interbank</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Número de cuenta bancaria</label>
              <Input 
                value={formData.numeroCuenta} 
                onChange={(e) => handleInputChange('numeroCuenta', e.target.value)}
                className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg"
                style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-[#777777] mb-2">Estado</label>
              <div className="flex items-center justify-between h-[40px]">
                <span className="text-sm text-gray-600">Activo</span>
                <Switch
                  checked={formData.estado}
                  onCheckedChange={(checked) => handleInputChange('estado', checked)}
                  className="data-[state=checked]:bg-[#A13592]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-[10px] justify-start pt-6">
          <GradientOutlineButton
            onClick={onBack}
            className="w-[138px] h-[40px]"
          >
            Cancelar
          </GradientOutlineButton>
          <GradientButton
            onClick={handleSave}
            className="w-[138px] h-[40px]"
          >
            Guardar
          </GradientButton>
        </div>
      </div>
    </div>
  )
}
