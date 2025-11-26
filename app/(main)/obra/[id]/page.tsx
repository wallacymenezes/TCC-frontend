"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Heart, Download, BookOpen, FileText, Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function ObraPage() {
  const { id } = useParams()
  const { token } = useAuth()
  const { toast } = useToast()
  
  const [work, setWork] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  const fetchWork = async () => {
    try {
      const res = await fetch(`${API_URL}/obras/${id}`, {
         headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      if (res.ok) {
        const data = await res.json()
        setWork(data)
        // Backend não envia se eu curti, teria que verificar na lista de curtidas do usuario,
        // mas para MVP podemos gerenciar localmente o estado visual ou buscar /me
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWork()
  }, [id, token])

  const handleLike = async () => {
    if (!token) {
      toast({ title: "Faça login para curtir", variant: "destructive" })
      return
    }
    try {
      await fetch(`${API_URL}/obras/${id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      })
      setLiked(!liked)
      // Atualiza contador localmente ou refetch
      fetchWork()
    } catch (error) {
      toast({ title: "Erro", variant: "destructive" })
    }
  }

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>
  if (!work) return <div className="text-center p-20">Obra não encontrada</div>

  return (
    <div className="container px-4 py-8">
      <Link href="/feed" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={16} /> Voltar
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-secondary border border-border flex items-center justify-center">
               {/* Backend não tem capa, usar placeholder ou ícone */}
               <BookOpen className="h-20 w-20 text-muted-foreground opacity-50" />
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-accent text-accent-foreground gap-2" size="lg" asChild>
                <a href={work.urlArquivo} target="_blank" rel="noopener noreferrer">
                    <Download size={18} /> Baixar Arquivo
                </a>
              </Button>

              <Button
                variant={liked ? "default" : "outline"}
                className={cn("w-full gap-2", liked && "bg-red-500 hover:bg-red-600 text-white")}
                onClick={handleLike}
              >
                <Heart size={18} className={liked ? "fill-current" : ""} />
                {work.quantidadeCurtidas} Curtidas
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <Badge className="bg-primary text-primary-foreground">{work.nomeCategoria}</Badge>
            <h1 className="font-heading text-3xl md:text-4xl font-bold">{work.titulo}</h1>
            <p className="text-xl text-muted-foreground">por {work.nomeAutor}</p>
          </div>

          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarImage src={work.fotoAutor} />
                  <AvatarFallback>{work.nomeAutor.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{work.nomeAutor}</p>
                  <p className="text-xs text-muted-foreground">Autor da publicação</p>
                </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
              <FileText size={20} className="text-accent" /> Descrição
            </h2>
            <p className="text-muted-foreground leading-relaxed">{work.descricao || "Sem descrição."}</p>
          </div>
          
          <Separator />
          
          {/* Aqui entraria a lista de avaliações mapeando work.avaliacoes */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-semibold">Avaliações</h2>
            {work.avaliacoes && work.avaliacoes.length > 0 ? (
                work.avaliacoes.map((av: any) => (
                    <Card key={av.id} className="bg-card border-border p-4">
                        <p className="text-sm">{av.comentario}</p>
                        <div className="flex gap-2 mt-2">
                             <Badge variant="secondary">Nota: {av.nota}</Badge>
                        </div>
                    </Card>
                ))
            ) : (
                <p className="text-muted-foreground">Seja o primeiro a avaliar.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}