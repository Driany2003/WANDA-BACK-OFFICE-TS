"use client"

import { Button } from "@/components/ui/button"

import Image from "next/image"
import { CustomModal } from "@/components/shared/custom-modal"
import type { SelectedOption } from "@/types"

interface SelectionConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  selectedOptions: SelectedOption[]
  contestType: string
  contestName: string
  onConfirm: () => void
}

export function SelectionConfirmationModal({
  isOpen,
  onClose,
  selectedOptions,
  contestType,
  contestName,
  onConfirm,
}: SelectionConfirmationModalProps) {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Opción seleccionada"
      breadcrumbs={[contestType, contestName, "Opción seleccionada"]}
      className="sm:max-w-[425px]"
    >
      <div className="p-6 space-y-4">
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold text-gray-800">¡La carrera está por comenzar!</p>
          <p className="text-gray-600">Has seleccionado ({selectedOptions.length}) opciones en la carrera</p>
          <div className="flex justify-center gap-4 py-4">
            {selectedOptions.map((option) => (
              <div key={option.id} className="relative p-2 border-2 border-purple-500 rounded-lg">
                <Image
                  src={option.image || "/placeholder.svg"}
                  alt={`Option ${option.number}`}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <span className="absolute bottom-1 right-1 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {option.number}
                </span>
              </div>
            ))}
          </div>
          <p className="text-lg font-semibold text-gray-800">¿Desea continuar?</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="w-full sm:w-auto bg-gradient-to-r from-gradient-start to-gradient-end text-white hover:from-gradient-start hover:to-gradient-end"
          >
            Aceptar
          </Button>
        </div>
      </div>
    </CustomModal>
  )
}
