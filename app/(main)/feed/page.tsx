"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { WorkCard } from "@/components/ui/work-card"
import { useAuth } from "@/contexts/auth-context"

interface Obra {
  id: number
  titulo: string
  descricao: string
  urlArquivo: string
  dataPublicacao: string
  nomeAutor: string
  fotoAutor?: string
  nomeCategoria: string
  mediaAvaliacoes: number
  quantidadeCurtidas: number
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

  const mapToCard = (obra: Obra) => ({
    id: String(obra.id),
    titulo: obra.titulo,
    autor: obra.nomeAutor,
    capa: "/placeholder.jpg", // Backend não tem capa de livro ainda
    categoria: obra.nomeCategoria,
    nota: obra.mediaAvaliacoes || 0,
    totalAvaliacoes: 0,
    curtidas: obra.quantidadeCurtidas,
    downloads: 0,
    usuario: {
      id: "0",
      nome: obra.nomeAutor,
      username: obra.nomeAutor,
      avatar: obra.fotoAutor || "/placeholder-user.jpg",
    },
    createdAt: obra.dataPublicacao,
  })

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin"/></div>

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Feed da Colmeia</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {obras.map(obra => (
          <WorkCard key={obra.id} work={mapToCard(obra)} variant="default" />
        ))}
      </div>
    </div>
  )
}