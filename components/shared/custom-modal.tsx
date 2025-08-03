"use client"

import type React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface CustomModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
  showHeader?: boolean
  customHeader?: React.ReactNode
  breadcrumbs?: string[]
}

export function CustomModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className,
  showHeader = true,
  customHeader,
  breadcrumbs
}: CustomModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`p-0 [&>button]:hidden w-[750px] max-w-[95vw] rounded-xl ${className || ''}`}
        style={className ? { 
          maxWidth: 'none', 
          width: '780px',
          height: className.includes('h-[') ? 'auto' : '100%'
        } : {}}
      >
        {/* Header personalizado o por defecto */}
        {showHeader && (
          <div className="p-6 border-b border-gray-200 bg-[#FEFEFE]">
            {customHeader ? (
              customHeader
            ) : (
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-black">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
            {breadcrumbs && (
              <p className="text-sm text-[#3A05DF]">
                {breadcrumbs.join(' > ')}
              </p>
            )}
          </div>
        )}
        
        {/* Contenido */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
