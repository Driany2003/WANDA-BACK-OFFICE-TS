"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { useRouter } from "next/navigation"
import { EnviarMensajeModal } from "@/components/modals/soporte/enviar-mensaje-modal"

interface ReclamoData {
  id: string
  usuario: string
  asunto: string
  fecha: string
  mensaje: string
  estado: string
}

export default function DetalleReclamoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isEnviarMensajeModalOpen, setIsEnviarMensajeModalOpen] = useState(false)
  
  // Mock data para diferentes reclamos según el ID (en una aplicación real esto vendría de una API)
  const getReclamoById = (id: string): ReclamoData => {
    const reclamos: { [key: string]: ReclamoData } = {
      "1": {
        id: "1",
        usuario: "@Jesús21",
        asunto: "Demora en el retiro de dinero",
        fecha: "04/11/2024",
        estado: "En proceso",
        mensaje: `Hola, tengo un problema con el retiro de dinero de mi cuenta. El día 31/10/2024 solicité un retiro de S/30 pero hasta el momento no he recibido el dinero en mi cuenta bancaria.

Según las políticas de retiro, el tiempo máximo de procesamiento es de 4 horas, pero ya han pasado varios días y no he recibido ninguna notificación sobre el estado de mi solicitud.

Necesito ayuda para resolver este problema lo antes posible, ya que estos fondos son importantes para mí. Por favor, revisen mi solicitud y me informen si necesitan información adicional.`
      },
      "2": {
        id: "2",
        usuario: "@MaríaLópez",
        asunto: "Problema con promoción no aplicada",
        fecha: "03/11/2024",
        estado: "Resuelto",
        mensaje: `Buenos días, ayer intenté usar el código de promoción "WANDA50" pero no se aplicó correctamente. El sistema me dice que el código no es válido, pero lo recibí por email y está vigente.

He intentado contactar al soporte por chat pero no he recibido respuesta. Necesito que me ayuden a resolver este problema para poder aprovechar la oferta antes de que expire.

¿Podrían verificar por qué el código no está funcionando?`
      },
      "3": {
        id: "3",
        usuario: "@CarlosM",
        asunto: "Error en la aplicación móvil",
        fecha: "02/11/2024",
        estado: "En proceso",
        mensaje: `Hola equipo técnico, he estado experimentando problemas con la aplicación móvil. Cada vez que intento abrir la sección de concursos, la app se cierra automáticamente.

He intentado:
- Reiniciar la aplicación
- Desinstalar y volver a instalar
- Limpiar el caché

El problema persiste en mi dispositivo Android (Samsung Galaxy S21). ¿Podrían revisar si hay algún problema conocido con esta versión de la app?`
      },
      "4": {
        id: "4",
        usuario: "@AnaGarcia",
        asunto: "Consulta sobre reglas de concurso",
        fecha: "01/11/2024",
        estado: "Resuelto",
        mensaje: `Hola, tengo una consulta sobre las reglas del concurso actual. En las bases se menciona que se puede participar una vez por día, pero en mi perfil veo que puedo participar múltiples veces.

¿Podrían aclarar si esto es correcto o si hay algún error en el sistema? No quiero violar las reglas del concurso.

También me gustaría saber si hay algún límite en el número total de participaciones por usuario.`
      }
    }
    
    return reclamos[id] || {
      id: id,
      usuario: "@Usuario" + id,
      asunto: "Reclamo #" + id,
      fecha: "01/11/2024",
      estado: "En proceso",
      mensaje: "Este es un reclamo de ejemplo para el ID " + id + ". En una aplicación real, aquí se mostraría el contenido específico del reclamo."
    }
  }
  
  const reclamo = getReclamoById(params.id)

  const handleResponder = () => {
    setIsEnviarMensajeModalOpen(true)
  }

  const handleSendMensaje = (data: { para: string; asunto: string; mensaje: string; link: string }) => {
    console.log("Enviando mensaje:", data)
    // Aquí iría la lógica para enviar el mensaje
    // Después de enviar, regresar a la pantalla de reclamos
    router.push('/soporte?tab=reclamos')
  }

  const handleVolver = () => {
    router.push('/soporte?tab=reclamos')
  }

  return (
    <div className="space-y-6 p-5 pt-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleVolver}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#DB086E] to-[#3A05DF] bg-clip-text text-transparent">
              Soporte
            </h1>
            <div className="text-sm text-gray-600 mt-2">
              <span className="text-[#9C82EF]">Soporte</span> &gt;{" "}
              <span className="text-[#9C82EF]">Reclamos</span> &gt;{" "}
              <span className="text-[#3A05DF] font-medium">Detalle de reclamo #{reclamo.id}</span>
            </div>
          </div>
        </div>
        <GradientButton 
          onClick={handleResponder}
          className="px-6 py-2 rounded-md font-medium"
        >
          Responder
        </GradientButton>
      </div>

      {/* Contenido del reclamo */}
      <div className="bg-white rounded-xl p-6 shadow-lg max-w-4xl">
        <div className="space-y-4">
          {/* Información del remitente */}
          <div className="border-b border-gray-200 pb-4">
            <p className="text-gray-700">
              <span className="font-medium">De:</span> usuario {reclamo.usuario}
            </p>
          </div>

          {/* Asunto */}
          <div className="border-b border-gray-200 pb-4">
            <p className="text-gray-700">
              <span className="font-medium">Asunto:</span> {reclamo.asunto}
            </p>
          </div>

          {/* Fecha */}
          <div className="border-b border-gray-200 pb-4">
            <p className="text-gray-700">
              <span className="font-medium">Fecha:</span> {reclamo.fecha}
            </p>
          </div>

          {/* Estado */}
          <div className="border-b border-gray-200 pb-4">
            <p className="text-gray-700">
              <span className="font-medium">Estado:</span>{" "}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                reclamo.estado === "En proceso" 
                  ? "bg-yellow-100 text-yellow-800" 
                  : "bg-green-100 text-green-800"
              }`}>
                {reclamo.estado}
              </span>
            </p>
          </div>

          {/* Mensaje */}
          <div className="pt-4">
            <div className="text-gray-700 whitespace-pre-line">
              {reclamo.mensaje}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Enviar Mensaje */}
      <EnviarMensajeModal
        isOpen={isEnviarMensajeModalOpen}
        onClose={() => setIsEnviarMensajeModalOpen(false)}
        onSend={handleSendMensaje}
        reclamo={reclamo}
      />
    </div>
  )
}
