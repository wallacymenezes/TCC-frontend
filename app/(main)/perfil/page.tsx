"use client"

import { useState } from "react"
import Link from "next/link"
import { Settings, Edit2, BookOpen, Heart, Star, Calendar, MapPin, LinkIcon, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkCard, type Work } from "@/components/ui/work-card"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

// Mock data
const mockUserStats = {
  obras: 12,
  curtidas: 456,
  avaliacoes: 89,
  downloads: 3420,
}

const mockUserWorks: Work[] = [
  {
    id: "1",
    titulo: "Cálculo I - Resumo Completo",
    autor: "James Stewart",
    capa: "/calculus-book-cover.jpg",
    categoria: "Exatas",
    nota: 4.8,
    totalAvaliacoes: 56,
    curtidas: 123,
    downloads: 890,
    usuario: {
      id: "1",
      nome: "Hiver Demo",
      username: "hiverdemo",
      avatar: "/diverse-user-avatars.png",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    titulo: "Física Quântica para Iniciantes",
    autor: "Richard Feynman",
    capa: "/quantum-physics-book-cover.png",
    categoria: "Exatas",
    nota: 4.9,
    totalAvaliacoes: 78,
    curtidas: 234,
    downloads: 1200,
    usuario: {
      id: "1",
      nome: "Hiver Demo",
      username: "hiverdemo",
      avatar: "/diverse-user-avatars.png",
    },
    createdAt: new Date().toISOString(),
  },
]

export default function PerfilPage() {
  const { user } = useAuth()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="container px-4 py-8">
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-48 md:h-64 rounded-xl bg-gradient-to-r from-primary to-primary/60 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/hexagonal-pattern-purple.jpg')] opacity-20" />
        </div>

        {/* Profile Info */}
        <div className="relative -mt-16 md:-mt-20 px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            {/* Avatar */}
            <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background">
              <AvatarImage src={user?.fotoUrl || "/placeholder.svg"} />
              <AvatarFallback className="text-4xl bg-accent text-accent-foreground">
                {user?.nome?.charAt(0) || "H"}
              </AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="font-heading text-2xl md:text-3xl font-bold">{user?.nome || "Hiver"}</h1>
                  <p className="text-muted-foreground">@{user?.username || "username"}</p>
                </div>
                <div className="flex gap-2">
                  <Link href="/configuracoes">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Settings size={16} />
                      Configurações
                    </Button>
                  </Link>
                  <Button size="sm" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                    <Edit2 size={16} />
                    Editar Perfil
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Info */}
          <div className="mt-6 space-y-4">
            <p className="text-muted-foreground max-w-2xl">
              {user?.bio || "Apaixonado por compartilhar conhecimento 📚 | Estudante de Engenharia | Hiver desde 2024"}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>São Paulo, Brasil</span>
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon size={14} />
                <a href="#" className="text-accent hover:underline">
                  portfolio.dev
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>Membro desde Março 2024</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-8 p-4 bg-card rounded-xl border border-border">
            <div className="text-center">
              <p className="text-2xl font-heading font-bold text-accent">{mockUserStats.obras}</p>
              <p className="text-sm text-muted-foreground">Obras Hivadas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-heading font-bold">{mockUserStats.curtidas}</p>
              <p className="text-sm text-muted-foreground">Curtidas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-heading font-bold">{mockUserStats.avaliacoes}</p>
              <p className="text-sm text-muted-foreground">Avaliações</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-heading font-bold">{mockUserStats.downloads.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Downloads</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="obras" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="obras" className="gap-2">
                <BookOpen size={16} />
                Minhas Obras
              </TabsTrigger>
              <TabsTrigger value="curtidas" className="gap-2">
                <Heart size={16} />
                Curtidas
              </TabsTrigger>
              <TabsTrigger value="avaliacoes" className="gap-2">
                <Star size={16} />
                Avaliações
              </TabsTrigger>
            </TabsList>

            {/* View Toggle */}
            <div className="flex items-center gap-2 border border-border rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                className={cn("h-8 w-8 p-0", viewMode === "grid" && "bg-secondary")}
                onClick={() => setViewMode("grid")}
              >
                <Grid size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn("h-8 w-8 p-0", viewMode === "list" && "bg-secondary")}
                onClick={() => setViewMode("list")}
              >
                <List size={16} />
              </Button>
            </div>
          </div>

          <TabsContent value="obras">
            {mockUserWorks.length > 0 ? (
              <div
                className={cn(
                  "grid gap-6",
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1",
                )}
              >
                {mockUserWorks.map((work) => (
                  <WorkCard key={work.id} work={work} variant={viewMode === "list" ? "compact" : "default"} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">Nenhuma obra ainda</h3>
                <p className="text-muted-foreground mb-4">Comece a compartilhar conhecimento com a colmeia</p>
                <Link href="/hivar">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Hivar primeira obra</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="curtidas">
            <div className="text-center py-16">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-2">Nenhuma curtida ainda</h3>
              <p className="text-muted-foreground">Explore o feed e curta obras que você gostar</p>
            </div>
          </TabsContent>

          <TabsContent value="avaliacoes">
            <div className="text-center py-16">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-2">Nenhuma avaliação ainda</h3>
              <p className="text-muted-foreground">Avalie obras para ajudar outros Hivers</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
