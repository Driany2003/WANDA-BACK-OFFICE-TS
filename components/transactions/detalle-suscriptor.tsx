"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft } from "lucide-react"

interface DetalleSuscriptorProps {
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
    wcDisponibles: number
    billeteraMovil: string
    celularBilletera: string
    institucionBancaria: string
    numeroCuenta: string
    esPPE: boolean
  }
}

export function DetalleSuscriptor({ onBack, subscriberData }: DetalleSuscriptorProps) {
  const [formData, setFormData] = useState(subscriberData)

  return (
    <div className=" min-h-screen">
      {/* Header */}
      <div className="p-4 sm:p-6 lg:p-10 mb-0">
          <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
          </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 font-bold bg-gradient-to-r from-[#DB086E] to-[#3A05DF] bg-clip-text text-transparent">Transacciones</h1>
          <p className="text-sm text-[#9C82EF]">
            Transacciones <span className="mx-2">{'>'}</span> Salidas <span className="mx-2">{'>'}</span> <span className="text-[#6137E5] font-medium">Detalle datos de suscriptor</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 pt-0 mb-0">
        {/* Datos personales */}
        <div className="rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-medium text-[#333333] mb-4 sm:mb-6">Datos personales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-5">
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Usuario TikTok</label>
              <Input 
                value={formData.usuarioTiktok} 
                readOnly 
                className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg"
                style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Nombre</label>
              <Input 
                value={formData.nombre} 
                readOnly 
                className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg"
                style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Apellido</label>
              <Input 
                value={formData.apellido} 
                readOnly 
                className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg"
                style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Documento de Identidad</label>
              <div className="relative flex justify-start" style={{ width: '230px', height: '40px' }}>
                <Input
                  value={formData.documento}
                  readOnly
                  className="w-[230px] h-[40px] bg-white rounded-lg pl-16 text-left"
                  style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}
                />
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                  <Select value="DNI" disabled>
                    <SelectTrigger className="w-[68px] h-[30px] bg-transparent border-none shadow-none text-[#777777] text-sm font-medium rounded">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DNI">DNI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Fecha de nacimiento</label>
              <div className="relative">
                <Input
                  type="date"
                  placeholder="00/00/0000"
                  value={formData.fechaNacimiento}
                  readOnly
                  className="w-[230px] h-[40px] bg-[#FBFBFB] rounded-lg shadow-[0_4px_10px_rgba(219,8,110,0.08)] pr-10 placeholder:text-[#BBBBBB] placeholder:font-medium placeholder:text-[14px]"
                />
                
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Celular</label>
              <div className="relative flex justify-start" style={{ width: '230px', height: '40px' }}>
                <Input
                  value={formData.celular}
                  readOnly
                  className="w-[230px] h-[40px] bg-white rounded-lg pl-16 text-left"
                  style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}
                />
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                  <Select value="+51" disabled>
                    <SelectTrigger className="w-[68px] h-[30px] bg-transparent border-none shadow-none text-[#777777] text-sm font-medium rounded">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+51">+51</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Nacionalidad</label>
              <Select value={formData.nacionalidad} disabled>
                <SelectTrigger className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg" style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Peruana">Peruana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Ciudad</label>
              <Select value={formData.ciudad} disabled>
                <SelectTrigger className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg" style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lima">Lima</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Distrito</label>
              <Select value={formData.distrito} disabled>
                <SelectTrigger className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg" style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Miraflores">Miraflores</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Correo electrónico</label>
              <Input 
                value={formData.correo} 
                readOnly 
                className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg"
                style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Género</label>
              <Select value={formData.genero} disabled>
                <SelectTrigger className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg" style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">WC disponibles</label>
              <Input 
                value={formData.wcDisponibles} 
                readOnly 
                className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg"
                style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#DB086E]">Persona Políticamente Expuesta (PPE)</label>
                <div className="flex items-center gap-2 ml-2" >
                  <span className="text-sm text-gray-600">No</span>
                  <Switch checked={formData.esPPE} disabled className="w-12 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Datos bancarios */}
        <div className="rounded-lg p-4 sm:p-6 pt-0">
          <h2 className="text-lg sm:text-xl font-medium text-[#333333] mb-4 sm:mb-6">Datos bancarios</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-x-2 gap-y-5">
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Billetera móvil disponible</label>
              <Select value={formData.billeteraMovil} disabled>
                <SelectTrigger className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg" style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yape">Yape</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Celular asociado a la billetera móvil</label>
              <Input 
                value={formData.celularBilletera} 
                readOnly 
                className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg"
                style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Institución bancaria</label>
              <Select value={formData.institucionBancaria} disabled>
                <SelectTrigger className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg" style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BCP">BCP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#777777] mb-2">Número de cuenta bancaria</label>
              <Input 
                value={formData.numeroCuenta} 
                className="bg-white border-gray-300 w-[230px] h-[40px] rounded-lg"
                style={{ boxShadow: '0 2px 8px rgba(219, 8, 110, 0.08)' }}
                readOnly 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
