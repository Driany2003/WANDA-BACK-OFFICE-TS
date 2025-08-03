"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { ChevronLeft, Trophy, PawPrint } from "lucide-react"
import Image from "next/image"
import { ANIMAL_GAMES, CONTEST_GAMES } from "@/lib/constants"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { SelectionConfirmationModal } from "@/components/modals/selection-confirmation-modal" // Import the modal

interface GameDetailPageProps {
  params: {
    id: string
  }
}

export default function GameDetailPage({ params }: GameDetailPageProps) {
  const router = useRouter()
  const { id } = params

  const allGames = [...ANIMAL_GAMES, ...CONTEST_GAMES]
  const game = allGames.find((g) => g.id === id)

  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [wcAmount, setWcAmount] = useState(0)

  // State for the selection confirmation modal
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false)
  const [modalData, setModalData] = useState<{
    selectedOptions: { id: string; image: string; number: number }[]
    contestType: string
    contestName: string
  } | null>(null)

  const handleConcursarClick = () => {
    if (selectedOption === null || wcAmount <= 0) {
      alert("Por favor, selecciona una opción y un monto de WC válido para concursar.")
      return
    }

    const selectedGameOption = game?.details.options.find((opt) => opt.id === selectedOption)
    if (!selectedGameOption) {
      alert("Opción seleccionada no válida.")
      return
    }

    setModalData({
      selectedOptions: [
        { id: String(selectedGameOption.id), image: selectedGameOption.image, number: selectedGameOption.number || 0 },
      ],
      contestType: game?.type === "animalitos" ? "Animalitos" : "Concursos",
      contestName: game?.title || "Juego",
    })
    setIsSelectionModalOpen(true)
  }

  const handleConfirmSelection = () => {
    console.log("Selección confirmada:", modalData)
    setIsSelectionModalOpen(false)
    setModalData(null)
    // Here you would typically proceed with the contest entry logic
    alert(
      `¡Has concursado en ${modalData?.contestName} con la opción ${modalData?.selectedOptions[0].number} y ${wcAmount} WC!`,
    )
  }

  if (!game) {
    return (
      <div className="text-center py-12 p-[50px]">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Juego no encontrado</h2>
        <Button onClick={() => router.back()}>Volver</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-[50px]">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">{game.title}</h1>
      </div>

      <p className="text-lg text-gray-700 font-semibold text-center mb-8">{game.details.slogan}</p>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {game.details.detailImages.map((img, index) => (
          <Image
            key={index}
            src={img || "/placeholder.svg"}
            alt={`${game.title} image ${index + 1}`}
            width={350}
            height={250}
            className="w-full h-auto rounded-lg object-cover"
          />
        ))}
      </div>

      {/* Participation Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-900">Participa con:</span>
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">WC</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">{game.details.participateCost}</span>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Opciones disponibles</h3>
          <div className="flex flex-wrap gap-4">
            {game.details.options.map((option) => (
              <Card
                key={option.id}
                className={`p-2 cursor-pointer ${
                  selectedOption === option.id ? "border-2 border-purple-600 shadow-md" : "border-gray-200"
                }`}
                onClick={() => setSelectedOption(option.id)}
              >
                <Image src={option.image || "/placeholder.svg"} alt={`Option ${option.id}`} width={50} height={50} />
                {option.number && (
                  <span className="absolute bottom-1 right-1 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {option.number}
                  </span>
                )}
              </Card>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-32">
            <Input
              type="number"
              placeholder="Total"
              value={wcAmount}
              onChange={(e) => setWcAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <GradientButton
            className="px-8 py-2"
            onClick={handleConcursarClick} // Trigger modal from here
          >
            Concursar
          </GradientButton>
        </div>
      </div>

      {modalData && (
        <SelectionConfirmationModal
          isOpen={isSelectionModalOpen}
          onClose={() => setIsSelectionModalOpen(false)}
          selectedOptions={modalData.selectedOptions}
          contestType={modalData.contestType}
          contestName={modalData.contestName}
          onConfirm={handleConfirmSelection}
        />
      )}
    </div>
  )
}
