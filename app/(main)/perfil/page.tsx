"use client"

import { useState } from "react"
import Link from "next/link"
import { Settings, BookOpen, Heart, Grid, List, Loader2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkCard } from "@/components/ui/work-card"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

export default function PerfilPage() {
  const { user, isLoading: authLoading } = useAuth()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  
  if (authLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>
  if (!user) return <div className="text-center py-20">Faça login para ver seu perfil.</div>

  // Helper para converter o objeto de obra do backend para o formato do WorkCard
  const mapWorkToCard = (obra: any) => ({
    id: String(obra.id),
    titulo: obra.titulo,
    autor: user.nome, // Minhas obras = eu sou o autor
    capa: "/placeholder.jpg", // Backend não tem campo de capa explícito ainda
    categoria: obra.nomeCategoria || "Geral",
    nota: obra.mediaAvaliacoes || 0,
    totalAvaliacoes: 0,
    curtidas: obra.quantidadeCurtidas || 0,
    downloads: 0,
    usuario: {
        id: String(user.id),
        nome: user.nome,
        username: user.email,
        avatar: user.fotoUrl
    },
    createdAt: obra.dataPublicacao
  })

  return (
    <div className="container px-4 py-8">
      {/* Cabeçalho do Perfil */}
      <div className="relative mb-12">
        {/* Capa */}
        <div className="h-48 md:h-64 rounded-xl bg-gradient-to-r from-primary to-primary/60 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/hexagonal-pattern-purple.jpg')] opacity-20" />
        </div>

        {/* Informações */}
        <div className="relative -mt-16 md:-mt-20 px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background">
              <AvatarImage src={user.fotoUrl || "/placeholder-user.jpg"} className="object-cover" />
              <AvatarFallback className="text-4xl bg-accent text-accent-foreground">
                {user.nome.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="font-heading text-2xl md:text-3xl font-bold">{user.nome}</h1>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                <Link href="/configuracoes">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Settings size={16} /> Configurações
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <p className="text-muted-foreground max-w-2xl">{user.descricao || "Sem biografia."}</p>
            <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1"><Calendar size={14}/> Membro da colmeia</div>
            </div>
          </div>

          {/* Estatísticas (Baseadas no que vem do /me) */}
          <div className="grid grid-cols-3 gap-4 mt-8 p-4 bg-card rounded-xl border border-border">
             <div className="text-center">
                <p className="text-2xl font-bold text-accent">{user.obrasPublicadas?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Obras</p>
             </div>
             <div className="text-center">
                <p className="text-2xl font-bold">{user.obrasCurtidas?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Curtidas</p>
             </div>
             <div className="text-center">
                <p className="text-2xl font-bold">{user.avaliacoesFeitas?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Avaliações</p>
             </div>
          </div>
        </div>
      </div>

      {/* Abas */}
      <Tabs defaultValue="obras" className="w-full">
        <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-secondary">
                <TabsTrigger value="obras" className="gap-2"><BookOpen size={16}/> Minhas Obras</TabsTrigger>
                <TabsTrigger value="curtidas" className="gap-2"><Heart size={16}/> Curtidas</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 border border-border rounded-lg p-1">
              <Button variant="ghost" size="sm" onClick={() => setViewMode("grid")} className={cn(viewMode==="grid" && "bg-secondary")}>
                <Grid size={16} />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setViewMode("list")} className={cn(viewMode==="list" && "bg-secondary")}>
                <List size={16} />
              </Button>
            </div>
        </div>

        <TabsContent value="obras">
            {user.obrasPublicadas?.length ? (
                <div className={cn("grid gap-6", viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1")}>
                    {user.obrasPublicadas.map((obra: any) => (
                        <WorkCard key={obra.id} work={mapWorkToCard(obra)} variant={viewMode === "list" ? "compact" : "default"} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-muted-foreground">Nenhuma obra publicada ainda.</div>
            )}
        </TabsContent>

        <TabsContent value="curtidas">
            {user.obrasCurtidas?.length ? (
                <div className={cn("grid gap-6", viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1")}>
                    {user.obrasCurtidas.map((obra: any) => (
                        <WorkCard key={obra.id} work={mapWorkToCard(obra)} variant={viewMode === "list" ? "compact" : "default"} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-muted-foreground">Nenhuma obra curtida ainda.</div>
            )}
        </TabsContent>
      </Tabs>
    </div>
  )
}