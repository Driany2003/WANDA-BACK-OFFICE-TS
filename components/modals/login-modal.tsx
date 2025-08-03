"use client"

import { useState } from "react"
import { X, Eye, EyeOff, Phone, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
  onSwitchToRegister?: () => void
}

export function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin()
  }

    if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl flex overflow-hidden" style={{ width: '1116px', height: '680px' }}>
        {/* Lado izquierdo - Imagen de fondo */}
        <div className="relative" style={{ width: '457px', height: '680px' }}>
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/hero-login.png')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            {/* Overlay para mejorar legibilidad */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>

        {/* Lado derecho - Formulario de login */}
        <div className="flex flex-col" style={{ width: '659px', height: '680px' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-12 py-6" style={{ backgroundColor: '#FEFEFE', height: '72px', boxShadow: '0 0 0 1px rgba(219, 8, 110, 0.15)' }}>
            <h2 className="text-[24px] font-medium text-[#1C1C1C]">Inicia sesión</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Contenido del formulario */}
          <div className="p-12 flex flex-col flex-1" style={{ backgroundColor: '#FBFBFB' }}>

          {/* Mensaje de bienvenida */}
          <div className="mb-10 text-center">
            <h1 className="text-[18px] font-medium  mb-3 bg-gradient-to-r from-[#DB086E] to-[#3A05DF] bg-clip-text text-transparent">
              ¡Te damos la bienvenida!
            </h1>
            <p className="text-[#777777] text-lg font-regular text-[16px]">
              Ingresa tus datos para continuar
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            {/* Campo de celular */}
            <div className="mb-5 flex flex-col items-center">
              <div className="w-[366px] flex flex-col items-start">
                <Label htmlFor="phone" className="text-[#777777] font-medium mb-3 block text-[12px]">
                  Celular
                </Label>
                <div className="relative w-full">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#BBBBBB]" size={16} />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Ingresa tu número de celular"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-[366px] h-[40px] pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-base bg-[#FBFBFB] rounded-lg placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-[14px]"
                    style={{
                      boxShadow: '0 0 0 1px rgba(219, 8, 110, 0.15)',
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Campo de contraseña */}
            <div className="mb-4 flex flex-col items-center">
              <div className="w-[366px] flex flex-col items-start">
                <Label htmlFor="password" className="text-[#777777] font-medium mb-3 block text-[12px]">
                  Contraseña
                </Label>
                <div className="relative w-full">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#BBBBBB]" size={16} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[366px] h-[40px] pl-10 pr-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-base bg-[#FBFBFB] rounded-lg placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-[14px]"
                    style={{
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
            </div>

            {/* Enlace de olvidé contraseña */}
            <div className="mb-8 flex justify-center">
              <div className="w-[366px] flex justify-start">
                <button
                  type="button"
                  className="text-[#3A05DF] hover:text-[#3A05DF]/80 font-semibold text-[14px] underline"
                >
                  Olvidé mi contraseña
                </button>
              </div>
            </div>

            {/* Botón de ingresar */}
            <div className="flex justify-center mb-3">
              <Button
                type="submit"
                className="text-white font-semibold text-lg"
                style={{
                  fontSize: '14px',
                  fontWeight: 'semibold',
                  color: '#FBFBFB',
                  background: 'linear-gradient(135deg, #DB086E 0%, #3A05DF 100%)',
                  width: '366px',
                  height: '40px',
                  padding: '10px',
                  borderRadius: '8px'
                }}
              >
                Ingresar
              </Button>
            </div>

            {/* Separador */}
            <div className="flex items-center mb-3 justify-center">
              <span className="px-4 text-medium text-[12px] text-[#777777]">O accede con</span>
            </div>

            {/* Botones de redes sociales */}
            <div className="flex justify-center mb-8">
              <div className="flex gap-3">
                                                   <Button
                    type="button"
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50"
                    style={{
                      width: '171px',
                      height: '50px',
                      borderRadius: '8px',
                      boxShadow: '0 0 0 1px rgba(219, 8, 110, 0.08)'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src="/google-login.png"
                        alt="Google"
                        width={50}
                        height={50}
                        className="w-15 h-15"
                      />
                    </div>
                  </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50"
                  style={{
                    width: '171px',
                    height: '50px',
                    borderRadius: '8px',
                    boxShadow: '0 0 0 1px rgba(219, 8, 110, 0.08)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src="/tiktok-login.png"
                      alt="TikTok"
                      width={50}
                      height={50}
                      className="w-15 h-15"
                    />
                  </div>
                </Button>
              </div>
            </div>

            {/* Enlace de registro */}
            <div className="mt-auto text-center">
              <span className="text-[#A4A4A4] text-[16px] text-regular">No tienes una cuenta? </span>
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="ml-2 text-[#3A05DF] text-semibold underline text-[14px]"
              >
                Regístrate
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  )
} 