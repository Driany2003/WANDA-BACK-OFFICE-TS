"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { useState } from "react"
import { NotificationToast } from "@/components/ui/notification-toast"

export function AutocuidadoForm() {
  const [selectedPeriod, setSelectedPeriod] = useState("diario")
  const [baseValue, setBaseValue] = useState("")
  const [showToast, setShowToast] = useState(false)

  const calculateValue = () => {
    const base = parseInt(baseValue) || 0
    switch (selectedPeriod) {
      case "diario":
        return base
      case "semanal":
        return base * 7
      case "mensual":
        return base * 30
      case "anual":
        return base * 365
      default:
        return base
    }
  }

  const handleSaveLimit = () => {
    setShowToast(true)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-[#333333] text-[20px] font-medium text-gray-900">Límite de WC</h2>
      <p className="text-[16px] font-medium text-[#777777]">
        Esta herramienta promueve el juego responsable y permite a cada suscriptor controlar el monto máximo de WC en un
        período determinado. Al configurar este límite, podrás disfrutar de una experiencia de juego más segura y
        gestionada, adaptada a tus preferencias personales.
      </p>

      <RadioGroup value={selectedPeriod} onValueChange={setSelectedPeriod} className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="diario" 
            id="diario" 
            className={selectedPeriod === "diario" ? "border-[#951B85] data-[state=checked]:bg-white data-[state=checked]:border-[#951B85]" : ""}
          />
          <Label 
            className={`text-[16px] font-medium transition-colors ${
              selectedPeriod === "diario" ? "text-[#951B85]" : "text-[#777777]"
            }`} 
            htmlFor="diario"
          >
            Diario
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="semanal" 
            id="semanal" 
            className={selectedPeriod === "semanal" ? "border-[#951B85] data-[state=checked]:bg-white data-[state=checked]:border-[#951B85]" : ""}
          />
          <Label 
            className={`text-[16px] font-medium transition-colors ${
              selectedPeriod === "semanal" ? "text-[#951B85]" : "text-[#777777]"
            }`} 
            htmlFor="semanal"
          >
            Semanal
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="mensual" 
            id="mensual" 
            className={selectedPeriod === "mensual" ? "border-[#951B85] data-[state=checked]:bg-white data-[state=checked]:border-[#951B85]" : ""}
          />
          <Label 
            className={`text-[16px] font-medium transition-colors ${
              selectedPeriod === "mensual" ? "text-[#951B85]" : "text-[#777777]"
            }`} 
            htmlFor="mensual"
          >
            Mensual
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="anual" 
            id="anual" 
            className={selectedPeriod === "anual" ? "border-[#951B85] data-[state=checked]:bg-white data-[state=checked]:border-[#951B85]" : ""}
          />
          <Label 
            className={`text-[16px] font-medium transition-colors ${
              selectedPeriod === "anual" ? "text-[#951B85]" : "text-[#777777]"
            }`} 
            htmlFor="anual"
          >
            Anual
          </Label>
        </div>
      </RadioGroup>

      <div className="w-40">
        <Input 
          type="text" 
          placeholder="WC 50" 
          value={baseValue ? `WC ${calculateValue()}` : ""}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '')
            setBaseValue(value)
          }}
        />
      </div>

      <GradientButton className="px-8 py-2" onClick={handleSaveLimit}>Guardar límite</GradientButton>

      <div className="flex items-center gap-2 text-red-500 text-sm">
        <AlertCircle className="w-4 h-4" />
        <span>Se enviará una alerta al momento de alcanzar el límite configurado</span>
      </div>

      <NotificationToast
        title="Límite guardado"
        message="Tu límite de WC ha sido configurado exitosamente."
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  )
}
