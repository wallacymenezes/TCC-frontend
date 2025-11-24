"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Eye, Edit, Trash2, Download, Flag, CheckCircle, XCircle, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockWorks = [
  {
    id: "1",
    titulo: "Cálculo I - Fundamentos e Aplicações",
    autor: "James Stewart",
    categoria: "Exatas",
    usuario: "Maria Silva",
    status: "ativo",
    downloads: 1420,
    denuncias: 0,
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    titulo: "Introdução à Programação com Python",
    autor: "Eric Matthes",
    categoria: "Tecnologia",
    usuario: "João Santos",
    status: "ativo",
    downloads: 2890,
    denuncias: 0,
    createdAt: "2024-03-12",
  },
  {
    id: "3",
    titulo: "Resumo de Direito Civil",
    autor: "Pedro Lenza",
    categoria: "Direito",
    usuario: "Ana Costa",
    status: "pendente",
    downloads: 0,
    denuncias: 0,
    createdAt: "2024-03-20",
  },
  {
    id: "4",
    titulo: "Anatomia Humana Ilustrada",
    autor: "Frank Netter",
    categoria: "Saúde",
    usuario: "Carlos Mendes",
    status: "ativo",
    downloads: 4230,
    denuncias: 2,
    createdAt: "2024-02-28",
  },
  {
    id: "5",
    titulo: "Física Quântica Básica",
    autor: "Richard Feynman",
    categoria: "Exatas",
    usuario: "Lucia Ferreira",
    status: "inativo",
    downloads: 876,
    denuncias: 5,
    createdAt: "2024-01-15",
  },
]

export default function AdminObrasPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredWorks = mockWorks.filter((work) => {
    const matchesSearch =
      work.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.autor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || work.categoria === categoryFilter
    const matchesStatus = statusFilter === "all" || work.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "border-green-500 text-green-500"
      case "pendente":
        return "border-yellow-500 text-yellow-500"
      case "inativo":
        return "border-red-500 text-red-500"
      default:
        return ""
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">Obras</h1>
        <p className="text-muted-foreground">Gerencie as obras publicadas na plataforma</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-card rounded-lg border border-border">
          <p className="text-2xl font-heading font-bold text-accent">{mockWorks.length}</p>
          <p className="text-sm text-muted-foreground">Total de Obras</p>
        </div>
        <div className="p-4 bg-card rounded-lg border border-border">
          <p className="text-2xl font-heading font-bold text-green-500">
            {mockWorks.filter((w) => w.status === "ativo").length}
          </p>
          <p className="text-sm text-muted-foreground">Ativas</p>
        </div>
        <div className="p-4 bg-card rounded-lg border border-border">
          <p className="text-2xl font-heading font-bold text-yellow-500">
            {mockWorks.filter((w) => w.status === "pendente").length}
          </p>
          <p className="text-sm text-muted-foreground">Pendentes</p>
        </div>
        <div className="p-4 bg-card rounded-lg border border-border">
          <p className="text-2xl font-heading font-bold text-red-500">
            {mockWorks.filter((w) => w.denuncias > 0).length}
          </p>
          <p className="text-sm text-muted-foreground">Com Denúncias</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título ou autor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px] bg-secondary">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas categorias</SelectItem>
            <SelectItem value="Exatas">Exatas</SelectItem>
            <SelectItem value="Tecnologia">Tecnologia</SelectItem>
            <SelectItem value="Direito">Direito</SelectItem>
            <SelectItem value="Saúde">Saúde</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px] bg-secondary">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos status</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead>Obra</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Publicado por</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead>Denúncias</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWorks.map((work) => (
              <TableRow key={work.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 rounded bg-secondary flex items-center justify-center">
                      <BookOpen size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium line-clamp-1">{work.titulo}</p>
                      <p className="text-sm text-muted-foreground">{work.autor}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{work.categoria}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{work.usuario}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(work.status)}>
                    {work.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Download size={14} className="text-muted-foreground" />
                    {work.downloads.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  {work.denuncias > 0 ? (
                    <Badge variant="destructive" className="bg-red-500/10 text-red-500">
                      <Flag size={12} className="mr-1" />
                      {work.denuncias}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(work.createdAt).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Eye size={14} />
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Edit size={14} />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-green-500">
                        <CheckCircle size={14} />
                        Aprovar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-yellow-500">
                        <XCircle size={14} />
                        Desativar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 size={14} />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-muted-foreground">
          Mostrando {filteredWorks.length} de {mockWorks.length} obras
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm">
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
