"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { authApi } from "@/lib/api"
import { isAuthenticated } from "@/lib/auth"
import { getErrorMessage, validateEmail, validatePassword } from "@/lib/error-messages"

interface FormErrors {
  correo?: string
  password?: string
  general?: string
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/dashboard')
    }
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field as keyof FormErrors]
        return newErrors
      })
    }
    // Limpiar error general
    if (errors.general) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.general
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    // Validar correo
    const emailError = validateEmail(formData.correo)
    if (emailError) {
      newErrors.correo = emailError
    }
    
    // Validar contraseña
    const passwordError = validatePassword(formData.password)
    if (passwordError) {
      newErrors.password = passwordError
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar formulario antes de enviar
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    setErrors({})
    
    try {
      const response = await authApi.loginBackoffice(formData.correo, formData.password)
      
      // Si llegamos aquí, el login fue exitoso
      // Limpiar estado de loading
      setIsLoading(false)
      
      // Pequeño delay para asegurar que los tokens se guarden
      setTimeout(() => {
        // Redirigir según el tipo de usuario usando replace para evitar volver atrás
        if (response.tipoUsuario === 'SISTEMA') {
          window.location.href = '/dashboard'
        } else {
          window.location.href = '/transacciones'
        }
      }, 100)
    } catch (error: any) {
      const errorMessage = getErrorMessage(error)
      setErrors({ general: errorMessage })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Lado izquierdo - Imagen */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/login.png"
          alt="Login background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#DB086E] mb-2">
              ¡Te damos la bienvenida!
            </h1>
            <p className="text-gray-600">
              Ingresa tus datos para continuar
            </p>
          </div>

          {/* Mensaje de error general */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>

            {/* Correo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  value={formData.correo}
                  onChange={(e) => handleInputChange('correo', e.target.value)}
                  className={`pl-10 bg-white border-gray-300 focus:border-[#DB086E] focus:ring-[#DB086E] ${
                    errors.correo ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  onBlur={() => {
                    const emailError = validateEmail(formData.correo)
                    if (emailError) {
                      setErrors(prev => ({ ...prev, correo: emailError }))
                    }
                  }}
                />
              </div>
              {errors.correo && (
                <p className="mt-1 text-sm text-red-600">{errors.correo}</p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`pl-10 pr-10 bg-white border-gray-300 focus:border-[#DB086E] focus:ring-[#DB086E] ${
                    errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  onBlur={() => {
                    const passwordError = validatePassword(formData.password)
                    if (passwordError) {
                      setErrors(prev => ({ ...prev, password: passwordError }))
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>



            {/* Olvidé mi contraseña */}
            <div className="text-right">
              <Link 
                href="/forgot-password" 
                className="text-[#DB086E] hover:text-[#C0075E] text-sm font-medium"
              >
                Olvidé mi contraseña
              </Link>
            </div>

            {/* Botón de envío */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#DB086E] to-[#3A05DF] hover:from-[#C0075E] hover:to-[#2A04C4] text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Ingresando...
                </div>
              ) : (
                "Ingresar"
              )}
            </Button>
          </form>


        </div>
      </div>
    </div>
  )
}
