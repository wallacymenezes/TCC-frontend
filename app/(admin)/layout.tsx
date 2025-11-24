"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, BookOpen, FolderOpen, Settings, BarChart3, LogOut, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HiveIcon } from "@/components/icons/hexagon-logo"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/usuarios", label: "Usuários", icon: Users },
  { href: "/admin/obras", label: "Obras", icon: BookOpen },
  { href: "/admin/categorias", label: "Categorias", icon: FolderOpen },
  { href: "/admin/estatisticas", label: "Estatísticas", icon: BarChart3 },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()

  // Mock admin check - in real app, check user.role === "ADMIN"
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/admin" className="flex items-center gap-2">
            <HiveIcon size={32} className="text-accent" />
            <div>
              <span className="font-heading font-semibold text-lg">HiveBooks</span>
              <span className="text-xs text-accent block">Admin</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {adminNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start gap-3", pathname === item.href && "bg-primary/10 text-accent")}
              >
                <item.icon size={18} />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Back to Site */}
        <div className="p-4 border-t border-border">
          <Link href="/feed">
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
              <ChevronLeft size={16} />
              Voltar ao site
            </Button>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.nome?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.nome || "Admin"}</p>
              <p className="text-xs text-muted-foreground truncate">Administrador</p>
            </div>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut size={16} />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
