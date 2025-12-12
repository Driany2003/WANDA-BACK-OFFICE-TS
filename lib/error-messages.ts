// Mapeo de errores personalizados para el sistema

export interface ErrorMapping {
  [key: string]: string
}

// Errores de validación del formulario
export const validationErrors: ErrorMapping = {
  correo_required: 'El correo electrónico es obligatorio',
  correo_invalid: 'Por favor, ingresa un correo electrónico válido',
  password_required: 'La contraseña es obligatoria',
  password_min: 'La contraseña debe tener al menos 6 caracteres',
}

// Errores de autenticación del backend
export const authErrors: ErrorMapping = {
  'Bad credentials': 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña',
  'Usuario no encontrado': 'No se encontró un usuario con este correo electrónico',
  'Contraseña incorrecta': 'La contraseña es incorrecta',
  'Usuario inactivo': 'Tu cuenta está inactiva. Por favor, contacta al administrador',
  'Usuario bloqueado': 'Tu cuenta ha sido bloqueada. Por favor, contacta al administrador',
  'Sesión expirada': 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente',
  'Error de conexión': 'Error de conexión con el servidor. Por favor, intenta nuevamente',
  'Error del servidor': 'Error en el servidor. Por favor, intenta más tarde',
  'Credenciales inválidas': 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña',
  'Invalid credentials': 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña',
  'Usuario o contraseña incorrectos': 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña',
  'Login fallido': 'Error al iniciar sesión. Por favor, intenta nuevamente',
  'Failed to authenticate': 'Error de autenticación. Por favor, verifica tus credenciales',
}

// Errores HTTP
export const httpErrors: ErrorMapping = {
  '400': 'Solicitud incorrecta. Por favor, verifica los datos ingresados',
  '401': 'No autorizado. Por favor, verifica tus credenciales',
  '403': 'Acceso denegado. No tienes permisos para realizar esta acción',
  '404': 'Recurso no encontrado',
  '500': 'Error interno del servidor. Por favor, intenta más tarde',
  '503': 'Servicio no disponible. Por favor, intenta más tarde',
}

// Función para obtener el mensaje de error personalizado
export const getErrorMessage = (error: any): string => {
  if (!error) {
    return 'Ha ocurrido un error. Por favor, intenta nuevamente'
  }

  // Si es un string, buscar en los mapeos
  if (typeof error === 'string') {
    // Buscar coincidencias parciales (case insensitive)
    const errorLower = error.toLowerCase()
    
    // Buscar en errores de autenticación
    for (const [key, value] of Object.entries(authErrors)) {
      if (errorLower.includes(key.toLowerCase()) || error === key) {
        return value
      }
    }
    
    // Buscar en errores HTTP
    if (httpErrors[error]) {
      return httpErrors[error]
    }
    
    // Verificar si contiene códigos HTTP
    const httpCodeMatch = error.match(/\b(400|401|403|404|500|503)\b/)
    if (httpCodeMatch && httpErrors[httpCodeMatch[1]]) {
      return httpErrors[httpCodeMatch[1]]
    }
    
    return error
  }

  // Si es un objeto Error
  if (error instanceof Error) {
    const message = error.message || error.toString()
    const messageLower = message.toLowerCase()
    
    // Buscar en errores de autenticación (coincidencias parciales)
    for (const [key, value] of Object.entries(authErrors)) {
      if (messageLower.includes(key.toLowerCase()) || message === key) {
        return value
      }
    }
    
    // Buscar por código HTTP
    if (message.includes('401') || messageLower.includes('unauthorized')) {
      return authErrors['Bad credentials'] || httpErrors['401']
    }
    
    if (message.includes('403') || messageLower.includes('forbidden')) {
      return httpErrors['403']
    }
    
    if (message.includes('404') || messageLower.includes('not found')) {
      return httpErrors['404']
    }
    
    if (message.includes('500') || messageLower.includes('internal server error')) {
      return httpErrors['500']
    }
    
    if (message.includes('503') || messageLower.includes('service unavailable')) {
      return httpErrors['503']
    }
    
    // Errores de red
    if (messageLower.includes('network') || messageLower.includes('fetch') || messageLower.includes('failed to fetch')) {
      return authErrors['Error de conexión']
    }
    
    // Si el mensaje contiene "Bad credentials" o similar
    if (messageLower.includes('bad credentials') || 
        messageLower.includes('credenciales') ||
        messageLower.includes('invalid credentials')) {
      return authErrors['Bad credentials']
    }
    
    // Retornar el mensaje original si no se encuentra en el mapeo
    return message || 'Ha ocurrido un error. Por favor, intenta nuevamente'
  }

  // Si tiene una propiedad message
  if (error.message) {
    return getErrorMessage(error.message)
  }

  // Si es un objeto con propiedades de error
  if (typeof error === 'object') {
    // Buscar en propiedades comunes
    if (error.error) return getErrorMessage(error.error)
    if (error.msg) return getErrorMessage(error.msg)
    if (error.mensaje) return getErrorMessage(error.mensaje)
  }

  // Mensaje por defecto
  return 'Ha ocurrido un error. Por favor, intenta nuevamente'
}

// Función para validar correo electrónico
export const validateEmail = (email: string): string | null => {
  if (!email || email.trim() === '') {
    return validationErrors.correo_required
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return validationErrors.correo_invalid
  }
  
  return null
}

// Función para validar contraseña
export const validatePassword = (password: string): string | null => {
  if (!password || password.trim() === '') {
    return validationErrors.password_required
  }
  
  if (password.length < 6) {
    return validationErrors.password_min
  }
  
  return null
}

