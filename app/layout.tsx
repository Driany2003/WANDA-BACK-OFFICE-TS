import type React from "react"
import type { Metadata } from "next"
import { Lato } from "next/font/google"
import { AuthProvider } from "@/hooks/useAuth"
import { AuthLayout } from "@/components/layout/auth-layout"
import "./globals.css"

const lato = Lato({ 
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"]
})

export const metadata: Metadata = {
  title: "Wanda - Concursos y Animalitos",
  description: "Plataforma de concursos y juegos online con increíbles promociones",
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={lato.className}>
        <AuthProvider>
          <AuthLayout>
            {children}
          </AuthLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
