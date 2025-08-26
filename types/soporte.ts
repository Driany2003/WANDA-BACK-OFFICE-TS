export interface Pregunta {
  id: string
  pregunta: string
  respuesta: string
  fecha: string
}

export interface Notificacion {
  id: string
  mensaje: string
  tiempo: string
  tipo?: string
}

export interface PaginaEstatica {
  id: string
  nombre: string
  descripcion: string
  link: string
  fecha: string
}

export interface Normativa {
  id: string
  nombre: string
  descripcion: string
  fecha: string
}
