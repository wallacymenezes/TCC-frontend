"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Heart, Download, Share2, BookOpen, Calendar, FileText, MessageCircle, Flag, ArrowLeft, Loader2, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Rating } from "@/components/ui/rating"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function ObraPage() {
  const params = useParams()
  const { token, user } = useAuth()
  const { toast } = useToast()
  
  const [work, setWork] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userRating, setUserRating] = useState(0)
  const [comment, setComment] = useState("")
  const [submittingReview, setSubmittingReview] = useState(false)

  const fetchWork = useCallback(async () => {
    try {
      const headers: any = {}
      if (token) headers['Authorization'] = `Bearer ${token}`

      const res = await fetch(`${API_URL}/obras/${params.id}`, { headers })
      if (!res.ok) throw new Error("Falha ao carregar obra")
      
      const data = await res.json()
      setWork(data)
    } catch (error) {
      console.error(error)
      toast({ title: "Erro", description: "Não foi possível carregar a obra.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }, [params.id, token, toast])

  useEffect(() => {
    fetchWork()
  }, [fetchWork])

  const handleLike = async () => {
    if (!token) return toast({ title: "Login necessário", description: "Entre para curtir.", variant: "destructive" })

    // Otimização visual (Optimistic Update)
    const previousWork = { ...work }
    const isCurrentlyLiked = work.idsUsuariosQueCurtiram?.includes(user?.id)
    
    setWork((prev: any) => {
      const newIds = isCurrentlyLiked 
        ? prev.idsUsuariosQueCurtiram.filter((id: number) => id !== user?.id)
        : [...(prev.idsUsuariosQueCurtiram || []), user?.id]
      
      return {
        ...prev,
        idsUsuariosQueCurtiram: newIds,
        quantidadeCurtidas: isCurrentlyLiked ? prev.quantidadeCurtidas - 1 : prev.quantidadeCurtidas + 1
      }
    })

    try {
      const res = await fetch(`${API_URL}/obras/${params.id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) {
        // Reverte se der erro
        setWork(previousWork)
        throw new Error("Erro ao curtir")
      }
    } catch (error) {
      console.error("Erro ao curtir", error)
    }
  }

  const handleSubmitReview = async () => {
    if (!token) return toast({ title: "Login necessário", variant: "destructive" })
    if (userRating === 0) return toast({ title: "Selecione uma nota", variant: "destructive" })

    setSubmittingReview(true)
    try {
      const res = await fetch(`${API_URL}/avaliacoes/obra/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nota: userRating,
          comentario: comment
        })
      })

      if (res.ok) {
        toast({ title: "Avaliação enviada!" })
        setComment("")
        setUserRating(0)
        fetchWork()
      } else {
        const error = await res.json()
        toast({ title: "Erro", description: error.message || "Falha ao avaliar", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Erro", description: "Tente novamente.", variant: "destructive" })
    } finally {
      setSubmittingReview(false)
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit", month: "long", year: "numeric"
    })
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-accent" /></div>
  if (!work) return <div className="text-center py-20">Obra não encontrada.</div>

  // LÓGICA CORRIGIDA: Verifica se o ID do usuário está na lista
  const isLiked = user && work.idsUsuariosQueCurtiram?.includes(Number(user.id));

  return (
    <div className="container px-4 py-8">
      <Link href="/feed" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={16} /> Voltar ao feed
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Coluna Esquerda - Capa e Ações */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="relative aspect-3/4 rounded-xl overflow-hidden bg-secondary border border-border flex items-center justify-center">
                {work.capa ? (
                    <Image src={work.capa} alt={work.titulo} fill className="object-cover" />
                ) : (
                    <BookOpen className="h-20 w-20 text-muted-foreground/50" />
                )}
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2" size="lg" asChild>
                <a href={work.urlArquivo} target="_blank" rel="noopener noreferrer">
                  <Download size={18} /> Baixar Arquivo
                </a>
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                    variant={isLiked ? "default" : "outline"} 
                    className={cn(
                        "gap-2 transition-colors",
                        // APLICAÇÃO DA COR AMARELA
                        isLiked ? "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500" : "hover:text-yellow-500 hover:border-yellow-500"
                    )} 
                    onClick={handleLike}
                >
                  <Heart size={18} className={cn(isLiked && "fill-white")} />
                  {work.quantidadeCurtidas || 0}
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Share2 size={18} /> Compartilhar
                </Button>
              </div>
            </div>

            <Card className="bg-card border-border">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Publicado em</span>
                    <span className="font-medium">{formatDate(work.dataPublicacao)}</span>
                </div>
                {work.dataAtualizacao && (
                    <>
                    <Separator />
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Atualizado em</span>
                        <span className="font-medium">{formatDate(work.dataAtualizacao)}</span>
                    </div>
                    </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Coluna Direita - Conteúdo */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-primary text-primary-foreground">{work.nomeCategoria}</Badge>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-balance">{work.titulo}</h1>
            <p className="text-xl text-muted-foreground">por {work.nomeAutor}</p>

            <div className="flex items-center gap-4">
              <Rating value={work.mediaAvaliacoes || 0} size="lg" showValue />
              <span className="text-muted-foreground">({work.avaliacoes?.length || 0} avaliações)</span>
            </div>
          </div>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarImage src={work.fotoAutor} />
                  <AvatarFallback>{work.nomeAutor?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{work.nomeAutor}</p>
                  <p className="text-sm text-muted-foreground">Autor da publicação</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
              <FileText size={20} className="text-accent" /> Descrição
            </h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {work.descricao || "Sem descrição fornecida."}
            </p>
          </div>

          <Separator />

          <div className="space-y-6">
            <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
              <MessageCircle size={20} className="text-accent" /> Avaliações
            </h2>

            <Card className="bg-card border-border">
              <CardHeader><h3 className="font-semibold">Deixe sua avaliação</h3></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Sua nota:</span>
                  <Rating value={userRating} interactive onChange={setUserRating} size="lg" />
                </div>
                <Textarea
                  placeholder="Escreva seu comentário..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-secondary min-h-[100px]"
                />
                <Button 
                    onClick={handleSubmitReview} 
                    disabled={submittingReview || userRating === 0} 
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {submittingReview ? <Loader2 className="animate-spin mr-2"/> : "Publicar avaliação"}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {work.avaliacoes?.map((av: any) => (
                <Card key={av.id} className="bg-card border-border">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={av.autor?.fotoUrl} />
                          <AvatarFallback>{av.autor?.nome?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{av.autor?.nome}</p>
                          <div className="flex items-center gap-2">
                            <Rating value={av.nota} size="sm" />
                            <span className="text-xs text-muted-foreground">{formatDate(av.dataAvaliacao)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{av.comentario}</p>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="gap-2 h-8">
                            <ThumbsUp size={14} /> {av.quantidadeCurtidas || 0}
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {(!work.avaliacoes || work.avaliacoes.length === 0) && (
                <p className="text-center text-muted-foreground py-4">Nenhuma avaliação ainda.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}