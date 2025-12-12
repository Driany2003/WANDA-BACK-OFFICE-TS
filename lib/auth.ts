// Auth utilities for token management

const TOKEN_KEY = 'auth_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'user_data'

export interface LoginResponse {
  success: boolean
  message: string
  tipoUsuario: 'SISTEMA' | 'SUSCRIPTOR'
  token: string
  refreshToken: string
  authority?: any
  usuario?: any
  suscriptor?: any
}

// Guardar tokens en localStorage
export const saveTokens = (token: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  }
}

// Obtener token
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY)
  }
  return null
}

// Obtener refresh token
export const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  }
  return null
}

// Guardar datos del usuario
export const saveUserData = (userData: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
  }
}

// Obtener datos del usuario
export const getUserData = (): any | null => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem(USER_KEY)
    return userData ? JSON.parse(userData) : null
  }
  return null
}

// Limpiar tokens y datos del usuario
export const clearAuth = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }
}

// Verificar si el usuario está autenticado
export const isAuthenticated = (): boolean => {
  return getToken() !== null
}

// Obtener headers con token para las peticiones
export const getAuthHeaders = (includeContentType: boolean = true): HeadersInit => {
  const token = getToken()
  const headers: HeadersInit = {
    'Accept': 'application/json',
  }
  
  // Solo agregar Content-Type si no es FormData
  if (includeContentType) {
    headers['Content-Type'] = 'application/json'
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  return headers
}

