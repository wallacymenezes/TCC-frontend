"use client"

import { useState } from "react"
import { Filter, TrendingUp, Clock, Star, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WorkCard, type Work } from "@/components/ui/work-card"
import { cn } from "@/lib/utils"

// Mock data
const mockWorks: Work[] = [
  {
    id: "1",
    titulo: "Cálculo I - Fundamentos e Aplicações",
    autor: "James Stewart",
    capa: "/calculus-mathematics-book-cover.jpg",
    categoria: "Exatas",
    nota: 4.8,
    totalAvaliacoes: 156,
    curtidas: 234,
    downloads: 1420,
    usuario: {
      id: "1",
      nome: "Maria Silva",
      username: "mariasilva",
      avatar: "/woman-student-avatar.png",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    titulo: "Introdução à Programação com Python",
    autor: "Eric Matthes",
    capa: "/python-programming-book-cover.png",
    categoria: "Tecnologia",
    nota: 4.9,
    totalAvaliacoes: 289,
    curtidas: 456,
    downloads: 2890,
    usuario: {
      id: "2",
      nome: "João Santos",
      username: "joaosantos",
      avatar: "/man-student-avatar.jpg",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    titulo: "Resumo Completo de Direito Constitucional",
    autor: "Pedro Lenza",
    capa: "/law-constitution-book-cover-purple.jpg",
    categoria: "Direito",
    nota: 4.7,
    totalAvaliacoes: 198,
    curtidas: 312,
    downloads: 1856,
    usuario: {
      id: "3",
      nome: "Ana Costa",
      username: "anacosta",
      avatar: "/professional-woman-avatar.png",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    titulo: "Anatomia Humana Ilustrada",
    autor: "Frank Netter",
    capa: "/anatomy-medical-book-cover.jpg",
    categoria: "Saúde",
    nota: 4.9,
    totalAvaliacoes: 445,
    curtidas: 678,
    downloads: 4230,
    usuario: {
      id: "4",
      nome: "Carlos Mendes",
      username: "carlosmendes",
      avatar: "/man-doctor-avatar.jpg",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    titulo: "Física Universitária - Volume 1",
    autor: "Young & Freedman",
    capa: "/physics-university-book-cover.jpg",
    categoria: "Exatas",
    nota: 4.6,
    totalAvaliacoes: 267,
    curtidas: 389,
    downloads: 2145,
    usuario: {
      id: "5",
      nome: "Lucia Ferreira",
      username: "luciaferreira",
      avatar: "/woman-teacher-avatar.png",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    titulo: "Economia para Iniciantes",
    autor: "N. Gregory Mankiw",
    capa: "/economics-business-book-cover.jpg",
    categoria: "Humanas",
    nota: 4.5,
    totalAvaliacoes: 134,
    curtidas: 198,
    downloads: 987,
    usuario: {
      id: "6",
      nome: "Roberto Lima",
      username: "robertolima",
      avatar: "/business-man-avatar.png",
    },
    createdAt: new Date().toISOString(),
  },
]

const categories = ["Todas", "Exatas", "Humanas", "Saúde", "Tecnologia", "Direito", "Engenharias", "Artes"]

export default function FeedPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("trending")
  const [category, setCategory] = useState("Todas")

  return (
    <div className="container px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">Feed da Colmeia</h1>
        <p className="text-muted-foreground">Descubra as obras mais recentes compartilhadas pela comunidade</p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-card rounded-xl border border-border">
        <div className="flex-1 flex flex-wrap gap-4">
          {/* Category Filter */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px] bg-secondary">
              <Filter size={16} className="mr-2" />
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort Filter */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-secondary">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">
                <span className="flex items-center gap-2">
                  <TrendingUp size={14} />
                  Em alta
                </span>
              </SelectItem>
              <SelectItem value="recent">
                <span className="flex items-center gap-2">
                  <Clock size={14} />
                  Mais recentes
                </span>
              </SelectItem>
              <SelectItem value="rating">
                <span className="flex items-center gap-2">
                  <Star size={14} />
                  Melhor avaliados
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View Mode Toggle */}
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

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory(cat)}
            className={cn(
              "whitespace-nowrap",
              category === cat && "bg-accent text-accent-foreground hover:bg-accent/90",
            )}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Works Grid */}
      <div
        className={cn(
          "grid gap-6",
          viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1",
        )}
      >
        {mockWorks.map((work) => (
          <WorkCard key={work.id} work={work} variant={viewMode === "list" ? "compact" : "default"} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <Button variant="outline" size="lg">
          Carregar mais obras
        </Button>
      </div>
    </div>
  )
}
