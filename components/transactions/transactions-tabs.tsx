"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Tab {
  id: string
  label: string
}

interface TransactionsTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TransactionsTabs({ tabs, activeTab, onTabChange }: TransactionsTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="flex w-full justify-start gap-2 mb-6 bg-transparent border-none shadow-none">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="flex items-center gap-0 text-base font-semibold text-gray-600 data-[state=active]:text-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:bg-clip-text data-[state=active]:from-[#DB086E] data-[state=active]:to-[#3A05DF] data-[state=active]:relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gradient-to-r data-[state=active]:after:from-[#DB086E] data-[state=active]:after:to-[#3A05DF] bg-transparent border-none shadow-none hover:bg-transparent data-[state=active]:shadow-none"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
