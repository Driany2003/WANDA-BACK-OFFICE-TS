"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HomeIcon, ArrowLeftIcon } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Número 404 grande */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-[#DB086E] to-[#3A05DF] bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Mensaje de error */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ¡Oops! Página no encontrada
          </h2>
          <p className="text-gray-600 text-lg">
            La página que buscas no existe o ha sido movida.
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-gradient-to-r from-[#DB086E] to-[#3A05DF] hover:from-[#C0075E] hover:to-[#2A04C4] text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/" className="flex items-center gap-2">
              <HomeIcon className="w-5 h-5" />
              Ir al Inicio
            </Link>
          </Button>
        </div>

        {/* Información adicional */}
        <div className="mt-12 text-sm text-gray-500">
          <p>Si crees que esto es un error, contacta al soporte técnico.</p>
        </div>
      </div>
    </div>
  )
}
