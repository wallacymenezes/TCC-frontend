"use client"

import { TrendingUp, Users, BookOpen, Download, Star, ArrowUpRight, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const monthlyStats = [
  { month: "Jan", users: 320, works: 45, downloads: 3200 },
  { month: "Fev", users: 456, works: 67, downloads: 4500 },
  { month: "Mar", users: 589, works: 89, downloads: 6700 },
  { month: "Abr", users: 678, works: 112, downloads: 8900 },
  { month: "Mai", users: 789, works: 134, downloads: 11200 },
  { month: "Jun", users: 923, works: 156, downloads: 14500 },
]

const topWorks = [
  { titulo: "Cálculo I - Fundamentos", downloads: 4230, rating: 4.9 },
  { titulo: "Python para Iniciantes", downloads: 3890, rating: 4.8 },
  { titulo: "Anatomia Humana Ilustrada", downloads: 3567, rating: 4.9 },
  { titulo: "Direito Civil Vol. 1", downloads: 2890, rating: 4.7 },
  { titulo: "Física Quântica Básica", downloads: 2456, rating: 4.6 },
]

const topUsers = [
  { nome: "Maria Silva", obras: 25, downloads: 12340, rating: 4.9 },
  { nome: "João Santos", obras: 18, downloads: 8920, rating: 4.8 },
  { nome: "Ana Costa", obras: 15, downloads: 7650, rating: 4.7 },
  { nome: "Pedro Lima", obras: 12, downloads: 5430, rating: 4.6 },
  { nome: "Lucia Ferreira", obras: 10, downloads: 4210, rating: 4.5 },
]

export default function AdminEstatisticasPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold">Estatísticas</h1>
          <p className="text-muted-foreground">Análise detalhada da plataforma</p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[180px] bg-secondary">
              <Calendar size={16} className="mr-2" />
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Exportar</Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-5 w-5 text-accent" />
              <span className="text-sm text-green-500 flex items-center gap-1">
                <ArrowUpRight size={14} />
                +18%
              </span>
            </div>
            <p className="text-3xl font-heading font-bold">5,234</p>
            <p className="text-sm text-muted-foreground">Novos usuários este mês</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="h-5 w-5 text-accent" />
              <span className="text-sm text-green-500 flex items-center gap-1">
                <ArrowUpRight size={14} />
                +12%
              </span>
            </div>
            <p className="text-3xl font-heading font-bold">156</p>
            <p className="text-sm text-muted-foreground">Obras publicadas este mês</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Download className="h-5 w-5 text-accent" />
              <span className="text-sm text-green-500 flex items-center gap-1">
                <ArrowUpRight size={14} />
                +25%
              </span>
            </div>
            <p className="text-3xl font-heading font-bold">14.5K</p>
            <p className="text-sm text-muted-foreground">Downloads este mês</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Star className="h-5 w-5 text-accent" />
              <span className="text-sm text-green-500 flex items-center gap-1">
                <ArrowUpRight size={14} />
                +8%
              </span>
            </div>
            <p className="text-3xl font-heading font-bold">4.7</p>
            <p className="text-sm text-muted-foreground">Média de avaliações</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Growth Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} className="text-accent" />
              Crescimento Mensal
            </CardTitle>
            <CardDescription>Usuários, obras e downloads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {monthlyStats.map((stat, index) => (
                <div key={stat.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full space-y-1">
                    <div
                      className="w-full bg-accent/20 rounded-t"
                      style={{ height: `${(stat.downloads / 15000) * 150}px` }}
                    />
                    <div
                      className="w-full bg-primary/40 rounded-t"
                      style={{ height: `${(stat.works / 160) * 80}px` }}
                    />
                    <div className="w-full bg-accent rounded-t" style={{ height: `${(stat.users / 1000) * 50}px` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{stat.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-accent" />
                <span className="text-xs text-muted-foreground">Usuários</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary/40" />
                <span className="text-xs text-muted-foreground">Obras</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-accent/20" />
                <span className="text-xs text-muted-foreground">Downloads</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Distribuição por Categoria</CardTitle>
            <CardDescription>Obras por área de conhecimento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Tecnologia", value: 456, color: "#F6D860" },
                { name: "Exatas", value: 389, color: "#3F2E63" },
                { name: "Saúde", value: 312, color: "#5B4A82" },
                { name: "Direito", value: 267, color: "#7A6AA0" },
                { name: "Humanas", value: 234, color: "#D4B84A" },
                { name: "Engenharias", value: 198, color: "#9B8BC4" },
              ].map((cat) => (
                <div key={cat.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{cat.name}</span>
                    <span className="text-muted-foreground">{cat.value} obras</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(cat.value / 456) * 100}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rankings */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Works */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen size={20} className="text-accent" />
              Top Obras
            </CardTitle>
            <CardDescription>Obras mais baixadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topWorks.map((work, index) => (
                <div key={work.titulo} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-heading font-bold text-accent">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{work.titulo}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Download size={12} />
                        {work.downloads.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={12} className="text-accent" />
                        {work.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Users */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} className="text-accent" />
              Top Hivers
            </CardTitle>
            <CardDescription>Usuários mais ativos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUsers.map((user, index) => (
                <div key={user.nome} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-heading font-bold text-accent">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{user.nome}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{user.obras} obras</span>
                      <span className="flex items-center gap-1">
                        <Download size={12} />
                        {user.downloads.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={12} className="text-accent" />
                        {user.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
