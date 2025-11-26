"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Search, Bell, Menu, X, Home, Upload, User, Settings, LogOut, BookOpen, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiveIcon } from "@/components/icons/hexagon-logo"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/feed", label: "Feed", icon: Home },
  { href: "/explorar", label: "Explorar", icon: Layers },
  { href: "/hivar", label: "Hivar", icon: Upload },
]

export function Header() {
  const pathname = usePathname()
  const { user, logout, isAuthenticated } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={isAuthenticated ? "/feed" : "/"} className="flex items-center gap-2">
          <HiveIcon size={32} className="text-accent" />
          <span className="font-heading text-xl font-semibold text-foreground hidden sm:inline">HiveBooks</span>
        </Link>

        {/* Desktop Navigation */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn("gap-2", pathname === item.href && "bg-primary/10 text-accent")}
                >
                  <item.icon size={18} />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        )}

        {/* Search Bar - Desktop */}
        {isAuthenticated && (
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar obras, autores..." className="pl-10 bg-secondary border-border" />
            </div>
          </div>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              {/* Mobile Search Toggle */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSearchOpen(!searchOpen)}>
                <Search size={20} />
              </Button>

              {/* Notifications */}
              {/*<Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-[10px] font-medium text-accent-foreground flex items-center justify-center">
                  3
                </span>
              </Button>*/}

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9 border-2 border-primary">
                      <AvatarImage src={user?.fotoUrl || "/placeholder.svg"} alt={user?.nome} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.nome?.charAt(0) || "H"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.fotoUrl || "/placeholder.svg"} />
                      <AvatarFallback>{user?.nome?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.nome}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/perfil" className="flex items-center gap-2 cursor-pointer">
                      <User size={16} />
                      Meu Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/configuracoes" className="flex items-center gap-2 cursor-pointer">
                      <Settings size={16} />
                      Configurações
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive cursor-pointer" onClick={logout}>
                    <LogOut size={16} className="mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link href="/cadastro">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Cadastrar</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && isAuthenticated && (
        <div className="md:hidden border-t border-border p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar obras, autores..." className="pl-10 bg-secondary" autoFocus />
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {mobileMenuOpen && isAuthenticated && (
        <nav className="md:hidden border-t border-border p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-2", pathname === item.href && "bg-primary/10 text-accent")}
              >
                <item.icon size={18} />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
