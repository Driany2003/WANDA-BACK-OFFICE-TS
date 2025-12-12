import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redirigir al login por defecto, el AuthGuard manejará la redirección si está autenticado
  redirect('/login')
}
