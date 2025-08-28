"use client"

import { useState, useEffect } from "react"
import { X, Upload } from "lucide-react"
import { AlertIcon } from "@/components/icons/configuraciones-icons"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientOutlineButton } from "@/components/ui/gradient-outline-button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Concurso {
  id: string
  nombre: string
  fechaTransmision: string
  anfitrion: string
  wcNecesarias: number
  estado: string
}

interface EditarConcursoModalProps {
  isOpen: boolean
  onClose: () => void
  concurso: Concurso
  onSave: (data: any) => void
}

export function EditarConcursoModal({ isOpen, onClose, concurso, onSave }: EditarConcursoModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    fecha: new Date(),
    nombreAnfitrion: "",
    wcNecesarias: 0,
    imagen: null as File | null,
    imagenes: [] as File[],
    estado: false
  })

  useEffect(() => {
    if (concurso) {
      console.log('Concurso recibido:', concurso)
      console.log('Fecha original:', concurso.fechaTransmision)
      
      // Convertir el formato de fecha DD/MM/YYYY a un objeto Date válido
      let fecha = new Date()
      try {
        const [day, month, year] = concurso.fechaTransmision.split('/')
        console.log('Partes de fecha:', { day, month, year })
        
        fecha = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
        console.log('Fecha convertida:', fecha)
        
        // Verificar que la fecha sea válida
        if (isNaN(fecha.getTime())) {
          console.warn('Fecha inválida, usando fecha actual')
          fecha = new Date()
        }
      } catch (error) {
        console.warn('Error al parsear fecha:', error)
        fecha = new Date()
      }
      
      setFormData({
        nombre: concurso.nombre,
        fecha: fecha,
        nombreAnfitrion: concurso.anfitrion,
        wcNecesarias: concurso.wcNecesarias,
        imagen: null,
        imagenes: [],
        estado: concurso.estado === "Activo"
      })
    }
  }, [concurso])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ 
      ...formData, 
      id: concurso.id,
      fechaTransmision: formData.fecha.toISOString(),
      anfitrion: formData.nombreAnfitrion,
      estado: formData.estado ? "Activo" : "Inactivo"
    })
    onClose()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ 
        ...prev, 
        imagen: file,
        imagenes: [...prev.imagenes, file]
      }))
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index)
    }))
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#FBFBFB] rounded-xl w-[570px] h-[720px] mx-4 flex flex-col overflow-hidden">
          {/* Header */}
          <div 
            className="flex justify-between items-start px-[30px] pt-[30px] pb-6 flex-shrink-0 bg-[#FEFEFE]"
            style={{ 
              boxShadow: '0 4px 10px rgba(219, 8, 110, 0.08)'
            }}
          >
            <div className="flex-1">
              <h2 className="text-[24px] font-medium text-[#1C1C1C] mb-2">Editar concurso</h2>
              <div className="text-[12px] text-gray-600 mt-4">
                <span className="text-[#9C82EF]">Administración</span> &gt;{" "}
                <span className="text-[#9C82EF]">Concursos</span> &gt;{" "}
                <span 
                  className="text-[#3A05DF] font-medium px-1 py-1 rounded">
                  Editar concurso
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-[20px] mt-0">
            <div 
              className="flex-1 rounded-lg p-6 mb-6 overflow-y-auto">
              <div className="rounded-lg p-1">
                <h3 className="text-[16px] font-medium text-[#1C1C1C] mb-6 text-start">
                  Datos del concurso
                </h3>
                
                <div className="space-y-6 mt-4">
                  {/* Nombre del concurso y Fecha - En la misma fila */}
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Nombre del concurso
                      </label>
                      <Input
                        type="text"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                        className="w-[230px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                        style={{ boxShadow: '0 4px 20px rgba(219,8,110,0.08)' }}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Fecha
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className={cn(
                              "w-[230px] h-[40px] flex items-center justify-between px-3 text-sm justify-between text-left font-normal",
                              !formData.fecha && "text-gray-500"
                            )}
                            style={{ boxShadow: '0 4px 20px rgba(219,8,110,0.08)' }}
                          >
                            {formData.fecha ? (
                              format(formData.fecha, "dd/MM/yyyy", { locale: es })
                            ) : (
                              <span>Seleccionar fecha</span>
                            )}
                            <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={formData.fecha}
                            onSelect={(date) => date && setFormData(prev => ({ ...prev, fecha: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Nombre anfitrión y WC necesarias - En la misma fila */}
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        Nombre anfitrión(a)
                      </label>
                      <Input
                        type="text"
                        placeholder="Nombre anfitrión(a)"
                        value={formData.nombreAnfitrion}
                        onChange={(e) => setFormData(prev => ({ ...prev, nombreAnfitrion: e.target.value }))}
                        className="w-[230px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                        style={{ boxShadow: '0 4px 20px rgba(219,8,110,0.08)' }}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[12px] font-medium text-[#777777] mb-2">
                        WC necesarias por opción
                      </label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.wcNecesarias}
                        onChange={(e) => setFormData(prev => ({ ...prev, wcNecesarias: parseInt(e.target.value) || 0 }))}
                        className="w-[230px] h-[40px] placeholder:text-[#BBBBBB] placeholder:font-semibold placeholder:text-sm"
                        style={{ boxShadow: '0 4px 20px rgba(219,8,110,0.08)' }}
                        required
                      />
                    </div>
                  </div>

                  {/* Imagen */}
                  <div>
                    <label className="block text-[12px] font-medium text-[#777777] mb-2">Imagen</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="file-input-concurso-editar"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('file-input-concurso-editar')?.click()}
                        className="w-full h-[40px] bg-white border border-gray-300 rounded-md text-left px-3 text-[#BBBBBB] font-semibold text-sm hover:border-gray-400 transition-colors cursor-pointer flex items-center justify-between"
                        style={{ boxShadow: '0 4px 20px rgba(219, 8, 110, 0.08)' }}
                      >
                        <span className="text-[14px] font-semibold">Selecciona una imagen</span>
                        <Upload className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    {/* Tags de imágenes seleccionadas */}
                    {formData.imagenes && formData.imagenes.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.imagenes.map((imagen, index) => (
                          <div
                            key={index}
                            className="bg-[#6137E5] text-white flex items-center gap-2"
                            style={{ 
                              width: '84px', 
                              height: '24px', 
                              borderRadius: '12px',
                              padding: '0 8px'
                            }}
                          >
                            <span className="text-[14px] font-medium truncate">Img.{String(index + 1).padStart(2, '0')}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="text-white hover:text-gray-200 transition-colors text-[16px]"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Texto de validación */}
                    <div className="flex items-center gap-2 mt-2 text-orange-600 text-xs">
                      <AlertIcon />
                      <span>Puedes cargar un máximo de cuatro (4) imágenes / JPG, PNG / Máx 40 MB</span>
                    </div>
                  </div>

                  {/* Estado - Debajo de la imagen */}
                  <div className="flex items-center justify-between h-[40px]">
                    <label className="text-[12px] font-medium text-[#777777]">
                      Estado
                    </label>
                    <div className="flex items-center">
                      <Switch
                        checked={formData.estado}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, estado: checked }))}
                        className="data-[state=checked]:bg-[#A13592]"
                      />
                      <span className="text-[14px] text-[#1C1C1C] ml-3">
                        {formData.estado ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-[10px] px-[20px] pb-6 justify-center">
              <GradientOutlineButton
                onClick={onClose}
                className="w-[138px] h-[40px] text-red-500 border-red-500 hover:bg-red-50"
              >
                Cancelar
              </GradientOutlineButton>
              <GradientButton
                type="submit"
                className="w-[138px] h-[40px]"
              >
                Guardar
              </GradientButton>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
