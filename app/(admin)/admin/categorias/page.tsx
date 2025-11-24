"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, FolderOpen, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

const mockCategories = [
  { id: "1", nome: "Exatas", slug: "exatas", obras: 342, cor: "#3F2E63" },
  { id: "2", nome: "Humanas", slug: "humanas", obras: 289, cor: "#5B4A82" },
  { id: "3", nome: "Saúde", slug: "saude", obras: 198, cor: "#7A6AA0" },
  { id: "4", nome: "Tecnologia", slug: "tecnologia", obras: 456, cor: "#F6D860" },
  { id: "5", nome: "Direito", slug: "direito", obras: 154, cor: "#D4B84A" },
  { id: "6", nome: "Engenharias", slug: "engenharias", obras: 234, cor: "#3F2E63" },
  { id: "7", nome: "Artes", slug: "artes", obras: 87, cor: "#5B4A82" },
  { id: "8", nome: "Ciências Sociais", slug: "ciencias-sociais", obras: 132, cor: "#7A6AA0" },
]

export default function AdminCategoriasPage() {
  const { toast } = useToast()
  const [categories, setCategories] = useState(mockCategories)
  const [newCategory, setNewCategory] = useState({ nome: "", cor: "#3F2E63" })
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddCategory = () => {
    if (!newCategory.nome) {
      toast({
        title: "Nome obrigatório",
        description: "Informe o nome da categoria.",
        variant: "destructive",
      })
      return
    }

    const slug = newCategory.nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")

    setCategories([
      ...categories,
      {
        id: String(categories.length + 1),
        nome: newCategory.nome,
        slug,
        obras: 0,
        cor: newCategory.cor,
      },
    ])

    toast({
      title: "Categoria criada!",
      description: `A categoria "${newCategory.nome}" foi adicionada.`,
    })

    setNewCategory({ nome: "", cor: "#3F2E63" })
    setDialogOpen(false)
  }

  const handleDeleteCategory = (id: string) => {
    const category = categories.find((c) => c.id === id)
    setCategories(categories.filter((c) => c.id !== id))
    toast({
      title: "Categoria excluída",
      description: `A categoria "${category?.nome}" foi removida.`,
    })
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold">Categorias</h1>
          <p className="text-muted-foreground">Gerencie as categorias de obras</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
              <Plus size={18} />
              Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Categoria</DialogTitle>
              <DialogDescription>Adicione uma nova categoria para organizar as obras</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da categoria</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Medicina"
                  value={newCategory.nome}
                  onChange={(e) => setNewCategory({ ...newCategory, nome: e.target.value })}
                  className="bg-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cor">Cor</Label>
                <div className="flex gap-2">
                  <Input
                    id="cor"
                    type="color"
                    value={newCategory.cor}
                    onChange={(e) => setNewCategory({ ...newCategory, cor: e.target.value })}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={newCategory.cor}
                    onChange={(e) => setNewCategory({ ...newCategory, cor: e.target.value })}
                    className="bg-secondary flex-1"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddCategory} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Criar Categoria
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FolderOpen className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold">{categories.length}</p>
                <p className="text-sm text-muted-foreground">Total de Categorias</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold">
                  {categories.reduce((acc, cat) => acc + cat.obras, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Obras Categorizadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <FolderOpen className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold">
                  {categories.length > 0
                    ? categories.reduce((max, cat) => (cat.obras > max.obras ? cat : max), categories[0]).nome
                    : "-"}
                </p>
                <p className="text-sm text-muted-foreground">Categoria Mais Popular</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="bg-card border-border group">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${category.cor}20` }}
                >
                  <FolderOpen className="h-5 w-5" style={{ color: category.cor }} />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
              <h3 className="font-heading font-semibold mb-1">{category.nome}</h3>
              <p className="text-sm text-muted-foreground mb-3">/{category.slug}</p>
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{category.obras} obras</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
