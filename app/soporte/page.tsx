"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { RefreshCw, MoreVertical } from "lucide-react"

export default function SoportePage() {
  return (
    <div className="space-y-8 p-5 pt-10">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#DB086E] to-[#3A05DF] bg-clip-text text-transparent">
          Soporte
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contacto Directo</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Asunto</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Describe tu problema"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
              <textarea 
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Detalla tu consulta o problema"
              />
            </div>
            <button className="bg-gradient-to-r from-[#DB086E] to-[#3A05DF] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity w-full">
              Enviar Mensaje
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de Contacto</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm">📧</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Email</p>
                <p className="text-sm text-gray-600">soporte@wanda.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm">📱</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">WhatsApp</p>
                <p className="text-sm text-gray-600">+51 999 999 999</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm">🕒</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Horario</p>
                <p className="text-sm text-gray-600">Lun-Vie: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Preguntas Frecuentes</h3>
        <div className="space-y-3">
          <details className="group">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
              <span>¿Cómo puedo cambiar mi contraseña?</span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <p className="text-gray-600 mt-3">Ve a Configuraciones &gt; Mi Cuenta y selecciona la opción para cambiar contraseña.</p>
          </details>
          <details className="group">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
              <span>¿Cómo reportar un problema técnico?</span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <p className="text-gray-600 mt-3">Utiliza el formulario de contacto en esta página o envía un email a soporte@wanda.com</p>
          </details>
        </div>
      </div>
    </div>
  )
}
