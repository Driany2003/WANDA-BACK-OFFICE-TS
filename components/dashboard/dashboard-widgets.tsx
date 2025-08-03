"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, TrendingDown, MoreVertical, Download } from "lucide-react"
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts"
import { Button } from "@/components/ui/button"
import { DashboardIcon, RecompensasIcon, PerdidasIcon } from "@/components/icons/dashboard-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { DashboardStats } from "@/types"

interface DashboardWidgetsProps {
  stats: DashboardStats
}

export function DashboardWidgets({ stats }: DashboardWidgetsProps) {
  const [selectedRecompensa, setSelectedRecompensa] = useState<string | null>(null)
  const [selectedPerdida, setSelectedPerdida] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8">
      {/* Concursos Widget */}
      <Card className="h-full w-[456px] rounded-2xl shadow-[0_4px_6px_-1px_rgba(137,2,119,0.15)] overflow-hidden">
        <div className="bg-[#FEFEFE] px-6 py-4 border-b border-gray-200">
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <DashboardIcon />
              Concursos
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Generar reporte
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="bg-[#FBFBFB] flex flex-col items-center justify-center gap-4 p-4">
          {/* Title */}
          <div className="text-lg font-medium text-[#333333] mb-6">Total</div>
          {/* Donut Chart */}
          <div className="flex items-center justify-center relative w-48 h-48 shrink-0 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Carritos', value: 75, color: '#6137E5' },
                    { name: 'Cartas', value: 25, color: '#C4B4F5' }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={90}
                >
                  {[
                    { name: 'Carritos', value: 75, color: '#6137E5' },
                    { name: 'Cartas', value: 25, color: '#C4B4F5' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full flex justify-center mb-4 ">
            <div className="flex flex-col items-center" style={{ gap: '23px' }}>
              <div className="flex items-center rounded-md bg-[#F2F2F2] w-[229px] h-[52px] px-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-2 ml-3">
                  <span className="text-[24px] text-[#777777] font-bold">100%</span>
                  <span className="text-base text-[#777777] font-medium">Concursos</span>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-[#FEFEFE] w-[229px] h-[52px] px-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08)] relative overflow-hidden">
                <div className="w-2 h-[52px] bg-gradient-to-b from-[#6137E5] to-[#6137E5] shadow-sm ml-0 absolute left-0 top-0 rounded-l-md"></div>
                <div className="flex items-center gap-5 ml-3">
                  <span className="text-[24px] text-[#777777] font-bold">{stats.concursos.carritos}%</span>
                  <span className="text-base text-[#777777] font-medium">Carritos</span>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-[#FEFEFE] w-[229px] h-[52px] px-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08)] relative overflow-hidden">
                <div className="w-2 h-[52px] bg-gradient-to-b from-[#C4B4F5] to-[#C4B4F5] shadow-sm ml-0 absolute left-0 top-0 rounded-l-md"></div>
                <div className="flex items-center gap-5 ml-3">
                  <span className="text-[24px] text-[#777777] font-bold">{stats.concursos.cartas}%</span>
                  <span className="text-base text-[#777777] font-medium">Cartas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Wrapper for Recompensas and Pérdidas */}
      <div className="grid grid-cols-1 gap-6">
        {/* Recompensas Widget */}
        <Card className="h-full w-[546px] rounded-2xl shadow-[0_4px_6px_-1px_rgba(137,2,119,0.15)] overflow-hidden">
          <div className="bg-[#FEFEFE] px-6 py-4 border-b border-gray-200">
            <div className="flex flex-row items-center justify-between">
                          <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <RecompensasIcon />
              Recompensas
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Generar reporte
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </div>
          <div className="bg-[#FBFBFB] p-6">

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={stats.recompensas}>
                  <XAxis
                    dataKey="day"
                    stroke="#777777"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    padding={{ left: 10, right: 10 }}
                    tick={(props) => {
                      const { x, y, payload } = props;
                      const isSelected = selectedRecompensa === payload.value;
                      return (
                        <g transform={`translate(${x},${y})`}>
                          <text
                            x={0}
                            y={0}
                            dy={16}
                            textAnchor="middle"
                            fill={isSelected ? "#DB086E" : "#777777"}
                            fontSize={12}
                            fontWeight="500"
                          >
                            {payload.value}
                          </text>
                        </g>
                      );
                    }}
                  />
                  <YAxis
                    stroke="#333333"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 40]}
                    ticks={[0, 10, 20, 30, 40]}
                    interval={0}
                    tickFormatter={(value) => `${value}`}
                    tick={(props) => {
                      const { x, y, payload } = props;
                      return (
                        <g transform={`translate(${x},${y})`}>
                          <text
                            x={0}
                            y={0}
                            dy={3}
                            textAnchor="end"
                            fill={payload.value === 40 ? "#DB086E" : "#333333"}
                            fontSize={12}
                            fontWeight="500"
                          >
                            {payload.value === 40 ? "WC" : payload.value}
                          </text>
                        </g>
                      );
                    }}
                  />
                  <Tooltip 
                    cursor={{ fill: "transparent" }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 relative">
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-l-4 border-l-gray-200 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                            <div className="text-sm font-medium text-gray-800">
                              {payload[0].value} WC
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[4, 4, 0, 0]}
                    onClick={(data) => {
                      if (data && data.payload) {
                        const day = data.payload.day
                        setSelectedRecompensa(selectedRecompensa === day ? null : day)
                      }
                    }}
                  >
                    {stats.recompensas.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={selectedRecompensa === entry.day ? "#B09BF2" : "#EBE6FC"}
                      />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Pérdidas Widget */}
        <Card className="h-full w-[546px] rounded-2xl shadow-[0_4px_6px_-1px_rgba(137,2,119,0.15)] overflow-hidden">
          <div className="bg-[#FEFEFE] px-6 py-4 border-b border-gray-200">
            <div className="flex flex-row items-center justify-between">
                          <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <PerdidasIcon />
              Pérdidas
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Generar reporte
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </div>
          <div className="bg-[#FBFBFB] p-6">

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={stats.perdidas}>
                  <XAxis
                    dataKey="day"
                    stroke="#777777"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    padding={{ left: 10, right: 10 }}
                    tick={(props) => {
                      const { x, y, payload } = props;
                      const isSelected = selectedPerdida === payload.value;
                      return (
                        <g transform={`translate(${x},${y})`}>
                          <text
                            x={0}
                            y={0}
                            dy={16}
                            textAnchor="middle"
                            fill={isSelected ? "#DB086E" : "#777777"}
                            fontSize={12}
                            fontWeight="500"
                          >
                            {payload.value}
                          </text>
                        </g>
                      );
                    }}
                  />
                  <YAxis
                    stroke="#333333"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 40]}
                    ticks={[0, 10, 20, 30, 40]}
                    interval={0}
                    tickFormatter={(value) => `${value}`}
                    tick={(props) => {
                      const { x, y, payload } = props;
                      return (
                        <g transform={`translate(${x},${y})`}>
                          <text
                            x={0}
                            y={0}
                            dy={3}
                            textAnchor="end"
                            fill={payload.value === 40 ? "#DB086E" : "#333333"}
                            fontSize={12}
                            fontWeight="500"
                          >
                            {payload.value === 40 ? "WC" : payload.value}
                          </text>
                        </g>
                      );
                    }}
                  />
                  <Tooltip 
                    cursor={{ fill: "transparent" }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 relative">
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-l-4 border-l-gray-200 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                            <div className="text-sm font-medium text-gray-800">
                              {payload[0].value} WC
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[4, 4, 0, 0]}
                    onClick={(data) => {
                      if (data && data.payload) {
                        const day = data.payload.day
                        setSelectedPerdida(selectedPerdida === day ? null : day)
                      }
                    }}
                  >
                    {stats.perdidas.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={selectedPerdida === entry.day ? "#B09BF2" : "#EBE6FC"}
                      />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
