"use client"

import { useState } from "react"
import { Search, MoreHorizontal, UserPlus, Mail, Shield, Ban, Trash2, Edit, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { cn } from "@/lib/utils"

const mockUsers = [
  {
    id: "1",
    nome: "Maria Silva",
    username: "mariasilva",
    email: "maria@email.com",
    avatar: "/placeholder.svg",
    role: "USER",
    status: "ativo",
    obras: 12,
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    nome: "João Santos",
    username: "joaosantos",
    email: "joao@email.com",
    avatar: "/placeholder.svg",
    role: "USER",
    status: "ativo",
    obras: 8,
    createdAt: "2024-03-10",
  },
  {
    id: "3",
    nome: "Ana Costa",
    username: "anacosta",
    email: "ana@email.com",
    avatar: "/placeholder.svg",
    role: "ADMIN",
    status: "ativo",
    obras: 25,
    createdAt: "2024-02-20",
  },
  {
    id: "4",
    nome: "Pedro Lima",
    username: "pedrolima",
    email: "pedro@email.com",
    avatar: "/placeholder.svg",
    role: "USER",
    status: "suspenso",
    obras: 3,
    createdAt: "2024-03-05",
  },
  {
    id: "5",
    nome: "Lucia Ferreira",
    username: "luciaferreira",
    email: "lucia@email.com",
    avatar: "/placeholder.svg",
    role: "USER",
    status: "ativo",
    obras: 15,
    createdAt: "2024-01-15",
  },
]

export default function AdminUsuariosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold">Usuários</h1>
          <p className="text-muted-foreground">Gerencie os Hivers da plataforma</p>
        </div>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
          <UserPlus size={18} />
          Adicionar Usuário
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email ou username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[150px] bg-secondary">
            <SelectValue placeholder="Função" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas funções</SelectItem>
            <SelectItem value="USER">Usuário</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px] bg-secondary">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos status</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="suspenso">Suspenso</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead>Usuário</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Obras</TableHead>
              <TableHead>Data de Cadastro</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{user.nome.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.nome}</p>
                      <p className="text-sm text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === "ADMIN" ? "default" : "secondary"}
                    className={cn(user.role === "ADMIN" ? "bg-accent/20 text-accent" : "")}
                  >
                    {user.role === "ADMIN" ? "Admin" : "Usuário"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      user.status === "ativo" ? "border-green-500 text-green-500" : "border-red-500 text-red-500",
                    )}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.obras}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString("pt-BR")}
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
                        Ver perfil
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Edit size={14} />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Mail size={14} />
                        Enviar e-mail
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2">
                        <Shield size={14} />
                        Alterar função
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-yellow-500">
                        <Ban size={14} />
                        Suspender
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
          Mostrando {filteredUsers.length} de {mockUsers.length} usuários
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
