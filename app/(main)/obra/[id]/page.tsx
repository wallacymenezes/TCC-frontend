"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Heart,
  Download,
  Share2,
  BookOpen,
  Calendar,
  Tag,
  FileText,
  ThumbsUp,
  MessageCircle,
  Flag,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Rating } from "@/components/ui/rating"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock data for a single work
const mockWork = {
  id: "1",
  titulo: "Cálculo I - Fundamentos e Aplicações Completas",
  autor: "James Stewart",
  descricao:
    "Este livro oferece uma abordagem completa do Cálculo Diferencial e Integral, cobrindo todos os tópicos fundamentais necessários para estudantes de engenharia, física, matemática e áreas correlatas. Com exemplos práticos e exercícios resolvidos, este material é ideal para quem busca dominar os conceitos de limites, derivadas e integrais.",
  capa: "/calculus-mathematics-textbook-cover-detailed.jpg",
  categoria: "Exatas",
  subcategoria: "Matemática",
  nota: 4.8,
  totalAvaliacoes: 156,
  curtidas: 234,
  downloads: 1420,
  formato: "PDF",
  tamanho: "45 MB",
  paginas: 892,
  idioma: "Português",
  isbn: "978-85-7665-123-4",
  anoPublicacao: 2020,
  usuario: {
    id: "1",
    nome: "Maria Silva",
    username: "mariasilva",
    avatar: "/woman-student-avatar-professional.jpg",
    bio: "Estudante de Engenharia | Compartilhando conhecimento 📚",
  },
  createdAt: "2024-03-15T10:30:00Z",
  avaliacoes: [
    {
      id: "1",
      usuario: {
        nome: "João Santos",
        username: "joaosantos",
        avatar: "/man-student-avatar.jpg",
      },
      nota: 5,
      comentario:
        "Excelente material! Me ajudou muito nas provas de Cálculo. Os exercícios resolvidos são muito bem explicados.",
      curtidas: 45,
      createdAt: "2024-03-20T14:00:00Z",
    },
    {
      id: "2",
      usuario: {
        nome: "Ana Costa",
        username: "anacosta",
        avatar: "/professional-woman-avatar.png",
      },
      nota: 4,
      comentario:
        "Ótimo livro para iniciantes. Algumas partes poderiam ter mais exemplos práticos, mas no geral é um material de qualidade.",
      curtidas: 23,
      createdAt: "2024-03-18T09:30:00Z",
    },
    {
      id: "3",
      usuario: {
        nome: "Pedro Lima",
        username: "pedrolima",
        avatar: "/man-young-avatar.jpg",
      },
      nota: 5,
      comentario: "Simplesmente o melhor material de Cálculo que já encontrei. Recomendo para todos os estudantes!",
      curtidas: 67,
      createdAt: "2024-03-16T16:45:00Z",
    },
  ],
}

export default function ObraPage() {
  const params = useParams()
  const [liked, setLiked] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [comment, setComment] = useState("")

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="container px-4 py-8">
      {/* Back Button */}
      <Link
        href="/feed"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft size={16} />
        Voltar ao feed
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Book Cover & Actions */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Cover Image */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-secondary border border-border">
              <Image src={mockWork.capa || "/placeholder.svg"} alt={mockWork.titulo} fill className="object-cover" />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2" size="lg">
                <Download size={18} />
                Download ({mockWork.formato})
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={liked ? "default" : "outline"}
                  className={cn("gap-2", liked && "bg-red-500 hover:bg-red-600")}
                  onClick={() => setLiked(!liked)}
                >
                  <Heart size={18} className={liked ? "fill-current" : ""} />
                  {liked ? mockWork.curtidas + 1 : mockWork.curtidas}
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Share2 size={18} />
                  Compartilhar
                </Button>
              </div>
            </div>

            {/* File Info */}
            <Card className="bg-card border-border">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Formato</span>
                  <span className="font-medium">{mockWork.formato}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tamanho</span>
                  <span className="font-medium">{mockWork.tamanho}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Páginas</span>
                  <span className="font-medium">{mockWork.paginas}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Idioma</span>
                  <span className="font-medium">{mockWork.idioma}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Downloads</span>
                  <span className="font-medium">{mockWork.downloads.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-primary text-primary-foreground">{mockWork.categoria}</Badge>
              <Badge variant="outline">{mockWork.subcategoria}</Badge>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-balance">{mockWork.titulo}</h1>

            <p className="text-xl text-muted-foreground">por {mockWork.autor}</p>

            {/* Rating Summary */}
            <div className="flex items-center gap-4">
              <Rating value={mockWork.nota} size="lg" showValue />
              <span className="text-muted-foreground">({mockWork.totalAvaliacoes} avaliações)</span>
            </div>
          </div>

          {/* Uploader Info */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Link href={`/perfil/${mockWork.usuario.username}`}>
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src={mockWork.usuario.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{mockWork.usuario.nome.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex-1">
                  <Link
                    href={`/perfil/${mockWork.usuario.username}`}
                    className="font-semibold hover:text-accent transition-colors"
                  >
                    {mockWork.usuario.nome}
                  </Link>
                  <p className="text-sm text-muted-foreground">@{mockWork.usuario.username}</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Hivado em {formatDate(mockWork.createdAt)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
              <FileText size={20} className="text-accent" />
              Descrição
            </h2>
            <p className="text-muted-foreground leading-relaxed">{mockWork.descricao}</p>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
              <BookOpen size={20} className="text-accent" />
              Detalhes da Obra
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                <Tag size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">ISBN</p>
                  <p className="text-sm font-medium">{mockWork.isbn}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                <Calendar size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Ano de Publicação</p>
                  <p className="text-sm font-medium">{mockWork.anoPublicacao}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Reviews Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                <MessageCircle size={20} className="text-accent" />
                Avaliações ({mockWork.totalAvaliacoes})
              </h2>
            </div>

            {/* Write Review */}
            <Card className="bg-card border-border">
              <CardHeader>
                <h3 className="font-semibold">Deixe sua avaliação</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Sua nota:</span>
                  <Rating value={userRating} interactive onChange={setUserRating} size="lg" />
                </div>
                <Textarea
                  placeholder="Compartilhe sua experiência com esta obra..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-secondary min-h-[100px]"
                />
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90" disabled={userRating === 0}>
                  Publicar avaliação
                </Button>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="space-y-4">
              {mockWork.avaliacoes.map((avaliacao) => (
                <Card key={avaliacao.id} className="bg-card border-border">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Link href={`/perfil/${avaliacao.usuario.username}`}>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={avaliacao.usuario.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{avaliacao.usuario.nome.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </Link>
                        <div>
                          <Link
                            href={`/perfil/${avaliacao.usuario.username}`}
                            className="font-semibold hover:text-accent transition-colors"
                          >
                            {avaliacao.usuario.nome}
                          </Link>
                          <div className="flex items-center gap-2">
                            <Rating value={avaliacao.nota} size="sm" />
                            <span className="text-xs text-muted-foreground">{formatDate(avaliacao.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Flag size={14} />
                      </Button>
                    </div>

                    <p className="text-muted-foreground">{avaliacao.comentario}</p>

                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="gap-2 h-8">
                        <ThumbsUp size={14} />
                        <span>{avaliacao.curtidas}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Reviews */}
            <div className="text-center">
              <Button variant="outline">Ver mais avaliações</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
