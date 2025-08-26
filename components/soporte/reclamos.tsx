"use client"

import { useState } from 'react'
import { Todos } from './reclamos/todos'
import { EnProceso } from './reclamos/en-proceso'
import { Resueltos } from './reclamos/resueltos'

export function Reclamos() {
  const [activeSubTab, setActiveSubTab] = useState('todos')

  return (
    <div className="space-y-6 min-h-[600px]">
      {/* Sub-pestañas */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveSubTab("todos")}
          className={`w-[100px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
            activeSubTab === "todos" 
              ? "bg-[#890277] text-white shadow-md" 
              : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
          }`}
          style={{
            boxShadow: activeSubTab === "todos" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : '0 2px 8px rgba(219, 8, 110, 0.15)'
          }}
        >
          Todos
        </button>
        <button
          onClick={() => setActiveSubTab("en-proceso")}
          className={`w-[100px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
            activeSubTab === "en-proceso" 
              ? "bg-[#890277] text-white shadow-md" 
              : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
          }`}
          style={{
            boxShadow: activeSubTab === "en-proceso" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : '0 2px 8px rgba(219, 8, 110, 0.15)'
          }}
        >
          En proceso
        </button>
        <button
          onClick={() => setActiveSubTab("resueltos")}
          className={`w-[100px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
            activeSubTab === "resueltos" 
              ? "bg-[#890277] text-white shadow-md" 
              : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
          }`}
          style={{
            boxShadow: activeSubTab === "resueltos" ? '0 4px 20px rgba(219, 8, 110, 0.15)' : '0 2px 8px rgba(219, 8, 110, 0.15)'
          }}
        >
          Resueltos
        </button>

      </div>

      {/* Contenido de las sub-pestañas */}
      {activeSubTab === "todos" && <Todos />}
      {activeSubTab === "en-proceso" && <EnProceso />}
      {activeSubTab === "resueltos" && <Resueltos />}
    </div>
  )
}
