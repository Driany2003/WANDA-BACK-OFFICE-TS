"use client"

import React, { useState, useRef } from 'react'
import { Upload, X, AlertCircle, Eye } from 'lucide-react'

interface ConcursoImageUploadProps {
  onImageChange: (file: File | null, previewUrl?: string) => void
  className?: string
  disabled?: boolean
  existingImageUrl?: string // Para mostrar imagen existente
  onPreviewOpen?: () => void // Callback para cerrar modal padre
  onPreviewClose?: () => void // Callback para abrir modal padre
}

export const ConcursoImageUpload: React.FC<ConcursoImageUploadProps> = ({
  onImageChange,
  className = "",
  disabled = false,
  existingImageUrl,
  onPreviewOpen,
  onPreviewClose
}) => {
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(existingImageUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Configuración específica para concursos
  const maxSize = 5 // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']

  const validateFile = (file: File): string | null => {
    // Validar tipo de archivo
    if (!allowedTypes.includes(file.type)) {
      return `Solo se permiten imágenes (JPG, PNG, GIF, WEBP)`
    }

    // Validar tamaño
    const maxSizeBytes = maxSize * 1024 * 1024
    if (file.size > maxSizeBytes) {
      return `La imagen no puede ser mayor a ${maxSize}MB`
    }

    return null
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    setError(null)

    // Validación básica en frontend
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    // Crear preview
    const reader = new FileReader()
    reader.onload = (e) => {
      const url = e.target?.result as string
      setPreviewUrl(url)
    }
    reader.readAsDataURL(file)

    // Notificar al componente padre
    onImageChange(file, previewUrl || undefined)
  }

  const handleRemoveFile = () => {
    setPreviewUrl(null)
    setError(null)
    onImageChange(null, undefined) // Notificar que se eliminó la imagen
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Input oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept={allowedTypes.join(',')}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
        disabled={disabled}
      />

      {/* Botón de upload */}
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`w-full h-[40px] bg-white border border-gray-300 rounded-md text-left px-3 text-[#BBBBBB] font-semibold text-sm transition-colors flex items-center justify-between ${
          disabled
            ? 'cursor-not-allowed opacity-50' 
            : 'hover:border-gray-400 cursor-pointer'
        }`}
        style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
      >
        <span className="text-[14px] font-semibold">
          {previewUrl ? 'Imagen del concurso seleccionada' : 'Seleccionar imagen del concurso'}
        </span>
        <Upload className="w-4 h-4 text-gray-400" />
      </button>

      {/* Tags de imágenes seleccionadas */}
      {previewUrl && (
        <div className="flex flex-wrap gap-2 mt-2">
          <div
            className="bg-[#6137E5] text-white flex items-center gap-2 cursor-pointer hover:bg-[#5a2fd4] transition-colors"
            style={{ 
              width: '84px', 
              height: '24px', 
              borderRadius: '12px',
              padding: '0 8px'
            }}
            onClick={() => {
              onPreviewOpen?.() // Mostrar preview en modal padre
            }}
          >
            <Eye className="w-3 h-3" />
            <span className="text-[12px] font-medium truncate">Ver</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleRemoveFile()
              }}
              className="text-white hover:text-gray-200 transition-colors text-[16px] ml-1"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Información de ayuda */}
      <div className="flex items-center gap-2 mt-2">
        <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
        <span className="text-orange-600 text-xs font-medium whitespace-nowrap">
          Formatos permitidos: JPG, PNG, GIF, WEBP • Máximo {maxSize}MB
        </span>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 mt-2">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-red-500 text-xs">{error}</p>
        </div>
      )}

    </div>
  )
}
