"use client"

import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { BarChart3 } from "lucide-react"
import { DashboardWidgets } from "@/components/dashboard/dashboard-widgets"
import { DASHBOARD_STATS } from "@/lib/constants"
import { DateRangeSelect } from "@/components/shared/date-range-select"

export default function DashboardPage() {
  const handleDateRangeChange = (value: string) => {
    console.log("Selected date range for Dashboard:", value)
    // Implement filtering logic here based on the selected value
  }

  return (
    <div className="space-y-6 p-[50px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-600">Rango de fecha</span>
            <DateRangeSelect onSelectChange={handleDateRangeChange} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-600">&nbsp;</span>
            <GradientButton>Generar reporte</GradientButton>
          </div>
        </div>
      </div>

      {/* Dashboard Widgets */}
      <DashboardWidgets stats={DASHBOARD_STATS} />
    </div>
  )
}
