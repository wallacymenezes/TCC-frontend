"use client"

import { useState, useEffect } from "react"
import { Loader2, BookOpen } from "lucide-react"
import { WorkCard } from "@/components/ui/work-card"
import { useAuth } from "@/contexts/auth-context"

// 1. Atualizamos a interface para incluir os campos que o Backend manda agora
interface Obra {
  id: number
  titulo: string
  descricao: string
  urlArquivo: string
  urlCapa?: string // Agora temos a capa real!
  dataPublicacao: string
  nomeAutor: string
  fotoAutor?: string
  nomeCategoria: string
  mediaAvaliacoes: number
  quantidadeCurtidas: number
  avaliacoes?: any[] // Lista de avaliações para contarmos o total
  idsUsuariosQueCurtiram?: number[] // Lista de IDs para a lógica do coração amarelo
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

export default function FeedPage() {
  const { token } = useAuth()
  const [obras, setObras] = useState<Obra[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(`${API_URL}/obras?page=0&size=20&sort=dataPublicacao,desc`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
        const data = await res.json()
        setObras(data.content || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchFeed()
  }, [token])

  // 2. Mapeamos os dados reais para o componente
  const mapToCard = (obra: Obra) => ({
    id: String(obra.id),
    titulo: obra.titulo,
    autor: obra.nomeAutor,
    
    // Capa: Usa a URL do banco ou o placeholder se for nula/vazia
    capa: obra.urlCapa || "/placeholder.jpg", 
    
    categoria: obra.nomeCategoria,
    nota: obra.mediaAvaliacoes || 0,
    
    // Total de Avaliações: Conta o tamanho da lista que vem no JSON
    totalAvaliacoes: obra.avaliacoes?.length || 0,
    
    curtidas: obra.quantidadeCurtidas,
    downloads: 0,
    
    // IDs para o WorkCard saber se deve pintar o coração de amarelo
    idsUsuariosQueCurtiram: obra.idsUsuariosQueCurtiram,

    usuario: {
      id: "0", // O ID do autor não é crítico aqui, mas poderíamos pegar se o DTO mandasse
      nome: obra.nomeAutor,
      username: obra.nomeAutor,
      avatar: obra.fotoAutor || "/placeholder-user.jpg",
    },
    createdAt: obra.dataPublicacao,
  })

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Feed da Colmeia</h1>
      
      {obras.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">
          {obras.map(obra => (
            <WorkCard key={obra.id} work={mapToCard(obra)} variant="default" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <BookOpen className="h-12 w-12 mb-4 opacity-20" />
            <p>Nenhuma obra encontrada na colmeia.</p>
        </div>
      )}
    </div>
  )
}