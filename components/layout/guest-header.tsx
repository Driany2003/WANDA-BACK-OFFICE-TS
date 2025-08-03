"use client"

import { useState } from "react"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { LoginModal } from "@/components/modals/login-modal"
import { RegisterModal } from "@/components/modals/register-modal"
import Image from "next/image"

export function GuestHeader() {
  const { login } = useAuth()
  const router = useRouter()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const handleLoginClick = () => {
    setIsLoginModalOpen(true)
  }

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true)
  }

  const handleLoginSubmit = () => {
    setIsLoginModalOpen(false)
    login()
  }

  const handleRegisterSubmit = () => {
    setIsRegisterModalOpen(false)
    login() // Redirige a concursos después del registro
  }

  const handleCompleteProfile = () => {
    setIsRegisterModalOpen(false)
    login() // Primero hace login
    router.push('/mi-cuenta') // Luego redirige a mi-cuenta (pestaña perfil)
  }

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false) // Cierra el modal de login
    setIsRegisterModalOpen(true) // Abre el modal de registro
  }

  return (
    <>
      <header className="bg-gray-100 border-b border-gray-200 px-2 lg:px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-1">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src="/image.png"
                  alt="Wanda Logo"
                  width={58}
                  height={58}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Botones para usuarios no logueados */}
            <GradientButton onClick={handleRegisterClick}>
              Regístrate
            </GradientButton>
            <GradientOutlineButton onClick={handleLoginClick}>
              Inicia sesión
            </GradientOutlineButton>
          </div>
        </div>
      </header>

      {/* Modal de Login */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLoginSubmit}
        onSwitchToRegister={handleSwitchToRegister}
      />

      {/* Modal de Registro */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={handleRegisterSubmit}
        onCompleteProfile={handleCompleteProfile}
      />
    </>
  )
} 