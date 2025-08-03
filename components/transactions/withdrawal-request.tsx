"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { WarningIcon, WcIconNegro } from "@/components/icons/transaction-icons"
import { NotificationToast } from "@/components/ui/notification-toast"
import { CustomModal } from "@/components/shared/custom-modal"

const PAYMENT_METHODS = [
  {
    id: 1,
    name: "Billetera móvil - Yape 938 000 000",
    type: "Yape",
    logo: "/yape.png",
    time: "Depósito efectivo en 1 hora",
    color: "bg-green-500"
  },
  {
    id: 2,
    name: "Cuenta bancaria - BCP ************08",
    type: "BCP",
    logo: "/bcp.png",
    time: "Depósito efectivo en 4 horas",
    color: "bg-blue-500"
  }
]

const WITHDRAWAL_AMOUNTS = [20, 30, 40, 50]
const AVAILABLE_BALANCE = 25 // Saldo disponible en WC

export function WithdrawalRequest() {
  const [selectedAmount, setSelectedAmount] = useState(20)
  const [customAmount, setCustomAmount] = useState("20")
  const [expandedMethod, setExpandedMethod] = useState<number | null>(null)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [showInsufficientBalanceWarning, setShowInsufficientBalanceWarning] = useState(false)

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount(amount.toString())
    // Validar si el monto seleccionado excede el saldo disponible
    setShowInsufficientBalanceWarning(amount > AVAILABLE_BALANCE)
  }

  const toggleMethod = (methodId: number) => {
    setExpandedMethod(expandedMethod === methodId ? null : methodId)
  }

  const handleSolicitarClick = () => {
    // Validar si el monto seleccionado excede el saldo disponible
    if (selectedAmount > AVAILABLE_BALANCE) {
      setShowInsufficientBalanceWarning(true)
      return
    }
    setShowConfirmationModal(true)
  }

  const handleConfirmSolicitud = () => {
    setShowConfirmationModal(false)
    setShowNotification(true)
    // Reset form
    setSelectedAmount(20)
    setCustomAmount("20")
    setShowInsufficientBalanceWarning(false)
  }

  const handleCancelSolicitud = () => {
    setShowConfirmationModal(false)
  }

  const closeNotification = () => {
    setShowNotification(false)
  }

  return (
    <div className="space-y-6">
      {/* Métodos de pago registrados */}
      <div>
        <h3 className="text-[18px] font-medium mt-10 mb-8" style={{ color: '#000000' }}>Métodos de pago registrados</h3>
                  <div className="space-y-3 sm:space-y-4">
          {PAYMENT_METHODS.map((method) => (
            <div key={method.id} className={`w-full max-w-[1026px] ${expandedMethod === method.id ? "min-h-[72px]" : "h-[72px]"}`}>
              <Card className="p-3 sm:p-4 pb-4 bg-[#FEFEFE]">
                              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={method.logo || "/placeholder.svg"}
                      alt={method.type}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{method.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{method.time}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleMethod(method.id)}
                    className="p-2"
                  >
                    {expandedMethod === method.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </Card>

              {/* Formulario expandible */}
              {expandedMethod === method.id && (
                <div className="pt-4 sm:pt-6 bg-transparent border-t border-gray-100/50">
                  <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="lg:col-span-2 order-2 lg:order-1">
                      <div className="flex items-center gap-2 mt-1 mb-6">
                        <WcIconNegro size={20} />
                        <h4 className="text-[16px] font-semibold" style={{ color: '#333333' }}>WC a retirar</h4>
                      </div>

                      {/* Botones de cantidad predefinida */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {WITHDRAWAL_AMOUNTS.map((amount) => (
                          <button
                            key={amount}
                            onClick={() => handleAmountSelect(amount)}
                            className={`w-[70px] sm:w-[90px] h-6 px-1 rounded-[50px] transition-all duration-200 ${
                              selectedAmount === amount 
                                ? "bg-[#FEFEFE] text-[#951B85] font-medium text-xs sm:text-sm" 
                                : "bg-[#E8E8E8] text-[#777777] font-medium text-xs"
                            }`}
                            style={{
                              boxShadow: selectedAmount === amount ? '0 2px 8px rgba(219, 8, 110, 0.25)' : 'none'
                            }}
                          >
                            {amount}
                          </button>
                        ))}
                      </div>

                      {/* Campo de entrada personalizada */}
                      <div className="mt-6 sm:mt-8 mb-4">
                        <Input
                          type="text"
                          value={customAmount}
                          readOnly
                          className="w-full sm:w-[204px] h-[40px]"
                          placeholder="Ingresa el monto"
                          style={{
                            boxShadow: '0 2px 8px rgba(219, 8, 110, 0.25)'
                          }}
                        />
                      </div>

                      {/* Botón de solicitar */}
                      <Button 
                        className="w-full sm:w-[138px] h-[40px] text-base sm:text-lg font-semibold mt-4 bg-gradient-to-r from-[#DB086E] to-[#3A05DF] text-[#FBFBFB] hover:shadow-lg transition-all duration-200"
                        style={{
                          boxShadow: '0 2px 8px rgba(219, 8, 110, 0.25)'
                        }}
                        onClick={handleSolicitarClick}
                      >
                        Solicitar
                      </Button>
                      
                      {/* Advertencia de saldo insuficiente */}
                      {showInsufficientBalanceWarning && (
                        <div className="flex items-start justify-start gap-2 mt-4">
                          <WarningIcon size={16} />
                          <p className="text-xs sm:text-sm" style={{ color: '#FF4444' }}>
                            El monto a retirar (WC {selectedAmount}) excede tu saldo disponible (WC {AVAILABLE_BALANCE})
                          </p>
                        </div>
                      )}
                      
                      {/* Icono de warning */}
                      <div className="flex items-start justify-start gap-2 mt-6 mb-6 sm:mb-6">
                        <WarningIcon size={16} />
                        <p className="text-xs sm:text-sm" style={{ color: '#FF4444' }}>
                          Recuerda que debes contar con un mínimo acumulado de WC 20 para realizar tus retiros
                        </p>
                      </div>
                      </div>

                    {/* Información adicional */}
                    <div className="w-full lg:w-64 flex flex-col items-center space-y-8 sm:space-y-12 order-1 lg:order-2">
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
                </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal de confirmación */}
      {showConfirmationModal && (
        <CustomModal
          isOpen={showConfirmationModal}
          onClose={handleCancelSolicitud}
          title="Solicitud de retiro"
          breadcrumbs={["Mi cuenta", "Transacciones", "Solicitar retiro WC"]}
        >
          <div className="space-y-6">
                {/* Imagen */}
                <div className="flex justify-center">
                  <Image 
                    src="/recurso.png" 
                    alt="Recurso" 
                    width={200} 
                    height={150} 
                    className="object-contain"
                  />
                </div>

                {/* Título principal */}
                <div className="text-center">
                  <h3 className="text-[18px] font-medium mb-3" style={{ color: '#333333' }}>¡Estás a un paso de solicitar tu retiro!</h3>
                  <p className="text-[14px] font-normal" style={{ color: '#777777' }}>Confirma tu selección para continuar</p>
                </div>

                {/* Información del retiro */}
                <div className="space-y-6">
                  {/* WC disponibles */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2 w-[160px] justify-start">
                      <WcIconNegro size={20} />
                      <span className="text-[14px] font-medium text-[#333333]">WC disponibles</span>
                    </div>
                    <div 
                      className="w-[118px] h-[40px] bg-[#FEFEFE] border border-gray-200 rounded-md flex items-center justify-center ml-8"
                      style={{
                        boxShadow: '0 2px 8px rgba(219, 8, 110, 0.15)'
                      }}
                    >
                      <span className="text-[14px] font-semibold text-[#BBBBBB]">25</span>
                    </div>
                  </div>

                  {/* WC a retirar */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2 w-[160px] justify-start">
                      <WcIconNegro size={20} />
                      <span className="text-[14px] font-medium text-[#333333]">WC a retirar</span>
                    </div>
                    <div 
                      className="w-[118px] h-[40px] bg-[#FEFEFE] border border-gray-200 rounded-md flex items-center justify-center ml-8"
                      style={{
                        boxShadow: '0 2px 8px rgba(219, 8, 110, 0.15)'
                      }}
                    >
                      <span className="text-[14px] font-semibold text-[#BBBBBB]">{selectedAmount}</span>
                    </div>
                  </div>

                  {/* Billetera móvil */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2 w-[160px] justify-start">
                      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_229_1672)">
                          <path d="M2.89092 3.33735C4.22092 3.22235 4.92842 3.69985 5.20592 3.95985C5.86607 4.29278 6.5941 4.46901 7.33342 4.47485C8.09517 4.47341 8.84388 4.27719 9.50842 3.90485C9.81842 3.64235 10.5184 3.22985 11.7634 3.33735C11.8828 3.34733 12.0012 3.30965 12.0928 3.23254C12.1845 3.15544 12.2419 3.04519 12.2524 2.9259C12.263 2.80661 12.2259 2.68798 12.1493 2.59596C12.0726 2.50394 11.9627 2.44602 11.8434 2.43485C10.9123 2.31365 9.96819 2.52336 9.17592 3.02735L9.66842 1.47985C9.69848 1.38448 9.70565 1.28338 9.68932 1.18473C9.673 1.08608 9.63366 0.992665 9.57449 0.912063C9.51532 0.831462 9.43798 0.765942 9.34875 0.720818C9.25952 0.675694 9.16091 0.652236 9.06092 0.652348H5.59592C5.49452 0.651999 5.39451 0.675935 5.30425 0.722156C5.21399 0.768376 5.13611 0.835537 5.07712 0.91802C5.01814 1.0005 4.97976 1.09591 4.9652 1.19627C4.95063 1.29662 4.96031 1.399 4.99342 1.49485L5.52842 3.06235C5.02092 2.70485 4.14842 2.31735 2.81342 2.43485C2.69374 2.44512 2.58305 2.50252 2.50569 2.59442C2.42833 2.68631 2.39065 2.80517 2.40092 2.92485C2.4112 3.04453 2.4686 3.15522 2.56049 3.23258C2.65238 3.30994 2.77124 3.34762 2.89092 3.33735Z" fill="black"/>
                          <path d="M13.2485 11.0598C13.0891 10.7227 12.9955 10.3583 12.9727 9.98612C12.418 9.94631 11.8882 9.73983 11.4528 9.39374C11.0174 9.04764 10.6968 8.57808 10.5328 8.0466C10.3689 7.51512 10.3694 6.94652 10.5342 6.41532C10.699 5.88411 11.0205 5.4151 11.4565 5.06975C11.0893 4.72288 10.6505 4.46088 10.1709 4.30225C9.33447 4.84419 8.36012 5.13485 7.36344 5.13975C6.35163 5.1307 5.36068 4.85103 4.49344 4.32975C1.97094 5.23225 1.75094 8.36725 1.78094 9.73225C1.79016 10.1911 1.69169 10.6458 1.49344 11.0597L0.680943 12.7622C0.552087 13.0314 0.493548 13.3287 0.510795 13.6266C0.528042 13.9245 0.620511 14.2131 0.779565 14.4656C0.938619 14.718 1.15907 14.926 1.42031 15.0701C1.68156 15.2143 1.97508 15.2898 2.27344 15.2897H12.4684C12.7669 15.2899 13.0605 15.2144 13.3219 15.0704C13.5833 14.9264 13.804 14.7184 13.9632 14.466C14.1225 14.2136 14.2152 13.925 14.2328 13.627C14.2503 13.3291 14.192 13.0316 14.0634 12.7622L13.2485 11.0598ZM7.80139 12.4944H7.70274V13.3219C7.70274 13.4213 7.66323 13.5167 7.59291 13.587C7.52258 13.6574 7.4272 13.6969 7.32774 13.6969C7.22829 13.6969 7.1329 13.6574 7.06258 13.587C6.99225 13.5167 6.95274 13.4213 6.95274 13.3219V12.4944H5.85679C5.80755 12.4944 5.75878 12.4847 5.71329 12.4658C5.66779 12.447 5.62645 12.4194 5.59163 12.3845C5.55681 12.3497 5.52918 12.3084 5.51034 12.2629C5.49149 12.2174 5.48179 12.1686 5.48179 12.1194C5.48179 12.0701 5.49149 12.0214 5.51034 11.9759C5.52918 11.9304 5.55681 11.889 5.59163 11.8542C5.62645 11.8194 5.66779 11.7918 5.71329 11.7729C5.75878 11.7541 5.80755 11.7444 5.85679 11.7444H7.80139C7.96649 11.7444 8.12483 11.6788 8.24157 11.562C8.35831 11.4453 8.42389 11.287 8.42389 11.1219C8.42389 10.9568 8.35831 10.7984 8.24157 10.6817C8.12483 10.565 7.96649 10.4994 7.80139 10.4994H6.92907C6.54521 10.4994 6.17708 10.3469 5.90565 10.0755C5.63423 9.80403 5.48174 9.4359 5.48174 9.05205C5.48174 8.66819 5.63423 8.30006 5.90565 8.02863C6.17708 7.75721 6.54521 7.60472 6.92907 7.60472H6.95274V6.68882C6.95274 6.58937 6.99225 6.49398 7.06258 6.42366C7.1329 6.35333 7.22829 6.31382 7.32774 6.31382C7.4272 6.31382 7.52258 6.35333 7.59291 6.42366C7.66323 6.49398 7.70274 6.58937 7.70274 6.68882V7.60485H8.62499C8.72445 7.60485 8.81983 7.64436 8.89016 7.71468C8.96048 7.78501 8.99999 7.88039 8.99999 7.97985C8.99999 8.0793 8.96048 8.17469 8.89016 8.24501C8.81983 8.31534 8.72445 8.35485 8.62499 8.35485H6.92907C6.74413 8.35485 6.56676 8.42831 6.43599 8.55909C6.30521 8.68986 6.23174 8.86723 6.23174 9.05217C6.23174 9.23711 6.30521 9.41448 6.43599 9.54525C6.56676 9.67603 6.74413 9.7495 6.92907 9.7495H7.80139C8.1654 9.7495 8.5145 9.8941 8.7719 10.1515C9.02929 10.4089 9.17389 10.758 9.17389 11.122C9.17389 11.486 9.02929 11.8351 8.7719 12.0925C8.5145 12.3499 8.1654 12.4944 7.80139 12.4944Z" fill="black"/>
                          <path d="M13.1752 5.14185C12.7619 5.14184 12.3578 5.26439 12.0142 5.49402C11.6705 5.72365 11.4026 6.05003 11.2444 6.4319C11.0863 6.81377 11.0449 7.23396 11.1255 7.63935C11.2061 8.04474 11.4052 8.41712 11.6974 8.70939C11.9897 9.00166 12.3621 9.2007 12.7675 9.28134C13.1729 9.36198 13.593 9.32059 13.9749 9.16242C14.3568 9.00424 14.6832 8.73638 14.9128 8.3927C15.1424 8.04903 15.265 7.64498 15.265 7.23165C15.265 6.6774 15.0448 6.14586 14.6529 5.75395C14.261 5.36204 13.7295 5.14186 13.1752 5.14185ZM14.0448 7.53597H13.5088V8.10115C13.508 8.18913 13.4725 8.27325 13.41 8.3352C13.3475 8.39715 13.2631 8.43191 13.1751 8.43191C13.0871 8.43191 13.0027 8.39715 12.9402 8.3352C12.8777 8.27325 12.8423 8.18913 12.8415 8.10115V7.53597H12.3056C12.2172 7.53597 12.1323 7.50082 12.0697 7.43825C12.0071 7.37568 11.972 7.29081 11.972 7.20232C11.972 7.11383 12.0071 7.02897 12.0697 6.96639C12.1323 6.90382 12.2172 6.86867 12.3056 6.86867H12.8415V6.36217C12.8411 6.31811 12.8495 6.27442 12.8661 6.2336C12.8827 6.19279 12.9072 6.15567 12.9382 6.12438C12.9692 6.09309 13.0061 6.06826 13.0468 6.05131C13.0875 6.03436 13.1311 6.02563 13.1751 6.02563C13.2192 6.02563 13.2628 6.03436 13.3035 6.05131C13.3441 6.06826 13.3811 6.09309 13.4121 6.12438C13.4431 6.15567 13.4676 6.19279 13.4842 6.2336C13.5008 6.27442 13.5092 6.31811 13.5088 6.36217V6.86867H14.0448C14.1333 6.86867 14.2181 6.90382 14.2807 6.96639C14.3433 7.02897 14.3784 7.11383 14.3784 7.20232C14.3784 7.29081 14.3433 7.37568 14.2807 7.43825C14.2181 7.50082 14.1333 7.53597 14.0448 7.53597Z" fill="black"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_229_1672">
                            <rect width="16" height="16" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                      <span className="text-[14px] font-medium text-[#333333]">Billetera móvil</span>
                    </div>
                    <span className="text-[14px] font-semibold text-[#BBBBBB] ml-8 w-[118px] text-center">Yape 938 000 000</span>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex justify-center gap-2.5">
                  <Button 
                    className="w-[138px] h-[40px] bg-[#FEFEFE] text-[#C80D0D] border border-[#C80D0D] hover:bg-[#FEFEFE]"
                    style={{
                      boxShadow: '0 2px 8px rgba(219, 8, 110, 0.15)'
                    }}
                    onClick={handleCancelSolicitud}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    className="w-[138px] h-[40px] bg-gradient-to-r from-[#DB086E] to-[#3A05DF] text-white hover:shadow-lg"
                    style={{
                      boxShadow: '0 2px 8px rgba(219, 8, 110, 0.15)'
                    }}
                    onClick={handleConfirmSolicitud}
                  >
                    Solicitar
                  </Button>
                </div>
              </div>
          </CustomModal>
        )}

      {/* Notificación de éxito */}
      {showNotification && (
        <NotificationToast
          type="success"
          title="¡Solicitud registrada con éxito!"
          message="Te notificaremos al realizar tu depósito"
          isVisible={showNotification}
          onClose={closeNotification}
        />
      )}
    </div>
  )
} 