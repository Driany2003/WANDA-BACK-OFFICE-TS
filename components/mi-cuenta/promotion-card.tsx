"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import type { PromotionCardData } from "@/types"

interface PromotionCardProps extends PromotionCardData {
  onViewDetails: (promotion: PromotionCardData) => void
}

interface PromotionCardWithoutButtonProps extends PromotionCardData {
  onViewDetails: (promotion: PromotionCardData) => void
}

export function PromotionCard({ title, image, details, onViewDetails }: PromotionCardProps) {
  return (
    <div className="flex flex-col">
      <Card className="w-[319px] h-[200px] overflow-hidden hover:shadow-lg transition-shadow rounded-lg">
        <div className="relative w-full h-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
          />
          {/* Overlay para el título */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-[#FEFEFE]" />
          <div className="absolute top-0 left-0 right-0 p-3">
            <h3 className="text-base font-medium text-[#333333]">{title}</h3>
          </div>
        </div>
      </Card>
      <div className="mt-3">
        <Button
          className="w-[319px] bg-gradient-to-r from-[#DB086E] to-[#3A05DF] hover:from-[#C7055F] hover:to-[#2A04C4] text-white font-medium"
          onClick={() => onViewDetails({ title, image, details, id: details.id, status: "activas", createdAt: "", expiredAt: "" })}
        >
          Ver información
        </Button>
      </div>
    </div>
  )
}

export function PromotionCardWithoutButton({ title, image, details, expiredAt, onViewDetails }: PromotionCardWithoutButtonProps) {
  return (
    <Card className="w-[319px] h-[200px] overflow-hidden hover:shadow-lg transition-shadow rounded-lg cursor-pointer relative" onClick={() => onViewDetails({ title, image, details, id: details.id, status: "vencidas", createdAt: "", expiredAt })}>
      <div className="relative w-full h-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
        {/* Overlay para el título */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-[#FEFEFE]" />
        <div className="absolute top-0 left-0 right-0 p-3">
          <h3 className="text-base font-medium text-[#333333]">{title}</h3>
        </div>
        
        {/* Fecha de vencimiento */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-[#FBFBFB] px-2 py-1 rounded-full">
            <span className="text-xs font-medium text-[#890277]">
              Venció el {expiredAt}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
