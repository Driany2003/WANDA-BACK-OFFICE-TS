"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GradientButton } from "@/components/ui/gradient-button"
import { NotificationToast } from "@/components/ui/notification-toast"
import { DolarIcon, ImagenIcon, WarningIcon } from "@/components/icons/transaction-icons"
import Image from "next/image"
import { Upload, ChevronDown, ChevronUp } from "lucide-react"
import { CustomModal } from "@/components/shared/custom-modal"

export function DepositForm() {
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null)
  const [selectedAmount, setSelectedAmount] = useState("20.00")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [notification, setNotification] = useState<{
    isVisible: boolean
    type: 'success' | 'warning' | 'error'
    title: string
    message: string
  }>({
    isVisible: false,
    type: 'success',
    title: '',
    message: ''
  })
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [showYapeAmountTooltip, setShowYapeAmountTooltip] = useState(false)
  const [showYapeFileTooltip, setShowYapeFileTooltip] = useState(false)
  const [showPlinAmountTooltip, setShowPlinAmountTooltip] = useState(false)
  const [showPlinFileTooltip, setShowPlinFileTooltip] = useState(false)

  const toggleMethod = (method: string) => {
    if (expandedMethod === method) {
      // Cerrar la sección y todos los tooltips
      setExpandedMethod(null)
      setShowYapeAmountTooltip(false)
      setShowYapeFileTooltip(false)
      setShowPlinAmountTooltip(false)
      setShowPlinFileTooltip(false)
    } else {
      // Abrir nueva sección y cerrar tooltips de la otra sección
      setExpandedMethod(method)
      if (method === "yape") {
        setShowPlinAmountTooltip(false)
        setShowPlinFileTooltip(false)
      } else if (method === "plin") {
        setShowYapeAmountTooltip(false)
        setShowYapeFileTooltip(false)
      }
    }
  }

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validar que solo se permita una imagen
      if (selectedFile) {
        setNotification({
          isVisible: true,
          type: 'warning',
          title: 'Archivo ya seleccionado',
          message: 'Solo puedes subir una imagen.'
        })
        // Limpiar el input
        event.target.value = ''
        return
      }
      
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        setNotification({
          isVisible: true,
          type: 'error',
          title: 'Tipo de archivo no válido',
          message: 'Solo se permiten archivos de imagen (JPG, PNG, etc.)'
        })
        event.target.value = ''
        return
      }

      setSelectedFile(file)
      setNotification({
        isVisible: true,
        type: 'success',
        title: 'Imagen agregada',
        message: 'La imagen se ha agregado correctamente'
      })
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
  }

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }))
  }

  const handleRecargarClick = () => {
    setShowConfirmationModal(true)
  }

  const handleConfirmRecarga = () => {
    setShowConfirmationModal(false)
    setSelectedAmount("20.00")
    setSelectedFile(null)
    setNotification({
      isVisible: true,
      type: 'success',
      title: '¡Solicitud registrada con éxito!',
      message: 'Recargaremos tus WC al validar tu solicitud'
    })
  }

  const handleCancelRecarga = () => {
    setShowConfirmationModal(false)
  }

  const toggleYapeAmountTooltip = () => {
    setShowYapeAmountTooltip(!showYapeAmountTooltip)
    setShowYapeFileTooltip(false)
  }

  const toggleYapeFileTooltip = () => {
    setShowYapeFileTooltip(!showYapeFileTooltip)
    setShowYapeAmountTooltip(false)
  }

  const togglePlinAmountTooltip = () => {
    setShowPlinAmountTooltip(!showPlinAmountTooltip)
    setShowPlinFileTooltip(false)
  }

  const togglePlinFileTooltip = () => {
    setShowPlinFileTooltip(!showPlinFileTooltip)
    setShowPlinAmountTooltip(false)
  }

  return (
          <div className="space-y-8">
      <div>
        <h3 className="text-xl font-medium  text-gray-900 mt-11 mb-8">Billetera móvil</h3>

        {/* Selector de método de pago - Yape */}
        <div className={`w-full max-w-[1026px] ${expandedMethod === "yape" ? "min-h-[72px]" : "h-[72px]"} ${expandedMethod === "yape" ? '' : ''}`} style={{ 
          boxShadow: expandedMethod === "yape" ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <Card className="p-4 pb-4 bg-gradient-to-r from-white to-gray-50 border border-gray-100 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/yape.png"
                  alt="Yape"
                  width={42}
                  height={42}
                  className="rounded"
                />
                <span className="font-medium text-gray-900">Yape</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleMethod("yape")}
                className="p-2"
              >
                {expandedMethod === "yape" ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </div>
          </Card>

          {/* Formulario expandible para Yape */}
          {expandedMethod === "yape" && (
            <div className="mt-0 pt-6 bg-transparent border-t border-gray-100/50">
              {/* Instrucciones paso a paso */}
              <div className="mb-6">
                <p className="text-[14px] font-normal text-[#777777] mt-3 mb-8">
                  Recomendamos realizar tus depósitos desde el número de teléfono que usaste para registrarte en la plataforma
                  y seguir los siguientes pasos para<br />una recarga exitosa:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="p-4 text-center bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200" style={{
                    boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)'
                  }}>
                    <div className="w-10 h-10 bg-[#FFDD19] rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <span className="text-[18px] font-medium text-[#000000]">1</span>
                    </div>
                    <p className="text-[14px] font-normal text-gray-700 leading-relaxed">
                      Ingresa a Yape, <strong className="text-[#3A05DF]">realiza el depósito</strong> por el monto que desees al número de teléfono o al
                      código QR dispuesto en la pantalla
                    </p>
                  </Card>

                  <Card className="p-4 text-center bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200" style={{
                    boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)'
                  }}>
                    <div className="w-10 h-10 bg-[#FFDD19] rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <span className="text-[18px] font-medium text-[#000000]">2</span>
                    </div>
                    <p className="text-[14px] font-normal text-gray-700 leading-relaxed">
                      Vuelve a la plataforma para seleccionar o ingresar el <strong className="text-[#3A05DF]">monto de recarga</strong> que has
                      realizado en Yape
                    </p>
                  </Card>

                  <Card className="p-4 text-center bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200" style={{
                    boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)'
                  }}>
                    <div className="w-10 h-10 bg-[#FFDD19] rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <span className="text-[18px] font-medium text-[#000000]">3</span>
                    </div>
                    <p className="text-[14px] font-normal text-gray-700 leading-relaxed">
                      Por último, adjunta en la casilla <strong className="text-[#3A05DF]">constancia de recarga</strong> el comprobante del depósito y
                      recarga tus WC
                    </p>
                  </Card>

                  <Card className="p-4 text-center bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200" style={{
                    boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)'
                  }}>
                    <div className="w-10 h-10 bg-[#FFDD19] rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <span className="text-[18px] font-medium text-[#000000]">4</span>
                    </div>
                    <p className="text-[14px] font-normal text-gray-700 leading-relaxed ">
                      <strong className="text-[#3A05DF]">¡Prepárate!</strong> Nuestro equipo validará y recargará tus WC.
                    </p>
                  </Card>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 mt-12">
                {/* Columna izquierda */}
                <div className="flex-1 space-y-7">
                  {/* Monto de recarga */}
                  <div className="pb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                        <DolarIcon size={14} color="#FFFFFF" />
                      </div>
                      <h4 className="ml-2 text-lg font-semibold text-gray-900">Monto de recarga</h4>
                      <div className="relative">
                        <button
                          onClick={toggleYapeAmountTooltip}
                          className="cursor-pointer"
                        >
                          <WarningIcon size={16} />
                        </button>
                        {showYapeAmountTooltip && (
                          <div className="absolute bottom-8 left-0 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3 whitespace-nowrap">
                            <div className="relative">
                              <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-l border-b border-gray-200 transform rotate-45 z-10"></div>
                              <p className="text-[12px] font-medium text-[#777777] relative z-20">
                                Monto mínimo <span className="text-[#333333]">S/20.00</span> - Monto máximo <span className="text-[#333333]">S/100.00</span>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-8 mb-8 gap-4">
                      <div className="flex flex-wrap gap-2 sm:gap-6">
                        <div 
                          onClick={() => handleAmountSelect("20.00")}
                          className={`rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-center ${
                            selectedAmount === "20.00" 
                              ? 'bg-[#FEFEFE] text-[#951B85] shadow-lg' 
                              : 'bg-[#E8E8E8] text-[#777777]'
                          }`}
                          style={{
                            width: 'clamp(70px, 20vw, 90px)',
                            height: '25px',
                            boxShadow: selectedAmount === "20.00" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : 'none'
                          }}
                        >
                          <span className="text-sm font-medium">S/ 20.00</span>
                        </div>
                        <div 
                          onClick={() => handleAmountSelect("30.00")}
                          className={`rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-center ${
                            selectedAmount === "30.00" 
                              ? 'bg-[#FEFEFE] text-[#951B85] shadow-lg' 
                              : 'bg-[#E8E8E8] text-[#777777]'
                          }`}
                          style={{
                            width: 'clamp(70px, 20vw, 90px)',
                            height: '25px',
                            boxShadow: selectedAmount === "30.00" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : 'none'
                          }}
                        >
                          <span className="text-sm font-medium">S/ 30.00</span>
                        </div>
                        <div 
                          onClick={() => handleAmountSelect("40.00")}
                          className={`rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-center ${
                            selectedAmount === "40.00" 
                              ? 'bg-[#FEFEFE] text-[#951B85] shadow-lg' 
                              : 'bg-[#E8E8E8] text-[#777777]'
                          }`}
                          style={{
                            width: 'clamp(70px, 20vw, 90px)',
                            height: '25px',
                            boxShadow: selectedAmount === "40.00" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : 'none'
                          }}
                        >
                          <span className="text-sm font-medium">S/ 40.00</span>
                        </div>
                        <div 
                          onClick={() => handleAmountSelect("100.00")}
                          className={`rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-center ${
                            selectedAmount === "100.00" 
                              ? 'bg-[#FEFEFE] text-[#951B85] shadow-lg' 
                              : 'bg-[#E8E8E8] text-[#777777]'
                          }`}
                          style={{
                            width: 'clamp(70px, 20vw, 90px)',
                            height: '25px',
                            boxShadow: selectedAmount === "100.00" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : 'none'
                          }}
                        >
                          <span className="text-sm font-medium">S/ 100.00</span>
                        </div>
                      </div>
                    </div>

                    <div 
                      className="bg-white pl-4 rounded-xl flex items-center justify-start cursor-not-allowed shadow-sm w-full sm:w-[204px]"
                      style={{
                        height: '40px',
                        boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)'
                      }}
                    >
                      <span className="text-[14px] font-semibold text-[#777777]">S/ {selectedAmount}</span>
                    </div>
                  </div>

                  {/* Constancia de recarga */}
                  <div className="pb-1">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                        <ImagenIcon size={12} color="#FFFFFF" />
                      </div>
                      <h4 className="ml-2 text-lg font-semibold text-gray-900">Constancia de recarga</h4>
                      <div className="relative">
                        <button
                          onClick={toggleYapeFileTooltip}
                          className="cursor-pointer"
                        >
                          <WarningIcon size={16} />
                        </button>
                        {showYapeFileTooltip && (
                          <div className="absolute bottom-8 left-0 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3 whitespace-nowrap">
                            <div className="relative">
                              <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-l border-b border-gray-200 transform rotate-45 z-10"></div>
                              <p className="text-[12px] font-medium text-[#777777] relative z-20">
                                Archivos <span className="text-[#333333]">JPG, PNG</span> / Máx <span className="text-[#333333]">40 MB</span>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div 
                      className="bg-white rounded-xl flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors duration-200 shadow-sm w-full sm:w-[484px]"
                      style={{
                        height: '40px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(219, 8, 110, 0.15)'
                      }}
                    >
                      <input type="file" className="hidden" id="file-upload" accept="image/*,.pdf" onChange={handleFileSelect} />
                      <label htmlFor="file-upload" className="cursor-pointer w-full h-full flex items-center justify-between px-4">
                        <span className="text-sm text-gray-500">Selecciona un archivo</span>
                        <Upload className="w-5 h-5 text-gray-400" />
                      </label>
                    </div>

                    {/* Chip del archivo seleccionado */}
                    {selectedFile && (
                      <div className="mt-3 flex items-center gap-2">
                        <div className="bg-[#6137E5] text-[#FBFBFB] px-3 py-1 rounded-full flex items-center gap-2">
                          <span className="text-[12px] font-medium">Img.01</span>
                          <button 
                            onClick={handleRemoveFile}
                            className="text-[#FBFBFB] hover:text-gray-200 transition-colors"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Botón Recargar */}
                  <div className="pb-8">
                    <GradientButton 
                      className="px-8 py-2 text-base font-bold"
                      onClick={handleRecargarClick}
                    >
                      Recargar
                    </GradientButton>
                  </div>
                </div>

                {/* Columna derecha */}
                <div className="w-full lg:w-64 flex flex-col items-center space-y-12">
                  {/* Conversión */}
                  <div className="text-start">
                    <p className="text-sm text-gray-600 mb-2">Recuerda que</p>
                    <div 
                      className="flex items-center gap-1 sm:gap-2 shadow-sm justify-center"
                      style={{
                        width: 'clamp(120px, 80vw, 162px)',
                        height: 'clamp(50px, 8vh, 60px)',
                        borderRadius: '16px',
                        padding: '8px',
                        background: 'linear-gradient(90deg, #EBE6FC 0%, #FBFBFB 100%)'
                      }}
                    >
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                        <span 
                          className="text-xs font-bold"
                          style={{
                            background: 'linear-gradient(90deg, #DB086E 0%, #3A05DF 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        >
                          1 Sol
                        </span>
                      </div>
                      <span className="text-gray-600 text-xs sm:text-sm">=</span>
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                        <span 
                          className="text-xs font-bold"
                          style={{
                            background: 'linear-gradient(90deg, #DB086E 0%, #3A05DF 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        >
                          1 WC
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="text-center pb-5">
                    <div className="w-32 h-32 bg-black rounded-lg flex items-center justify-center mx-auto mb-2">
                      <div className="w-28 h-28 bg-white rounded">
                        <div className="w-full h-full bg-white flex items-center justify-center">
                          <div className="grid grid-cols-8 gap-0.5">
                            {Array.from({ length: 64 }, (_, i) => (
                              <div 
                                key={i} 
                                className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-900 font-medium">978 000 546</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Plin option */}
        <div className={`w-full max-w-[1026px] mt-6 ${expandedMethod === "plin" ? "min-h-[72px]" : "h-[72px]"} ${expandedMethod === "plin" ? '' : ''}`} style={{ 
          boxShadow: expandedMethod === "plin" ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <Card className="p-4 pb-4 bg-gradient-to-r from-white to-gray-50 border border-gray-100 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/plin.png"
                  alt="Plin"
                  width={42}
                  height={42}
                  className="rounded"
                />
                <span className="font-medium text-gray-900">Plin</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleMethod("plin")}
                className="p-2"
              >
                {expandedMethod === "plin" ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </div>
          </Card>

          {/* Formulario expandible para Plin */}
          {expandedMethod === "plin" && (
            <div className="mt-0 pt-6 bg-transparent border-t border-gray-100/50">
              {/* Instrucciones paso a paso */}
              <div className="mb-6">
                <p className="text-[14px] font-normal text-[#777777] mt-3 mb-8">
                  Recomendamos realizar tus depósitos desde el número de teléfono que usaste para registrarte en la plataforma
                  y seguir los siguientes pasos para<br />una recarga exitosa:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="p-4 text-center bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200" style={{
                    boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)'
                  }}>
                    <div className="w-10 h-10 bg-[#FFDD19] rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <span className="text-[18px] font-medium text-[#000000]">1</span>
                    </div>
                    <p className="text-[14px] font-normal text-gray-700 leading-relaxed">
                      Ingresa a Plin, <strong className="text-[#3A05DF]">realiza el depósito</strong> por el monto que desees al número de teléfono o al
                      código QR dispuesto en la pantalla
                    </p>
                  </Card>

                  <Card className="p-4 text-center bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200" style={{
                    boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)'
                  }}>
                    <div className="w-10 h-10 bg-[#FFDD19] rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <span className="text-[18px] font-medium text-[#000000]">2</span>
                    </div>
                    <p className="text-[14px] font-normal text-gray-700 leading-relaxed">
                      Vuelve a la plataforma para seleccionar o ingresar el <strong className="text-[#3A05DF]">monto de recarga</strong> que has
                      realizado en Plin
                    </p>
                  </Card>

                  <Card className="p-4 text-center bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200" style={{
                    boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)'
                  }}>
                    <div className="w-10 h-10 bg-[#FFDD19] rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <span className="text-[18px] font-medium text-[#000000]">3</span>
                    </div>
                    <p className="text-[14px] font-normal text-gray-700 leading-relaxed">
                      Por último, adjunta en la casilla <strong className="text-[#3A05DF]">constancia de recarga</strong> el comprobante del depósito y
                      recarga tus WC
                    </p>
                  </Card>

                  <Card className="p-4 text-center bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200" style={{
                    boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)'
                  }}>
                    <div className="w-10 h-10 bg-[#FFDD19] rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <span className="text-[18px] font-medium text-[#000000]">4</span>
                    </div>
                    <p className="text-[14px] font-normal text-gray-700 leading-relaxed ">
                      <strong className="text-[#3A05DF]">¡Prepárate!</strong> Nuestro equipo validará y recargará tus WC.
                    </p>
                  </Card>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 mt-12">
                {/* Columna izquierda */}
                <div className="flex-1 space-y-7">
                  {/* Monto de recarga */}
                  <div className="pb-6">
                    <div className="flex items-center gap-2 mb-8">
                      <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                        <DolarIcon size={14} color="#FFFFFF" />
                      </div>
                      <h4 className="ml-2 text-lg font-semibold text-gray-900">Monto de recarga</h4>
                      <div className="relative">
                        <button
                          onClick={togglePlinAmountTooltip}
                          className="cursor-pointer"
                        >
                          <WarningIcon size={16} />
                        </button>
                        {showPlinAmountTooltip && (
                          <div className="absolute bottom-8 left-0 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3 whitespace-nowrap">
                            <div className="relative">
                              <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-l border-b border-gray-200 transform rotate-45 z-10"></div>
                              <p className="text-[12px] font-medium text-[#777777] relative z-20">
                                Monto mínimo <span className="text-[#333333]">S/20.00</span> - Monto máximo <span className="text-[#333333]">S/100.00</span>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                                        <div className="flex flex-wrap gap-2 sm:gap-6">
                      <div 
                        onClick={() => handleAmountSelect("20.00")}
                        className={`rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-center ${
                          selectedAmount === "20.00" 
                            ? 'bg-[#FEFEFE] text-[#951B85] shadow-lg' 
                            : 'bg-[#E8E8E8] text-[#777777]'
                        }`}
                        style={{
                          width: 'clamp(70px, 20vw, 90px)',
                          height: '25px',
                          boxShadow: selectedAmount === "20.00" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : 'none'
                        }}
                      >
                        <span className="text-sm font-medium">S/ 20.00</span>
                      </div>
                      <div 
                        onClick={() => handleAmountSelect("30.00")}
                        className={`rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-center ${
                          selectedAmount === "30.00" 
                            ? 'bg-[#FEFEFE] text-[#951B85] shadow-lg' 
                            : 'bg-[#E8E8E8] text-[#777777]'
                        }`}
                        style={{
                          width: 'clamp(70px, 20vw, 90px)',
                          height: '25px',
                          boxShadow: selectedAmount === "30.00" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : 'none'
                        }}
                      >
                        <span className="text-sm font-medium">S/ 30.00</span>
                      </div>
                      <div 
                        onClick={() => handleAmountSelect("40.00")}
                        className={`rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-center ${
                          selectedAmount === "40.00" 
                            ? 'bg-[#FEFEFE] text-[#951B85] shadow-lg' 
                            : 'bg-[#E8E8E8] text-[#777777]'
                        }`}
                        style={{
                          width: 'clamp(70px, 20vw, 90px)',
                          height: '25px',
                          boxShadow: selectedAmount === "40.00" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : 'none'
                        }}
                      >
                        <span className="text-sm font-medium">S/ 40.00</span>
                      </div>
                      <div 
                        onClick={() => handleAmountSelect("100.00")}
                        className={`rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-center ${
                          selectedAmount === "100.00" 
                            ? 'bg-[#FEFEFE] text-[#951B85] shadow-lg' 
                            : 'bg-[#E8E8E8] text-[#777777]'
                        }`}
                        style={{
                          width: 'clamp(70px, 20vw, 90px)',
                          height: '25px',
                          boxShadow: selectedAmount === "100.00" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : 'none'
                        }}
                      >
                        <span className="text-sm font-medium">S/ 100.00</span>
                      </div>
                    </div>

                    <div 
                      className="mt-9 bg-white pl-4 rounded-xl flex items-center justify-start cursor-not-allowed shadow-sm w-full sm:w-[204px]"
                      style={{
                        height: '40px',
                        boxShadow: '0 4px 20px rgba(219, 8, 110, 0.15)'
                      }}
                    >
                      <span className="text-[14px] font-semibold text-[#777777]">S/ {selectedAmount}</span>
                    </div>
                  </div>

                  {/* Constancia de recarga */}
                  <div className="pb-1">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                        <ImagenIcon size={12} color="#FFFFFF" />
                      </div>
                      <h4 className="ml-2 text-lg font-semibold text-gray-900">Constancia de recarga</h4>
                      <div className="relative">
                        <button
                          onClick={togglePlinFileTooltip}
                          className="cursor-pointer"
                        >
                          <WarningIcon size={16} />
                        </button>
                        {showPlinFileTooltip && (
                          <div className="absolute bottom-8 left-0 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3 whitespace-nowrap">
                            <div className="relative">
                              <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-l border-b border-gray-200 transform rotate-45 z-10"></div>
                              <p className="text-[12px] font-medium text-[#777777] relative z-20">
                                Archivos <span className="text-[#333333]">JPG, PNG</span> / Máx <span className="text-[#333333]">40 MB</span>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div 
                      className="bg-white rounded-xl flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors duration-200 shadow-sm w-full sm:w-[484px]"
                      style={{
                        height: '40px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(219, 8, 110, 0.15)'
                      }}
                    >
                      <input type="file" className="hidden" id="plin-file-input" accept="image/*,.pdf" onChange={handleFileSelect} />
                      <label htmlFor="plin-file-input" className="cursor-pointer w-full h-full flex items-center justify-between px-4">
                        <span className="text-sm text-gray-500">Selecciona un archivo</span>
                        <Upload className="w-5 h-5 text-gray-400" />
                      </label>
                    </div>

                    {/* Chip del archivo seleccionado */}
                    {selectedFile && (
                      <div className="mt-3 flex items-center gap-2">
                        <div className="bg-[#6137E5] text-[#FBFBFB] px-3 py-1 rounded-full flex items-center gap-2">
                          <span className="text-[12px] font-medium">Img.01</span>
                          <button 
                            onClick={handleRemoveFile}
                            className="text-[#FBFBFB] hover:text-gray-200 transition-colors"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Botón Recargar */}
                  <div className="pb-8">
                    <GradientButton 
                      className="px-8 py-2 text-base font-bold"
                      onClick={handleRecargarClick}
                    >
                      Recargar
                    </GradientButton>
                  </div>
                </div>

                {/* Columna derecha */}
                <div className="w-full lg:w-64 flex flex-col items-center space-y-8">
                  {/* Conversión */}
                  <div className="text-start">
                    <p className="text-sm text-gray-600 mb-2">Recuerda que</p>
                    <div 
                      className="flex items-center gap-1 sm:gap-2 shadow-sm justify-center"
                      style={{
                        width: 'clamp(120px, 80vw, 162px)',
                        height: 'clamp(50px, 8vh, 60px)',
                        borderRadius: '16px',
                        padding: '8px',
                        background: 'linear-gradient(90deg, #EBE6FC 0%, #FBFBFB 100%)'
                      }}
                    >
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                        <span 
                          className="text-xs font-bold"
                          style={{
                            background: 'linear-gradient(90deg, #DB086E 0%, #3A05DF 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        >
                          1 Sol
                        </span>
                      </div>
                      <span className="text-gray-600 text-xs sm:text-sm">=</span>
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                        <span 
                          className="text-xs font-bold"
                          style={{
                            background: 'linear-gradient(90deg, #DB086E 0%, #3A05DF 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        >
                          1 WC
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="text-center pb-5">
                    <div className="w-32 h-32 bg-black rounded-lg flex items-center justify-center mx-auto mb-2">
                      <div className="w-28 h-28 bg-white rounded">
                        <div className="w-full h-full bg-white flex items-center justify-center">
                          <div className="grid grid-cols-8 gap-0.5">
                            {Array.from({ length: 64 }, (_, i) => (
                              <div 
                                key={i} 
                                className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-900 font-medium">978 000 546</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Confirmación */}
      {showConfirmationModal && (
        <CustomModal
          isOpen={showConfirmationModal}
          onClose={handleCancelRecarga}
          title="Recarga"
          breadcrumbs={["Mi cuenta", "Transacciones", "Recargar WC"]}
        >
          <div className="p-6 space-y-6">
              {/* Título principal */}
              <div className="text-center">
                <h3 className="text-[18px] font-medium text-black mb-2">
                  ¡Estás a un paso de recargar tus WC!
                </h3>
                <p className="text-[14px] font-normal text-[#777777]">
                  Confirma tu selección para continuar
                </p>
              </div>

              {/* Monto de recarga */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-16">
                  <div className="flex items-center gap-3">
                    <DolarIcon size={20} color="#000000" />
                    <span className="text-sm font-medium text-black">Monto de recarga</span>
                  </div>
                  <div 
                    className="bg-white rounded-xl px-4 py-2 border border-gray-200 flex items-center"
                    style={{
                      width: '118px',
                      height: '40px',
                      boxShadow: '0 2px 8px rgba(219, 8, 110, 0.15)'
                    }}
                  >
                    <span className="text-[14px] font-semibold text-[#BBBBBB]">
                      S/ {selectedAmount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Constancia de recarga */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-6">
                  <div className="flex items-start gap-8 pr-2">
                    <ImagenIcon size={20} color="#000000" />
                    <span className="text-sm font-medium text-black">Constancia de recarga</span>
                    </div>
                </div>
                
                {/* Imagen precargada */}
                {selectedFile && (
                  <div className="mt-3 flex justify-center pt-4 pb-2">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Constancia de recarga"
                      className="rounded-lg shadow-sm border border-gray-200 object-cover"
                      style={{
                        width: '138px',
                        height: '192px'
                      }}
                    />
                  </div>
                )}
                
                <div className="flex justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="modal-file-input"
                  />
                  <label 
                    htmlFor="modal-file-input"
                    className="bg-white rounded-xl px-4 py-2 border border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                    style={{
                      width: '230px',
                      height: '40px',
                      borderRadius: '16px',
                      border: '1px solid #E8E8E8',
                      boxShadow: '0 2px 8px rgba(219, 8, 110, 0.15)'
                    }}
                  >
                    <span className="text-sm text-gray-600">
                      Selecciona un archivo
                    </span>
                    <Upload className="w-6 h-6 text-gray-400" />
                  </label>
                </div>
                
                <div className="flex items-center gap-2 text-[#FF4444] text-xs justify-center">
                  <WarningIcon size={16} />
                  <span>Formato JPG, PNG / Máx 40 MB</span>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-center gap-2.5 p-6">
              <Button
                onClick={handleCancelRecarga}
                className="text-[#C80D0D] border border-[#C80D0D] bg-[#FEFEFE] hover:bg-gray-50 rounded-lg font-medium w-[138px] h-[40px]"
                style={{
                  boxShadow: '0 2px 8px rgba(219, 8, 110, 0.15)'
                }}
              >
                Cancelar
              </Button>
              <GradientButton
                onClick={handleConfirmRecarga}
                className="text-white rounded-lg font-medium"
              >
                Recargar
              </GradientButton>
            </div>
          </CustomModal>
        )}

      {/* Notification Toast */}
      <NotificationToast
        type={notification.type}
        title={notification.title}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />
    </div>
  )
}
