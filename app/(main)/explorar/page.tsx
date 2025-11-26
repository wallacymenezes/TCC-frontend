"use client"

import { useState, useEffect } from "react"
import { Search, Loader2, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WorkCard } from "@/components/ui/work-card"
import { useAuth } from "@/contexts/auth-context"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function ExplorarPage() {
  const { token } = useAuth()
  const [works, setWorks] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchWorks = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.append("busca", search)
      params.append("size", "20") // Limite inicial

      const res = await fetch(`${API_URL}/obras?${params}`, {
         headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      const data = await res.json()
      setWorks(data.content || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWorks()
  }, [])

  // Mapper genérico
  const mapToCard = (obra: any) => ({
    id: String(obra.id),
    titulo: obra.titulo,
    autor: obra.nomeAutor,
    capa: "/placeholder.jpg",
    categoria: obra.nomeCategoria,
    nota: obra.mediaAvaliacoes || 0,
    totalAvaliacoes: 0,
    curtidas: obra.quantidadeCurtidas,
    downloads: 0,
    usuario: {
        id: "0",
        nome: obra.nomeAutor,
        username: obra.nomeAutor,
        avatar: obra.fotoAutor
    },
    createdAt: obra.dataPublicacao
  })

  return (
    <div className="container px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Explorar</h1>
        <p className="text-muted-foreground">Busque materiais por título ou assunto.</p>
      </div>

      <div className="max-w-2xl mx-auto mb-12 flex gap-2">
        <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                placeholder="Buscar..." 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                onKeyDown={e => e.key === "Enter" && fetchWorks()}
                className="pl-12 pr-4 h-14 bg-secondary" 
            />
        </div>
        <Button onClick={fetchWorks} className="h-14 px-8 bg-accent text-accent-foreground">Buscar</Button>
      </div>

      {loading ? (
        <div className="flex justify-center"><Loader2 className="animate-spin"/></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {works.length > 0 ? (
             works.map((w: any) => <WorkCard key={w.id} work={mapToCard(w)} />)
           ) : (
             <div className="col-span-full text-center py-10 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-20"/>
                Nenhum resultado encontrado.
             </div>
           )}
        </div>
      )}
    </div>
  )
}