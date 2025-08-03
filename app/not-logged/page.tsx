"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GameCard } from "@/components/sections/game-card"
import { ResultCard } from "@/components/sections/result-card"
import { WinnerCard } from "@/components/sections/winner-card"
import { HeroSection } from "@/components/sections/hero-section"
import { HowToCompeteModal } from "@/components/modals/how-to-compete-modal"
import { ANIMAL_GAMES, CONTEST_GAMES, RESULTS_DATA, WINNERS_DATA } from "@/lib/constants"
import { Animalito, Pieza, Estadistica, Ganadores, RegresarFlecha } from "@/components/icons/concursos-icons"
import { TiktokIcon } from "@/components/icons"
import Link from "next/link"

export default function NotLoggedPage() {
  const [isHowToCompeteModalOpen, setIsHowToCompeteModalOpen] = useState(false)

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <HeroSection /> 

      <div className="p-[50px] space-y-12">
        
        {/* Animalitos Online */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Animalito />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#DB086E] to-[#3A05DF] bg-clip-text text-transparent">Animalitos online</h2>
            </div>
            <Button
              className="text-[#FBFBFB] font-semibold"
              style={{ background: 'linear-gradient(135deg, #DB086E 0%, #3A05DF 100%)' }}
              onClick={() => setIsHowToCompeteModalOpen(true)}
            >
              ¿Cómo concursar?
            </Button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4">
            {ANIMAL_GAMES.map((game) => (
              <div key={game.id} className="flex-shrink-0">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </section>

        {/* Concursos */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Pieza />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#DB086E] to-[#3A05DF] bg-clip-text text-transparent">Concursos</h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4">
            {CONTEST_GAMES.map((game) => (
              <div key={game.id} className="flex-shrink-0">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </section>

        {/* Resultados */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Estadistica />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#DB086E] to-[#3A05DF] bg-clip-text text-transparent">Resultados</h2>
            </div>
          </div>

          {/* Animalitos Results */}
          <div className="mb-12 mt-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-[#333333] mb-5 mt-5">Animalitos <span className="text-[#1C1C1C] font-bold">14/10/2024</span></h3>
              <Link href="/resultados?type=animalitos">
                {" "}
                {/* Added type query parameter */}
                <Button
                  className="text-[#FBFBFB] font-semibold"
                  style={{ background: 'linear-gradient(135deg, #DB086E 0%, #3A05DF 100%)' }}
                >
                  Más resultados
                </Button>
              </Link>
            </div>
            <div className="flex gap-12 overflow-x-auto pb-4">
              {RESULTS_DATA.filter((result) => result.type === "Animalitos")
                .slice(0, 4)
                .map((result) => (
                  <ResultCard result={result} />
                ))}
            </div>
          </div>

          {/* Concursos Results */}
          <div className="mb-12 mt-12">
            <div className="flex items-center justify-between mb-4 ">
              <h3 className="text-base font-medium text-[#333333] mb-5 mt-5">Concursos <span className="text-[#1C1C1C] font-bold">14/10/2024</span></h3>
              <Link href="/resultados?type=concursos">
                {" "}
                {/* Added type query parameter */}
                <Button
                  className="text-[#FBFBFB] font-semibold"
                  style={{ background: 'linear-gradient(135deg, #DB086E 0%, #3A05DF 100%)' }}
                >
                  Más resultados
                </Button>
              </Link>
            </div>
            <div className="flex gap-12 overflow-x-auto pb-4">
              {RESULTS_DATA.filter((result) => result.type === "Concursos")
                .slice(0, 4)
                .map((result) => (
                  <ResultCard result={result} />
                ))}
            </div>
          </div>
        </section>

        {/* Ganadores */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Ganadores />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#DB086E] to-[#3A05DF] bg-clip-text text-transparent">Ganadores</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WINNERS_DATA.map((winner) => (
              <WinnerCard key={winner.id} winner={winner} />
            ))}
          </div>
        </section>
      </div>

      {/* Modal "¿Cómo concursar?" */}
      <HowToCompeteModal isOpen={isHowToCompeteModalOpen} onClose={() => setIsHowToCompeteModalOpen(false)} />

      {/* Botón flotante de TikTok */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="w-[82px] h-[82px] rounded-full shadow-xl transition-transform hover:scale-105 flex items-center justify-center bg-black"
          style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)' }}
          onClick={() => window.open('https://www.tiktok.com/@wanda', '_blank')}
        >
          <TiktokIcon size={40} className="text-white" />
        </button>
      </div>
    </div>
  )
} 