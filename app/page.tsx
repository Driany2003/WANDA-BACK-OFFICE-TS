import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redirigir directamente a concursos (página principal)
  redirect('/concursos')
}
