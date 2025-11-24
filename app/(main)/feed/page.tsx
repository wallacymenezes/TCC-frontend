"use client"

import { useState, useEffect } from "react"
import { Filter, TrendingUp, Clock, Star, Grid, List, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WorkCard } from "@/components/ui/work-card" // Supondo que você adapte a tipagem WorkCard
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"

// Tipagem conforme o backend ObraResponseDTO
interface Obra {
  id: number
  titulo: string
  descricao: string
  urlArquivo: string
  dataPublicacao: string
  nomeAutor: string
  fotoAutor: string
  nomeCategoria: string
  mediaAvaliacoes: number
  quantidadeCurtidas: number
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

export default function FeedPage() {
  const { token } = useAuth()
  const [obras, setObras] = useState<Obra[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [search, setSearch] = useState("")

  const fetchObras = async (pageNumber = 0) => {
    setLoading(true)
    try {
      // Construir URL com parâmetros
      const params = new URLSearchParams({
        page: pageNumber.toString(),
        size: "12",
        sort: "dataPublicacao,desc"
      })
      if (search) params.append("busca", search)

      const res = await fetch(`${API_URL}/obras?${params}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      
      const data = await res.json()
      if (pageNumber === 0) {
        setObras(data.content)
      } else {
        setObras(prev => [...prev, ...data.content])
      }
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error("Erro ao buscar obras", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchObras()
  }, [token]) // Recarrega se logar/deslogar

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchObras(nextPage)
  }

  // Adaptação dos dados para o componente WorkCard existente
  const mapObraToCard = (obra: Obra) => ({
    id: String(obra.id),
    titulo: obra.titulo,
    autor: obra.nomeAutor,
    capa: "/placeholder.jpg", // Backend ainda não tem capa do livro salvo, só autor. Usar placeholder ou adicionar campo capa na Obra.
    categoria: obra.nomeCategoria,
    nota: obra.mediaAvaliacoes || 0,
    totalAvaliacoes: 0, // Se o backend mandar lista, count nela
    curtidas: obra.quantidadeCurtidas,
    downloads: 0,
    usuario: {
      id: "0", // ID do autor
      nome: obra.nomeAutor,
      username: obra.nomeAutor,
      avatar: obra.fotoAutor || "/placeholder-user.jpg",
    },
    createdAt: obra.dataPublicacao,
  })

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">Feed da Colmeia</h1>
        <p className="text-muted-foreground">Descubra as obras mais recentes</p>
      </div>

      {/* Filtros (Simplificado) */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-card rounded-xl border border-border">
         {/* Adicione input de busca aqui se quiser setar o state 'search' */}
         <div className="flex items-center gap-2 border border-border rounded-lg p-1 ml-auto">
          <Button variant="ghost" size="sm" onClick={() => setViewMode("grid")} className={cn(viewMode === "grid" && "bg-secondary")}>
            <Grid size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setViewMode("list")} className={cn(viewMode === "list" && "bg-secondary")}>
            <List size={16} />
          </Button>
        </div>
      </div>

      {loading && page === 0 ? (
        <div className="flex justify-center py-10"><Loader2 className="animate-spin" /></div>
      ) : (
        <div className={cn(
          "grid gap-6",
          viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1",
        )}>
          {obras.map((obra) => (
            <WorkCard key={obra.id} work={mapObraToCard(obra)} variant={viewMode === "list" ? "compact" : "default"} />
          ))}
        </div>
      )}

      {page < totalPages - 1 && (
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" onClick={handleLoadMore} disabled={loading}>
            {loading ? <Loader2 className="animate-spin mr-2"/> : null}
            Carregar mais obras
          </Button>
        </div>
      )}
    </div>
  )
}