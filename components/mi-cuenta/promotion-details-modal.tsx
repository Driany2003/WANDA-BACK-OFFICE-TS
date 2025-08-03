"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CustomModal } from "@/components/shared/custom-modal"
import { NotificationToast } from "@/components/ui/notification-toast"

import type { PromotionDetails } from "@/types"

interface PromotionDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  promotion: PromotionDetails
  onRequest?: () => void
  isExpired?: boolean
}

export function PromotionDetailsModal({ isOpen, onClose, promotion, onRequest, isExpired = false }: PromotionDetailsModalProps) {
  const handleRequest = () => {
    onClose()
    if (onRequest) {
      setTimeout(() => {
        onRequest()
      }, 300)
    }
  }

  if (!promotion) return null

  return (
    <CustomModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={promotion.title}
      breadcrumbs={promotion.breadcrumbs}
      className="h-[500px]"
    >
      <div className="bg-[#FBFBFB] p-6 space-y-6">

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src={promotion.image || "/placeholder.svg"}
            alt={promotion.title}
            width={200}
            height={200}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Title and Description */}
        <h2 className="text-xl font-bold text-gray-900 text-center mb-3">{promotion.title}</h2>
        <div className="text-gray-700 text-sm leading-relaxed space-y-3">
          <p>{promotion.description}</p>
        </div>

        {/* How to Participate */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">¿Cómo Participar?</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
            {promotion.howToParticipate.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>

        {/* Terms and Conditions */}
        <div className="text-left">
          <a href={promotion.termsLink} className="text-[#3A05DF] underline text-sm">
            Aplican términos y condiciones
          </a>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 pt-8">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-9 gap-2 sm:px-6 py-2 sm:py-2 text-red-600 border border-gray-300 bg-white shadow-md hover:bg-gray-50 text-sm sm:text-base"
          >
            {isExpired ? "Cerrar" : "Cancelar"}
          </Button>
          {!isExpired && (
            <Button 
              className="bg-gradient-to-r from-[#DB086E] to-[#3A05DF] hover:from-[#C7055F] hover:to-[#2A04C4] text-white px-8 py-3 font-medium"
              onClick={handleRequest}
            >
              Solicitar
            </Button>
          )}
        </div>
      </div>
    </CustomModal>
  )
}
