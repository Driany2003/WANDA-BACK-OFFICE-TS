"use client"

import { useState } from "react"
import { NotificacionesNoLeidas } from "./notificaciones-no-leidas"
import { NotificacionesLeidas } from "./notificaciones-leidas"
import { NotificacionesEnviadas } from "./notificaciones-enviadas"
import { NotificacionesPapelera } from "./notificaciones-papelera"

export function Notificaciones() {
  const [activeTab, setActiveTab] = useState("no-leidas")

  const tabs = [
    { id: "no-leidas", label: "No leídos", component: NotificacionesNoLeidas },
    { id: "leidas", label: "Leídos", component: NotificacionesLeidas },
    { id: "enviadas", label: "Enviadas", component: NotificacionesEnviadas },
    { id: "papelera", label: "Papelera", component: NotificacionesPapelera }
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || NotificacionesNoLeidas

  return (
    <div className="space-y-6">
      {/* Sub-pestañas de Notificaciones */}
      <div className="flex gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-[100px] h-6 px-1 rounded-[50px] font-medium transition-all duration-200 text-sm ${
              activeTab === tab.id
                ? "bg-[#890277] text-white shadow-md"
                : "bg-[#FEFEFE] text-gray-600 hover:text-gray-800 border border-gray-200"
            }`}
            style={{
              boxShadow: activeTab === tab.id ? '0 4px 20px rgba(219, 8, 110, 0.15)' : '0 2px 8px rgba(219, 8, 110, 0.15)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        <ActiveComponent />
      </div>
    </div>
  )
}

