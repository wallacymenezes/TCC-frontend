"use client"

import { useState } from "react"
import { Search, TrendingUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { WorkCard, type Work } from "@/components/ui/work-card"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", label: "Todas", count: 1250 },
  { id: "exatas", label: "Exatas", count: 342 },
  { id: "humanas", label: "Humanas", count: 289 },
  { id: "saude", label: "Saúde", count: 198 },
  { id: "tecnologia", label: "Tecnologia", count: 267 },
  { id: "direito", label: "Direito", count: 154 },
]

const trendingWorks: Work[] = [
  {
    id: "1",
    titulo: "Machine Learning com Python - Guia Completo",
    autor: "Sebastian Raschka",
    capa: "/machine-learning-python-book-cover.jpg",
    categoria: "Tecnologia",
    nota: 4.9,
    totalAvaliacoes: 312,
    curtidas: 567,
    downloads: 4230,
    usuario: {
      id: "1",
      nome: "Tech Hiver",
      username: "techhiver",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    titulo: "Direito Civil Brasileiro - Vol. 1",
    autor: "Carlos Roberto Gonçalves",
    capa: "/placeholder.svg?height=400&width=300",
    categoria: "Direito",
    nota: 4.8,
    totalAvaliacoes: 245,
    curtidas: 389,
    downloads: 2890,
    usuario: {
      id: "2",
      nome: "Jurista Hiver",
      username: "juristahiver",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    titulo: "Bioquímica Ilustrada - Harper",
    autor: "Victor Rodwell",
    capa: "/placeholder.svg?height=400&width=300",
    categoria: "Saúde",
    nota: 4.7,
    totalAvaliacoes: 189,
    curtidas: 298,
    downloads: 1890,
    usuario: {
      id: "3",
      nome: "Med Hiver",
      username: "medhiver",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    createdAt: new Date().toISOString(),
  },
]

const recentWorks: Work[] = [
  {
    id: "4",
    titulo: "Álgebra Linear e suas Aplicações",
    autor: "David Lay",
    capa: "/placeholder.svg?height=400&width=300",
    categoria: "Exatas",
    nota: 4.6,
    totalAvaliacoes: 134,
    curtidas: 198,
    downloads: 1234,
    usuario: {
      id: "4",
      nome: "Math Hiver",
      username: "mathhiver",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    titulo: "Sociologia Geral",
    autor: "Anthony Giddens",
    capa: "/placeholder.svg?height=400&width=300",
    categoria: "Humanas",
    nota: 4.5,
    totalAvaliacoes: 98,
    curtidas: 156,
    downloads: 876,
    usuario: {
      id: "5",
      nome: "Social Hiver",
      username: "socialhiver",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    titulo: "Fundamentos de Enfermagem",
    autor: "Patricia Potter",
    capa: "/placeholder.svg?height=400&width=300",
    categoria: "Saúde",
    nota: 4.8,
    totalAvaliacoes: 167,
    curtidas: 234,
    downloads: 1567,
    usuario: {
      id: "6",
      nome: "Nurse Hiver",
      username: "nursehiver",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    titulo: "Estruturas de Dados em C",
    autor: "André Backes",
    capa: "/placeholder.svg?height=400&width=300",
    categoria: "Tecnologia",
    nota: 4.7,
    totalAvaliacoes: 145,
    curtidas: 212,
    downloads: 1345,
    usuario: {
      id: "7",
      nome: "Dev Hiver",
      username: "devhiver",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    createdAt: new Date().toISOString(),
  },
]

export default function ExplorarPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Explorar a Colmeia</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Descubra milhares de materiais acadêmicos compartilhados pela comunidade
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por título, autor, ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 h-14 text-lg bg-secondary border-border"
          />
          <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-accent-foreground hover:bg-accent/90">
            Buscar
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              "gap-2",
              selectedCategory === cat.id && "bg-accent text-accent-foreground hover:bg-accent/90",
            )}
          >
            {cat.label}
            <Badge variant="secondary" className="ml-1 bg-background/20">
              {cat.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Trending Section */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-6 w-6 text-accent" />
          <h2 className="font-heading text-2xl font-bold">Em Alta</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingWorks.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </section>

      {/* Recent Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-6 w-6 text-accent" />
          <h2 className="font-heading text-2xl font-bold">Adicionados Recentemente</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentWorks.map((work) => (
            <WorkCard key={work.id} work={work} variant="compact" />
          ))}
        </div>
      </section>

      {/* Load More */}
      <div className="mt-12 text-center">
        <Button variant="outline" size="lg">
          Carregar mais obras
        </Button>
      </div>
    </div>
  )
}
