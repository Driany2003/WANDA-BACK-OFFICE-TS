import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redirigir directamente a transacciones (página principal)
  redirect('/transacciones')
}
