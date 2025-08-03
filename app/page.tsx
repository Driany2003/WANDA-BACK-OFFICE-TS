"use client"
import { HeroSection } from "@/components/sections/hero-section"
import { GameCard } from "@/components/sections/game-card"
import { ResultCard } from "@/components/sections/result-card"
import { WinnerCard } from "@/components/sections/winner-card"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { ANIMAL_GAMES, CONTEST_GAMES, RESULTS_DATA, WINNERS_DATA } from "@/lib/constants"
import { PawPrint, Trophy, BarChart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { SelectionConfirmationModal } from "@/components/modals/selection-confirmation-modal"
import type { SelectedOption } from "@/types"

export default function HomePage() {
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false)
  const [modalData, setModalData] = useState<{
    selectedOptions: SelectedOption[]
    contestType: string
    contestName: string
  } | null>(null)


  const handleConcursarClick = (gameId: string, gameTitle: string, gameType: "Animalitos" | "Concursos") => {
    const gameDetails = [...ANIMAL_GAMES, ...CONTEST_GAMES].find((game) => game.id === gameId)?.details
    const dummyOptions: SelectedOption[] =
      gameDetails?.options.slice(0, 2).map((opt) => ({
        id: String(opt.id),
        image: opt.image,
        number: opt.number || 0,
      })) || []

    setModalData({
      selectedOptions: dummyOptions,
      contestType: gameType,
      contestName: gameTitle,
    })
    setIsSelectionModalOpen(true)
  }

  const handleConfirmSelection = () => {
    console.log("Selección confirmada:", modalData)
    setIsSelectionModalOpen(false)
    setModalData(null)
    // Here you would typically proceed with the contest entry logic
  }

  return (
    <div className="space-y-12">
      <HeroSection />

      {/* Contenido principal con padding de 50px */}
      <div className="p-[50px] space-y-12">

        {/* Animalitos Online Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <PawPrint className="w-6 h-6 text-purple-600" />
              Animalitos online
            </h2>
            <GradientButton>
              ¿Cómo concursar?
            </GradientButton>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ANIMAL_GAMES.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onConcursar={() => handleConcursarClick(game.id, game.title, "Animalitos")}
              />
            ))}
          </div>
        </section>

        {/* Concursos Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-purple-600" />
            Concursos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONTEST_GAMES.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onConcursar={() => handleConcursarClick(game.id, game.title, "Concursos")}
              />
            ))}
          </div>
        </section>

        {/* Resultados Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart className="w-6 h-6 text-purple-600" />
            Resultados
          </h2>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Animalitos 14/10/2024</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {RESULTS_DATA.filter((result) => result.type === "Animalitos")
                .slice(0, 4)
                .map((result) => (
                  <ResultCard key={result.id} result={result} />
                ))}
            </div>
            <div className="flex justify-end mt-4">
              <Link href="/resultados?type=animalitos">
                <GradientButton>
                  Más resultados
                </GradientButton>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Concursos 14/10/2024</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {RESULTS_DATA.filter((result) => result.type === "Concursos")
                .slice(0, 4)
                .map((result) => (
                  <ResultCard key={result.id} result={result} />
                ))}
            </div>
            <div className="flex justify-end mt-4">
              <Link href="/resultados?type=concursos">
                <GradientButton>
                  Más resultados
                </GradientButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Ganadores Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-purple-600" />
            Ganadores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WINNERS_DATA.map((winner) => (
              <WinnerCard key={winner.id} winner={winner} />
            ))}
          </div>
        </section>
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
