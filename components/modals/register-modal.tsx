"use client"

import { useState } from "react"
import { X, Check, AlertCircle, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WarningIcon, checklogin } from "@/components/icons"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onRegister: () => void
  onCompleteProfile?: () => void
}

export function RegisterModal({ isOpen, onClose, onRegister, onCompleteProfile }: RegisterModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    email: ""
  })
  const [activationCode, setActivationCode] = useState("")
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Validaciones de contraseña
  const passwordValidations = {
    length: passwordData.password.length >= 8,
    uppercase: /[A-Z]/.test(passwordData.password),
    number: /\d/.test(passwordData.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(passwordData.password),
    match: passwordData.password === passwordData.confirmPassword && passwordData.password !== ""
  }

  const isPasswordValid = passwordValidations.length && 
                         passwordValidations.uppercase && 
                         passwordValidations.number && 
                         passwordValidations.special && 
                         passwordValidations.match

  // Verificar que todos los checkboxes estén verdes (todos los requisitos cumplidos)
  const allCheckboxesGreen = passwordValidations.length && 
                            passwordValidations.uppercase && 
                            passwordValidations.number && 
                            passwordValidations.special && 
                            passwordValidations.match

  // Validar código de activación (6 dígitos)
  const isActivationCodeValid = activationCode.length === 6 && /^\d{6}$/.test(activationCode)
  const [terms, setTerms] = useState({
    terms: false,
    ppe: false,
    age: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep === 1) {
      // Validar que todos los campos estén llenos
      if (formData.nombre && formData.apellido && formData.celular && formData.email && 
          terms.terms && terms.ppe && terms.age) {
        setCurrentStep(2)
      }
    } else if (currentStep === 2) {
      // Validar código de activación (6 dígitos)
      if (isActivationCodeValid) {
        setCurrentStep(3)
      }
    } else if (currentStep === 3) {
      // Validar que la contraseña cumpla todos los requisitos
      if (allCheckboxesGreen) {
        setCurrentStep(4)
      }
    } else if (currentStep === 4) {
      // Paso final - completar registro
      onRegister()
    }
  }

  const isStep1Complete = formData.nombre && formData.apellido && formData.celular && formData.email && 
                         terms.terms && terms.ppe && terms.age

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl flex overflow-hidden" style={{ width: '1116px', height: '680px' }}>
        {/* Lado izquierdo - Imagen de fondo */}
        <div className="relative" style={{ width: '457px', height: '680px' }}>
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/hero-register.png')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            {/* Overlay para mejorar legibilidad */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>

        {/* Lado derecho - Formulario de registro */}
        <div className="flex flex-col" style={{ width: '659px', height: '680px' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-12 py-6" style={{ backgroundColor: '#FEFEFE', height: '72px', boxShadow: '0 0 0 1px rgba(219, 8, 110, 0.15)' }}>
            <h2 className="text-[24px] font-medium text-[#1C1C1C]">Regístrate</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Contenido del formulario */}
          <div className="p-12 flex flex-col flex-1" style={{ backgroundColor: '#FBFBFB' }}>
                              {/* Progress Indicator */}
                  <div className="mb-10 flex justify-center">
                    <div className="flex items-center justify-between" style={{ width: '508px', height: '52px' }}>
                      {/* Step 1: Ingresa tus datos */}
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            currentStep > 1 ? 'bg-[#B09BF2]' : 
                            currentStep === 1 ? 'bg-[#3A05DF]' : 'bg-gray-300'
                          }`}>
                            {currentStep > 1 ? (
                              checklogin()
                            ) : (
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 text-center">
                          <div className={`font-medium text-[12px] ${
                            currentStep > 1 ? 'text-[#B09BF2]' : 
                            currentStep === 1 ? 'text-[#3A05DF]' : 'text-gray-400'
                          }`}>Ingresa</div>
                          <div className={`font-medium text-[12px] ${
                            currentStep > 1 ? 'text-[#B09BF2]' : 
                            currentStep === 1 ? 'text-[#3A05DF]' : 'text-gray-400'
                          }`}>tus datos</div>
                        </div>
                      </div>
                      
                      {/* Line 1 */}
                      <div className={`flex-1 h-1 ${
                        currentStep > 1 ? 'bg-[#B09BF2]' : 
                        currentStep === 2 ? 'bg-[#3A05DF]' : 'bg-gray-300'
                      }`}></div>
                      
                      {/* Step 2: Activa tu cuenta */}
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            currentStep > 2 ? 'bg-[#B09BF2]' : 
                            currentStep === 2 ? 'bg-[#3A05DF]' : 'bg-gray-300'
                          }`}>
                            {currentStep > 2 ? (
                              checklogin()
                            ) : (
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 text-center">
                          <div className={`font-medium text-[12px] ${
                            currentStep > 2 ? 'text-[#B09BF2]' : 
                            currentStep === 2 ? 'text-[#3A05DF]' : 'text-gray-400'
                          }`}>Activa</div>
                          <div className={`font-medium text-[12px] ${
                            currentStep > 2 ? 'text-[#B09BF2]' : 
                            currentStep === 2 ? 'text-[#3A05DF]' : 'text-gray-400'
                          }`}>tu cuenta</div>
                        </div>
                      </div>
                      
                      {/* Line 2 */}
                      <div className={`flex-1 h-1 ${
                        currentStep > 2 ? 'bg-[#B09BF2]' : 
                        currentStep === 3 ? 'bg-[#3A05DF]' : 'bg-gray-300'
                      }`}></div>
                      
                      {/* Step 3: Crea tu contraseña */}
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            currentStep > 3 ? 'bg-[#B09BF2]' : 
                            currentStep === 3 ? 'bg-[#3A05DF]' : 'bg-gray-300'
                          }`}>
                            {currentStep > 3 ? (
                              checklogin()
                            ) : (
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 text-center">
                          <div className={`font-medium text-[12px] ${
                            currentStep > 3 ? 'text-[#B09BF2]' : 
                            currentStep === 3 ? 'text-[#3A05DF]' : 'text-gray-400'
                          }`}>Crea</div>
                          <div className={`font-medium text-[12px] ${
                            currentStep > 3 ? 'text-[#B09BF2]' : 
                            currentStep === 3 ? 'text-[#3A05DF]' : 'text-gray-400'
                          }`}>tu contraseña</div>
                        </div>
                      </div>
                      
                      {/* Line 3 */}
                      <div className={`flex-1 h-1 ${
                        currentStep > 3 ? 'bg-[#B09BF2]' : 
                        currentStep === 4 ? 'bg-[#3A05DF]' : 'bg-gray-300'
                      }`}></div>
                      
                      {/* Step 4: Valida tu información */}
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            currentStep === 4 ? 'bg-[#3A05DF]' : 'bg-gray-300'
                          }`}>
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div className="mt-2 text-center">
                          <div className={`font-medium text-[12px] ${
                            currentStep === 4 ? 'text-[#3A05DF]' : 'text-gray-400'
                          }`}>Valida</div>
                          <div className={`font-medium text-[12px] ${
                            currentStep === 4 ? 'text-[#3A05DF]' : 'text-gray-400'
                          }`}>tu información</div>
                        </div>
                      </div>
                    </div>
                  </div>

            {/* Contenido del formulario según el paso */}
            {currentStep === 1 && (
              <>
                {/* Section Header */}
                <div className="mb-3 flex justify-center">
                  <div style={{ width: '484px' }}>
                    <h3 className="text-[16px] font-medium text-[#333333]">Registra tus datos personales</h3>
                  </div>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                  {/* Campos de entrada */}
                  <div className="mb-8 flex justify-center">
                    <div className="space-y-6" style={{ width: '484px', height: '180px' }}>
                    {/* Nombre y Apellido */}
                    <div className="flex gap-4">
                      <div className="flex flex-col items-start">
                        <Label htmlFor="nombre" className="text-[#777777] font-medium mb-2 block text-[12px]">
                          Nombre
                        </Label>
                        <Input
                          id="nombre"
                          type="text"
                          placeholder="Ingresa tu nombre"
                          value={formData.nombre}
                          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                          className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-base bg-[#FBFBFB] rounded-lg placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-[14px]"
                          style={{
                            width: '230px',
                            height: '40px',
                            boxShadow: '0 0 0 1px rgba(219, 8, 110, 0.15)',
                          }}
                          required
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <Label htmlFor="apellido" className="text-[#777777] font-medium mb-2 block text-[12px]">
                          Apellido
                        </Label>
                        <Input
                          id="apellido"
                          type="text"
                          placeholder="Ingresa tu apellido"
                          value={formData.apellido}
                          onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                          className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-base bg-[#FBFBFB] rounded-lg placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-[14px]"
                          style={{
                            width: '230px',
                            height: '40px',
                            boxShadow: '0 0 0 1px rgba(219, 8, 110, 0.15)',
                          }}
                          required
                        />
                      </div>
                    </div>

                    {/* Celular y Email */}
                    <div className="flex gap-4">
                      <div className="flex flex-col items-start">
                        <Label htmlFor="celular" className="text-[#777777] font-medium mb-2 block text-[12px]">
                          Celular
                        </Label>
                        <div className="relative" style={{ width: '230px', height: '40px' }}>
                          <Select>
                            <SelectTrigger className="absolute left-0 top-0 z-10 border-none bg-transparent rounded-l-lg" style={{ width: '60px', height: '40px' }}>
                              <SelectValue defaultValue="+51" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="+51">+51</SelectItem>
                              <SelectItem value="+1">+1</SelectItem>
                              <SelectItem value="+34">+34</SelectItem>
                            </SelectContent>
                          </Select>
                          {/* Línea de separación */}
                          <div className="absolute left-[60px] top-0 w-[2px] h-full" style={{ backgroundColor: '#E8E8E8' }}></div>
                          <Input
                            id="celular"
                            type="tel"
                            placeholder="000 000 000"
                            value={formData.celular}
                            onChange={(e) => setFormData({...formData, celular: e.target.value})}
                            className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-base bg-[#FBFBFB] rounded-lg placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-[14px] pl-16"
                            style={{
                              width: '230px',
                              height: '40px',
                              boxShadow: '0 0 0 1px rgba(219, 8, 110, 0.15)',
                            }}
                            required
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-start">
                        <Label htmlFor="email" className="text-[#777777] font-medium mb-2 block text-[12px]">
                          Correo electrónico
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Ingresa tu correo electrónico"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-base bg-[#FBFBFB] rounded-lg placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-[14px]"
                          style={{
                            width: '230px',
                            height: '40px',
                            boxShadow: '0 0 0 1px rgba(219, 8, 110, 0.15)',
                          }}
                          required
                        />
                        <div className="flex items-center gap-2 mt-2">
                          <WarningIcon/>
                          <span className="text-[#FF4444] font-medium  text-[12px]">Se enviará un código de activación</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>

                  {/* Aceptación de términos */}
                  <div className="mb-8 flex justify-center">
                    <div style={{ width: '484px' }}>
                      <h4 className="text-[12px] font-medium text-[#333333] mb-4">Aceptación de términos</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id="terms"
                            checked={terms.terms}
                            onCheckedChange={(checked) => setTerms({...terms, terms: checked as boolean})}
                          />
                          <Label htmlFor="terms" className=" font-regular text-12px text-[#777777]">
                            Acepto los términos y condiciones y la política de privacidad
                          </Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id="ppe"
                            checked={terms.ppe}
                            onCheckedChange={(checked) => setTerms({...terms, ppe: checked as boolean})}
                          />
                          <Label htmlFor="ppe" className="font-regular text-12px text-[#777777]">
                            No soy una Persona Políticamente Expuesta (PPE)
                          </Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id="age"
                            checked={terms.age}
                            onCheckedChange={(checked) => setTerms({...terms, age: checked as boolean})}
                          />
                          <Label htmlFor="age" className="font-regular text-12px text-[#777777]">
                            Declaro ser mayor de 18 años
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botones del Paso 1 */}
                  <div className="flex justify-center gap-[10px] mt-auto">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="border-pink-300 text-pink-500 hover:bg-pink-50"
                      style={{
                        width: '138px',
                        height: '40px',
                        padding: '10px',
                        borderRadius: '8px'
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="text-white font-semibold"
                      style={{
                        width: '138px',
                        height: '40px',
                        padding: '10px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #DB086E 0%, #3A05DF 100%)'
                      }}
                    >
                      Continuar
                    </Button>
                  </div>
                </form>
              </>
            )}

            {currentStep === 2 && (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                {/* Section Header */}
                <div className="mb-3 flex justify-center">
                  <div style={{ width: '484px' }}>
                    <h3 className="text-[16px] font-medium text-[#333333]">Ingresa el código de activación</h3>
                  </div>
                </div>

                {/* Formulario */}
                <div className="flex flex-col items-center">
                  <div className="flex flex-col items-start" style={{ width: '484px' }}>
                    <div className="flex flex-col items-start gap-1">
                      <Label htmlFor="codigo" className="text-[#777777] font-medium block text-[12px]">
                        Código de activación
                      </Label>
                      <Input
                        id="codigo"
                        type="text"
                        placeholder="123456"
                        value={activationCode}
                        onChange={(e) => setActivationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="border-gray-300 text-base bg-[#FBFBFB] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-[14px]"
                        style={{
                          width: '230px',
                          height: '40px',
                          padding: '8px',
                          borderRadius: '8px',
                          backgroundColor: '#FBFBFB',
                          boxShadow: '0 0 0 1px rgba(219, 8, 110, 0.15)',
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Botones del Paso 2 */}
                <div className="flex justify-center gap-[10px] mt-auto">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="border-pink-300 text-pink-500 hover:bg-pink-50"
                    style={{
                      width: '138px',
                      height: '40px',
                      padding: '10px',
                      borderRadius: '8px'
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className={`font-semibold ${
                      isActivationCodeValid 
                        ? 'text-white' 
                        : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                    }`}
                    disabled={!isActivationCodeValid}
                    style={{
                      width: '138px',
                      height: '40px',
                      padding: '10px',
                      borderRadius: '8px',
                      background: isActivationCodeValid 
                        ? 'linear-gradient(135deg, #DB086E 0%, #3A05DF 100%)'
                        : undefined
                    }}
                  >
                    Continuar
                  </Button>
                </div>
              </form>
            )}

            {currentStep === 3 && (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                {/* Section Header */}
                <div className="mb-3 flex justify-center">
                  <div style={{ width: '484px' }}>
                    <h3 className="text-[16px] font-medium text-[#333333]">Crea una contraseña segura</h3>
                  </div>
                </div>

                {/* Formulario */}
                <div className="flex flex-col items-center">
                  <div className="flex flex-col items-start" style={{ width: '484px' }}>
                    {/* Contraseña y Confirmar Contraseña en fila */}
                    <div className="flex gap-6 mb-8" style={{ width: '485px' }}>
                      {/* Contraseña */}
                      <div className="flex flex-col items-start gap-1">
                        <Label htmlFor="password" className="text-[#777777] font-medium block text-[12px]">
                          Contraseña
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={passwordData.password}
                            onChange={(e) => setPasswordData({...passwordData, password: e.target.value})}
                            className="border-gray-300 text-base bg-[#FBFBFB] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-[14px] pr-10"
                            style={{
                              width: '230px',
                              height: '40px',
                              padding: '8px',
                              borderRadius: '8px',
                              backgroundColor: '#FBFBFB',
                              boxShadow: '0 0 0 1px rgba(219, 8, 110, 0.15)',
                            }}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#BBBBBB] hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Confirmar Contraseña */}
                      <div className="flex flex-col items-start gap-1">
                        <Label htmlFor="confirmPassword" className="text-[#777777] font-medium block text-[12px]">
                          Confirmar contraseña
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                            className="border-gray-300 text-base bg-[#FBFBFB] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-[14px] pr-10"
                            style={{
                              width: '230px',
                              height: '40px',
                              padding: '8px',
                              borderRadius: '8px',
                              backgroundColor: '#FBFBFB',
                              boxShadow: '0 0 0 1px rgba(219, 8, 110, 0.15)',
                            }}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#BBBBBB] hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Requisitos de contraseña */}
                    <div className="mb-8">
                      <h4 className="text-[14px] font-medium text-[#333333] mb-4">La contraseña debe tener al menos:</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            passwordData.password.length > 0 
                              ? passwordValidations.length 
                                ? 'bg-green-500 border-green-500' 
                                : 'bg-red-500 border-red-500'
                              : 'border-gray-300'
                          }`}>
                            {passwordData.password.length > 0 && (
                              passwordValidations.length ? (
                                <Check className="w-3 h-3 text-white" />
                              ) : (
                                <X className="w-3 h-3 text-white" />
                              )
                            )}
                          </div>
                          <Label className={`font-medium text-[12px] ${
                            passwordData.password.length > 0 
                              ? passwordValidations.length 
                                ? 'text-green-600' 
                                : 'text-red-600'
                              : 'text-[#777777]'
                          }`}>
                            8 caracteres
                          </Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            passwordData.password.length > 0 
                              ? passwordValidations.uppercase 
                                ? 'bg-green-500 border-green-500' 
                                : 'bg-red-500 border-red-500'
                              : 'border-gray-300'
                          }`}>
                            {passwordData.password.length > 0 && (
                              passwordValidations.uppercase ? (
                                <Check className="w-3 h-3 text-white" />
                              ) : (
                                <X className="w-3 h-3 text-white" />
                              )
                            )}
                          </div>
                          <Label className={`font-medium text-[12px] ${
                            passwordData.password.length > 0 
                              ? passwordValidations.uppercase 
                                ? 'text-green-600' 
                                : 'text-red-600'
                              : 'text-[#777777]'
                          }`}>
                            1 letra mayúscula
                          </Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            passwordData.password.length > 0 
                              ? passwordValidations.number 
                                ? 'bg-green-500 border-green-500' 
                                : 'bg-red-500 border-red-500'
                              : 'border-gray-300'
                          }`}>
                            {passwordData.password.length > 0 && (
                              passwordValidations.number ? (
                                <Check className="w-3 h-3 text-white" />
                              ) : (
                                <X className="w-3 h-3 text-white" />
                              )
                            )}
                          </div>
                          <Label className={`font-medium text-[12px] ${
                            passwordData.password.length > 0 
                              ? passwordValidations.number 
                                ? 'text-green-600' 
                                : 'text-red-600'
                              : 'text-[#777777]'
                          }`}>
                            1 número
                          </Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            passwordData.password.length > 0 
                              ? passwordValidations.special 
                                ? 'bg-green-500 border-green-500' 
                                : 'bg-red-500 border-red-500'
                              : 'border-gray-300'
                          }`}>
                            {passwordData.password.length > 0 && (
                              passwordValidations.special ? (
                                <Check className="w-3 h-3 text-white" />
                              ) : (
                                <X className="w-3 h-3 text-white" />
                              )
                            )}
                          </div>
                          <Label className={`font-medium text-[12px] ${
                            passwordData.password.length > 0 
                              ? passwordValidations.special 
                                ? 'text-green-600' 
                                : 'text-red-600'
                              : 'text-[#777777]'
                          }`}>
                            1 carácter especial
                          </Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            passwordData.confirmPassword.length > 0 
                              ? passwordValidations.match 
                                ? 'bg-green-500 border-green-500' 
                                : 'bg-red-500 border-red-500'
                              : 'border-gray-300'
                          }`}>
                            {passwordData.confirmPassword.length > 0 && (
                              passwordValidations.match ? (
                                <Check className="w-3 h-3 text-white" />
                              ) : (
                                <X className="w-3 h-3 text-white" />
                              )
                            )}
                          </div>
                          <Label className={`font-medium text-[12px] ${
                            passwordData.confirmPassword.length > 0 
                              ? passwordValidations.match 
                                ? 'text-green-600' 
                                : 'text-red-600'
                              : 'text-[#777777]'
                          }`}>
                            Las contraseñas coinciden
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones del Paso 3 */}
                <div className="flex justify-center gap-[10px] mt-auto">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="border-pink-300 text-pink-500 hover:bg-pink-50"
                    style={{
                      width: '138px',
                      height: '40px',
                      padding: '10px',
                      borderRadius: '8px'
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className={`font-semibold ${
                      allCheckboxesGreen 
                        ? 'text-white' 
                        : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                    }`}
                    disabled={!allCheckboxesGreen}
                    style={{
                      width: '138px',
                      height: '40px',
                      padding: '10px',
                      borderRadius: '8px',
                      background: allCheckboxesGreen 
                        ? 'linear-gradient(135deg, #DB086E 0%, #3A05DF 100%)'
                        : undefined
                    }}
                  >
                    Continuar
                  </Button>
                </div>
              </form>
            )}

            {currentStep === 4 && (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                {/* Contenido del Paso 4 */}
                <div className="flex flex-col items-center pt-8">
                  <div className="text-center" style={{ width: '484px' }}>
                    <h2 className="text-[16px] font-medium text-[#333333] mb-4">
                      ¡Gracias por jugar con nosotros!
                    </h2>
                    <p className="text-[14px] font-regular text-[#777777] leading-relaxed">
                      Ten en cuenta que para continuar disfrutando de una gran experiencia dentro de la plataforma y al momento de solicitar un retiro, debes completar los datos de tu perfil.
                    </p>
                  </div>
                </div>

                {/* Botones del Paso 4 */}
                <div className="flex flex-col items-center gap-4 mt-auto">
                  {/* Link "Recordármelo más tarde" */}
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-[#3A05DF] font-semibold text-[14px] mb-4"
                  >
                    Recordármelo más tarde
                  </button>

                  {/* Botones de acción */}
                  <div className="flex gap-[10px]">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="border-pink-300 text-pink-500 hover:bg-pink-50"
                      style={{
                        width: '138px',
                        height: '40px',
                        padding: '10px',
                        borderRadius: '8px'
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="button"
                      onClick={onCompleteProfile || onClose}
                      className="text-white font-semibold"
                      style={{
                        width: '138px',
                        height: '40px',
                        padding: '10px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #DB086E 0%, #3A05DF 100%)'
                      }}
                    >
                      Completar datos
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 