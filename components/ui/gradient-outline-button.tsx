import React from 'react'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface GradientOutlineButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  width?: string
  height?: string
  disabled?: boolean
}

export function GradientOutlineButton({
  children,
  onClick,
  className,
  width = '138px',
  height = '40px',
  disabled = false
}: GradientOutlineButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "bg-white border-2 border-transparent rounded-lg hover:bg-white transition-all duration-300",
        className
      )}
      style={{
        background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, #DB086E, #3A05DF) border-box',
        border: '2px solid transparent',
        width,
        height
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="bg-gradient-to-r from-[#DB086E] to-[#3A05DF] bg-clip-text text-transparent font-medium">
        {children}
      </span>
    </Button>
  )
} 