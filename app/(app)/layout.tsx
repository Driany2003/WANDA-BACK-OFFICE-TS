import { SidebarProvider } from "@/components/layout/sidebar-provider"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </AuthGuard>
  )
}
