import React from 'react'

// Icono del logo principal para el header de usuarios no logueados
export const GuestLogoIcon = ({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  }

  return (
    <div className={`${sizeClasses[size]} ${className} bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center`}>
      <span className="text-white font-bold text-sm">W</span>
    </div>
  )
}

// Icono de búsqueda para el header de usuarios no logueados
export const GuestSearchIcon = ({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  }

  return (
    <div className={`${sizeClasses[size]} ${className} bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center`}>
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  )
}

// Icono de inicio de sesión
export const LoginIcon = ({ className = "" }: { className?: string }) => {
  return (
    <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
  )
}

// Icono de registro
export const RegisterIcon = ({ className = "" }: { className?: string }) => {
  return (
    <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  )
}



