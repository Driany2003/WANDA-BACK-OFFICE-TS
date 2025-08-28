"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HomeIcon, RefreshCwIcon, AlertTriangleIcon } from "lucide-react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Icono de error */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <AlertTriangleIcon className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Mensaje de error */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ¡Algo salió mal!
          </h2>
          <p className="text-gray-600 text-lg mb-4">
            Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
          </p>
          {process.env.NODE_ENV === "development" && (
            <details className="text-left bg-gray-100 p-4 rounded-lg">
              <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                Detalles del error (solo desarrollo)
              </summary>
              <pre className="text-sm text-red-600 overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            className="bg-gradient-to-r from-[#DB086E] to-[#3A05DF] hover:from-[#C0075E] hover:to-[#2A04C4] text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <RefreshCwIcon className="w-5 h-5 mr-2" />
            Intentar de Nuevo
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-all duration-300"
          >
            <Link href="/" className="flex items-center gap-2">
              <HomeIcon className="w-5 h-5" />
              Ir al Inicio
            </Link>
          </Button>
        </div>

        {/* Información adicional */}
        <div className="mt-12 text-sm text-gray-500">
          <p>Si el problema persiste, contacta al soporte técnico.</p>
          {error.digest && (
            <p className="mt-2">Código de error: {error.digest}</p>
          )}
        </div>
      </div>
    </div>
  )
}
