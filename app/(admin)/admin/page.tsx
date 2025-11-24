"use client"

import { Users, BookOpen, Download, TrendingUp, ArrowUpRight, ArrowDownRight, Star, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Total de Usuários",
    value: "5,234",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Obras Publicadas",
    value: "1,892",
    change: "+8%",
    trend: "up",
    icon: BookOpen,
  },
  {
    title: "Downloads Totais",
    value: "45,678",
    change: "+23%",
    trend: "up",
    icon: Download,
  },
  {
    title: "Avaliações",
    value: "12,456",
    change: "-2%",
    trend: "down",
    icon: Star,
  },
]

const recentUsers = [
  { id: "1", nome: "Maria Silva", username: "mariasilva", avatar: "/placeholder.svg", joinedAt: "Há 2 horas" },
  { id: "2", nome: "João Santos", username: "joaosantos", avatar: "/placeholder.svg", joinedAt: "Há 5 horas" },
  { id: "3", nome: "Ana Costa", username: "anacosta", avatar: "/placeholder.svg", joinedAt: "Há 1 dia" },
  { id: "4", nome: "Pedro Lima", username: "pedrolima", avatar: "/placeholder.svg", joinedAt: "Há 1 dia" },
  { id: "5", nome: "Lucia Ferreira", username: "luciaferreira", avatar: "/placeholder.svg", joinedAt: "Há 2 dias" },
]

const recentWorks = [
  { id: "1", titulo: "Cálculo I - Fundamentos", categoria: "Exatas", status: "ativo", downloads: 234 },
  { id: "2", titulo: "Direito Civil Vol. 1", categoria: "Direito", status: "ativo", downloads: 189 },
  { id: "3", titulo: "Anatomia Humana", categoria: "Saúde", status: "pendente", downloads: 0 },
  { id: "4", titulo: "Python para Iniciantes", categoria: "Tecnologia", status: "ativo", downloads: 567 },
  { id: "5", titulo: "Física Quântica", categoria: "Exatas", status: "ativo", downloads: 123 },
]

const topCategories = [
  { name: "Tecnologia", count: 456, percentage: 24 },
  { name: "Exatas", count: 389, percentage: 21 },
  { name: "Saúde", count: 312, percentage: 17 },
  { name: "Direito", count: 267, percentage: 14 },
  { name: "Humanas", count: 234, percentage: 12 },
]

export default function AdminDashboardPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral da plataforma HiveBooks</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-accent" />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    stat.trend === "up" ? "text-green-500" : "text-red-500",
                  )}
                >
                  {stat.trend === "up" ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-heading font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Users */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} className="text-accent" />
              Novos Hivers
            </CardTitle>
            <CardDescription>Últimos usuários cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user.nome.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.nome}</p>
                    <p className="text-xs text-muted-foreground">@{user.username}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{user.joinedAt}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Works */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen size={20} className="text-accent" />
              Obras Recentes
            </CardTitle>
            <CardDescription>Últimas obras publicadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentWorks.map((work) => (
                <div key={work.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <BookOpen size={18} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{work.titulo}</p>
                    <p className="text-xs text-muted-foreground">{work.categoria}</p>
                  </div>
                  <Badge
                    variant={work.status === "ativo" ? "default" : "secondary"}
                    className={cn(
                      work.status === "ativo" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500",
                    )}
                  >
                    {work.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity size={20} className="text-accent" />
              Categorias Populares
            </CardTitle>
            <CardDescription>Distribuição por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-muted-foreground">{category.count} obras</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Chart Placeholder */}
      <Card className="bg-card border-border mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={20} className="text-accent" />
            Atividade da Plataforma
          </CardTitle>
          <CardDescription>Downloads e cadastros nos últimos 30 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-secondary/50 rounded-lg">
            <p className="text-muted-foreground">Gráfico de atividades</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
