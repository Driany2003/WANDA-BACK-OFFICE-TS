"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Calendar, Plus, Minus } from "lucide-react"
import type { ProfileData } from "@/types"

interface ProfileFormProps {
  data: ProfileData
  isEditing?: boolean
  onSave?: () => void
  onEdit?: () => void
}

export function ProfileForm({ data, isEditing = false, onSave, onEdit }: ProfileFormProps) {
  const [mobileWallets, setMobileWallets] = useState([{ id: 1, wallet: 'Yape', phone: '938 000 000' }])
  const [bankAccounts, setBankAccounts] = useState([{ id: 1, institution: '', account: '' }])
  const [showPPE, setShowPPE] = useState(true)
  
  // Estados para los selects
  const [nationality, setNationality] = useState(data.nationality || '')
  const [city, setCity] = useState(data.city || '')
  const [district, setDistrict] = useState(data.district || '')
  const [gender, setGender] = useState(data.gender || '')

  const addMobileWallet = () => {
    setMobileWallets([...mobileWallets, { id: Date.now(), wallet: '', phone: '' }])
  }

  const removeMobileWallet = (id: number) => {
    if (mobileWallets.length > 1) {
      setMobileWallets(mobileWallets.filter(wallet => wallet.id !== id))
    }
  }

  const addBankAccount = () => {
    setBankAccounts([...bankAccounts, { id: Date.now(), institution: '', account: '' }])
  }

  const removeBankAccount = (id: number) => {
    if (bankAccounts.length > 1) {
      setBankAccounts(bankAccounts.filter(account => account.id !== id))
    }
  }

  // Función para obtener solo las billeteras móviles válidas (con datos completos)
  const getValidMobileWallets = () => {
    return mobileWallets.filter(wallet => wallet.wallet.trim() !== '' && wallet.phone.trim() !== '')
  }

  // Función para obtener solo las cuentas bancarias válidas (con datos completos)
  const getValidBankAccounts = () => {
    return bankAccounts.filter(account => account.institution.trim() !== '' && account.account.trim() !== '')
  }

  // Función para limpiar entradas vacías automáticamente
  const cleanEmptyEntries = () => {
    // Limpiar billeteras móviles vacías
    const validWallets = mobileWallets.filter(wallet => 
      wallet.wallet.trim() !== '' && wallet.phone.trim() !== ''
    )
    if (validWallets.length === 0) {
      validWallets.push({ id: Date.now(), wallet: '', phone: '' })
    }
    setMobileWallets(validWallets)

    // Limpiar cuentas bancarias vacías
    const validAccounts = bankAccounts.filter(account => 
      account.institution.trim() !== '' && account.account.trim() !== ''
    )
    if (validAccounts.length === 0) {
      validAccounts.push({ id: Date.now(), institution: '', account: '' })
    }
    setBankAccounts(validAccounts)
  }

  // Limpiar entradas vacías cuando se desactiva el modo de edición
  useEffect(() => {
    if (!isEditing) {
      cleanEmptyEntries()
    }
  }, [isEditing])

  return (
    <div className="space-y-8">
      {/* Datos personales */}
      <Card className=" border-none rounded-none bg-transparent">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium text-[#333333]">Datos personales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 flex gap-18">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-5">
            <div className="space-y-2">
              <Label htmlFor="tiktokUser" className="text-xs font-medium text-[#777777]">Usuario TikTok</Label>
              <Input 
                id="tiktokUser" 
                defaultValue={data.tiktokUser} 
                placeholder="Ingresa tu usuario de TikTok"
                className="w-[230px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium placeholder:text-[#BBBBBB] placeholder:text-sm placeholder:font-semibold"
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-medium text-[#777777]">Nombre</Label>
              <Input 
                id="name" 
                defaultValue={data.name}
                className="w-[230px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium placeholder:text-[#BBBBBB] placeholder:text-sm placeholder:font-semibold"
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-xs font-medium text-[#777777]">Apellido</Label>
              <Input 
                id="lastName" 
                defaultValue={data.lastName}
                className="w-[230px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium placeholder:text-[#BBBBBB] placeholder:text-sm placeholder:font-semibold"
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="documentId" className="text-xs font-medium text-[#777777]">Documento de Identidad</Label>
              <div className="relative">
                <Input 
                  id="documentId" 
                  defaultValue={`${data.documentId}`}
                  placeholder="000000000"
                  className="w-[230px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors pl-16 pr-3 shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium placeholder:text-[#BBBBBB] placeholder:text-sm placeholder:font-semibold"
                  disabled={!isEditing}
                />
                <Select defaultValue="DNI" disabled={!isEditing}>
                  <SelectTrigger className="absolute left-2 top-1/2 transform -translate-y-1/2 w-12 h-6 rounded border-none bg-transparent focus:ring-0 p-0">
                    <SelectValue className="text-xs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DNI">DNI</SelectItem>
                    <SelectItem value="CE">CE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-xs font-medium text-[#777777]">Fecha de nacimiento</Label>
              <div className="relative">
                <Input 
                  id="birthDate" 
                  defaultValue={data.birthDate}
                  placeholder="00/00/0000"
                  className="w-[230px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors pr-10 shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium placeholder:text-[#BBBBBB] placeholder:text-sm placeholder:font-semibold"
                  disabled={!isEditing}
                />
                <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cellphone" className="text-xs font-medium text-[#777777]">Celular</Label>
              <div className="relative">
                <Input 
                  id="cellphone" 
                  defaultValue={`${data.cellphone}`}
                  placeholder="938 000 000"
                  className="w-[230px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors pl-16 pr-3 shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium placeholder:text-[#BBBBBB] placeholder:text-sm placeholder:font-semibold"
                  disabled={!isEditing}
                />
                <Select defaultValue="+51" disabled={!isEditing}>
                  <SelectTrigger className="absolute left-2 top-1/2 transform -translate-y-1/2 w-12 h-6 rounded border-none bg-transparent focus:ring-0 p-0">
                    <SelectValue className="text-xs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+51">+51</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality" className="text-xs font-medium text-[#777777]">Nacionalidad</Label>
              <Select value={nationality} onValueChange={setNationality} disabled={!isEditing}>
                <SelectTrigger className="w-[230px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium">
                  <SelectValue placeholder="Elige una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Peruana">Peruana</SelectItem>
                  <SelectItem value="Otra">Otra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="text-xs font-medium text-[#777777]">Ciudad</Label>
              <Select value={city} onValueChange={setCity} disabled={!isEditing}>
                <SelectTrigger className="w-[230px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium">
                  <SelectValue placeholder="Elige una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lima">Lima</SelectItem>
                  <SelectItem value="Arequipa">Arequipa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="district" className="text-xs font-medium text-[#777777]">Distrito</Label>
              <Select value={district} onValueChange={setDistrict} disabled={!isEditing}>
                <SelectTrigger className="w-[230px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium">
                  <SelectValue placeholder="Elige una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Miraflores">Miraflores</SelectItem>
                  <SelectItem value="San Isidro">San Isidro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-medium text-[#777777]">Correo electrónico</Label>
              <Input 
                id="email" 
                defaultValue={data.email}
                className="w-[230px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium placeholder:text-[#BBBBBB] placeholder:text-sm placeholder:font-semibold"
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-xs font-medium text-[#777777]">Género</Label>
              <Select value={gender} onValueChange={setGender} disabled={!isEditing}>
                <SelectTrigger className="w-[230px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium">
                  <SelectValue placeholder="Elige una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Femenino">Femenino</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(!isEditing && showPPE) && (
              <div className="space-y-2">
                <Label htmlFor="ppe" className="text-xs font-medium text-[#777777]">PPE</Label>
                <Input 
                  id="ppe" 
                  value="No"
                  className="w-[230px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium placeholder:text-[#BBBBBB] placeholder:text-sm placeholder:font-semibold"
                  disabled={true}
                  readOnly  
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Datos bancarios */}
      <Card className="border-none rounded-none bg-transparent">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium text-[#333333]">Datos bancarios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            {/* Billeteras móviles */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">Billetera móvil disponible</Label>
              {mobileWallets.map((wallet, index) => (
                <div key={wallet.id} className="flex gap-8">
                  <Select 
                    value={wallet.wallet} 
                    onValueChange={(value: string) => {
                      const updatedWallets = [...mobileWallets]
                      updatedWallets[index].wallet = value
                      setMobileWallets(updatedWallets)
                    }}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="w-[230px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium">
                      <SelectValue placeholder="Elige una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yape">Yape</SelectItem>
                      <SelectItem value="Plin">Plin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Ingresa el número asociado"
                    value={wallet.phone}
                    onChange={(e) => {
                      const updatedWallets = [...mobileWallets]
                      updatedWallets[index].phone = e.target.value
                      setMobileWallets(updatedWallets)
                    }}
                    className="w-[230px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium placeholder:text-[#BBBBBB] placeholder:text-sm placeholder:font-semibold"
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <Button
                      onClick={index === mobileWallets.length - 1 ? addMobileWallet : () => removeMobileWallet(wallet.id)}
                      className={`w-8 h-8 rounded-full p-0 ${
                        index === mobileWallets.length - 1 
                          ? "bg-gradient-to-r from-[#DB086E] to-[#3A05DF] hover:from-[#C7055F] hover:to-[#2A04C4]" 
                          : "bg-gray-400 hover:bg-gray-500"
                      }`}
                    >
                      {index === mobileWallets.length - 1 ? (
                        <Plus className="w-4 h-4 text-white" />
                      ) : (
                        <Minus className="w-4 h-4 text-white" />
                      )}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Instituciones bancarias */}
            <div className="space-y-4 "> 
              <Label className="text-sm font-medium text-gray-700">Institución bancaria</Label>
              {bankAccounts.map((account, index) => (
                <div key={account.id} className="flex gap-8">
                  <Select 
                    value={account.institution} 
                    onValueChange={(value: string) => {
                      const updatedAccounts = [...bankAccounts]
                      updatedAccounts[index].institution = value
                      setBankAccounts(updatedAccounts)
                    }}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="w-[230px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium">
                      <SelectValue placeholder="Elige una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BCP">BCP</SelectItem>
                      <SelectItem value="BBVA">BBVA</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input 
                    placeholder="000 000 000 000 00"
                    value={account.account}
                    onChange={(e) => {
                      const updatedAccounts = [...bankAccounts]
                      updatedAccounts[index].account = e.target.value
                      setBankAccounts(updatedAccounts)
                    }}
                    className="w-[230px] h-[40px] rounded-lg border-gray-300 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors shadow-[0_4px_12px_rgba(219,8,110,0.25)] text-[#777777] text-sm font-medium placeholder:text-[#BBBBBB] placeholder:text-sm placeholder:font-semibold"
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <Button
                      onClick={index === bankAccounts.length - 1 ? addBankAccount : () => removeBankAccount(account.id)}
                      className={`w-8 h-8 rounded-full p-0 ${
                        index === bankAccounts.length - 1 
                          ? "bg-gradient-to-r from-[#DB086E] to-[#3A05DF] hover:from-[#C7055F] hover:to-[#2A04C4]" 
                          : "bg-gray-400 hover:bg-gray-500"
                      }`}
                    >
                      {index === bankAccounts.length - 1 ? (
                        <Plus className="w-4 h-4 text-white" />
                      ) : (
                        <Minus className="w-4 h-4 text-white" />
                      )}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-sm text-red-600">
            Los retiros de WC serán abonados a la cuenta bancaria o billetera móvil registrada
          </p>
        </CardContent>
      </Card>

      {/* Aceptación de términos - Solo visible en modo edición */}
      {isEditing && (
        <Card className="border-none rounded-none bg-transparent">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium text-[#333333]">Aceptación de términos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="dataProcessing" 
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#DB086E] data-[state=checked]:to-[#3A05DF]"
              />
              <Label htmlFor="dataProcessing" className="text-sm font-medium text-gray-700">
                Autorizo el tratamiento de datos personales
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="notifications" 
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#DB086E] data-[state=checked]:to-[#3A05DF]"
              />
              <Label htmlFor="notifications" className="text-sm font-medium text-gray-700">
                Autorizo el envío de notificaciones y promociones
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="ppe" 
                defaultChecked
                onCheckedChange={(checked) => setShowPPE(checked as boolean)}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#DB086E] data-[state=checked]:to-[#3A05DF]"
              />
              <Label htmlFor="ppe" className="text-sm font-medium text-gray-700">
                No soy una Persona Políticamente Expuesta (PPE)
              </Label>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
