"use client"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import {
  Upload, FileText, Search, X, Check, ChevronRight, ChevronLeft, ImageIcon, Loader2, Link as LinkIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"

interface CategoriaDTO {
  id: number
  nome: string
}

interface GoogleBookDTO {
  titulo: string
  descricao: string
  autores: string[]
  capaUrl: string
}

// 1. Reduzimos para 2 etapas
const steps = [
  { id: 1, title: "Arquivo", description: "Envie seu material" },
  { id: 2, title: "Informações", description: "Detalhes da obra" },
]

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function HivarPage() {
  const { toast } = useToast()
  const { token } = useAuth()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [file, setFile] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [categories, setCategories] = useState<CategoriaDTO[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    titulo: "",
    autor: "", 
    descricao: "",
    categoriaId: "", 
    isbn: "",
    urlCapa: "", // Novo campo para a URL da capa
  })

  useEffect(() => {
    if (token) {
      fetch(`${API_URL}/categorias`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Erro ao carregar categorias", err))
    }
  }, [token])

  // Atualiza o preview da imagem quando o usuário edita o link manualmente
  useEffect(() => {
    setCoverImage(formData.urlCapa || null)
  }, [formData.urlCapa])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0]
    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"], "application/epub+zip": [".epub"] },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, 
  })

  const handleSearchGoogleBooks = async () => {
    const query = formData.isbn || formData.titulo
    if (!query) {
      toast({ title: "Preencha o título ou ISBN", variant: "destructive" })
      return
    }

    setIsSearching(true)
    try {
      const res = await fetch(`${API_URL}/integracao/google-books?query=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      
      if (res.ok) {
        const books: GoogleBookDTO[] = await res.json()
        if (books.length > 0) {
          const book = books[0]
          
          // Preenche os dados e a URL da Capa
          setFormData((prev) => ({
            ...prev,
            titulo: book.titulo,
            descricao: book.descricao || prev.descricao,
            autor: book.autores?.join(", ") || "",
            urlCapa: book.capaUrl || prev.urlCapa // Salva a URL do Google aqui
          }))
          
          toast({ title: "Livro encontrado!", description: "Dados preenchidos automaticamente." })
        } else {
            toast({ title: "Nenhum livro encontrado", variant: "destructive" })
        }
      }
    } catch (error) {
      toast({ title: "Erro na busca", variant: "destructive" })
    } finally {
      setIsSearching(false)
    }
  }

  const handleNext = () => {
    if (currentStep === 1 && !file) {
      toast({ title: "Arquivo obrigatório", variant: "destructive" })
      return
    }
    setCurrentStep(2)
  }

  const handleBack = () => setCurrentStep(1)

  const handleSubmit = async () => {
    if (!file || !token) return

    if (!formData.titulo || !formData.categoriaId) {
      toast({ title: "Título e Categoria são obrigatórios", variant: "destructive" })
      return
    }

    setIsSubmitting(true)
    try {
      const data = new FormData()
      
      const obraDTO = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        categoriaId: Number(formData.categoriaId),
        urlCapa: formData.urlCapa // 3. Envia a URL da capa no JSON
      }
      
      data.append("dados", new Blob([JSON.stringify(obraDTO)], { type: "application/json" }))
      data.append("arquivo", file)

      const response = await fetch(`${API_URL}/obras`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      })

      if (!response.ok) throw new Error("Falha no upload")

      toast({ title: "Obra Hivada com sucesso! 🎉" })

      // Reset
      setFile(null)
      setCoverImage(null)
      setFormData({ titulo: "", autor: "", descricao: "", categoriaId: "", isbn: "", urlCapa: "" })
      setCurrentStep(1)

    } catch (error) {
      toast({ title: "Erro ao publicar", description: "Tente novamente.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="container max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Hivar uma Obra</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Compartilhe conhecimento com a colmeia.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors",
                  currentStep >= step.id ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground",
                )}>
                {currentStep > step.id ? <Check size={20} /> : step.id}
              </div>
              <div className="mt-2 text-center">
                <p className={cn("text-sm font-medium", currentStep >= step.id ? "text-foreground" : "text-muted-foreground")}>
                  {step.title}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={cn("w-16 md:w-24 h-1 mx-4 rounded", currentStep > step.id ? "bg-accent" : "bg-secondary")} />
            )}
          </div>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-6 md:p-8">
          
          {/* --- ETAPA 1: ARQUIVO --- */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div {...getRootProps()} className={cn("border-2 border-dashed rounded-xl p-12 text-center cursor-pointer", isDragActive && "border-accent bg-accent/5")}>
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">{isDragActive ? "Solte o arquivo aqui" : "Clique ou arraste para enviar"}</p>
                    <p className="text-sm text-muted-foreground mt-1">PDF/EPUB até 50MB</p>
                  </div>
                </div>
              </div>
              {file && (
                <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                  <FileText className="h-8 w-8 text-accent" />
                  <div className="flex-1"><p className="font-medium">{file.name}</p><p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p></div>
                  <Button variant="ghost" size="icon" onClick={() => setFile(null)}><X size={18}/></Button>
                </div>
              )}
              
              <div className="flex justify-end mt-8 pt-6 border-t border-border">
                <Button onClick={handleNext} className="bg-accent text-accent-foreground gap-2">
                    Próximo <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* --- ETAPA 2: INFORMAÇÕES --- */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Botão Google */}
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-3">Preencha título/ISBN e busque dados automáticos.</p>
                <Button variant="outline" onClick={handleSearchGoogleBooks} disabled={isSearching} className="gap-2 bg-transparent">
                  {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />} Buscar no Google Books
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Preview da Capa */}
                <div className="space-y-4">
                  <Label>Capa da Obra</Label>
                  <div className="aspect-3/4 rounded-lg bg-secondary border border-border overflow-hidden flex items-center justify-center relative">
                    {coverImage ? (
                      <img src={coverImage} alt="Capa" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Sem capa</p>
                      </div>
                    )}
                  </div>
                  {/* 2. Input para URL da Capa */}
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="https://exemplo.com/capa.jpg" 
                        value={formData.urlCapa}
                        onChange={(e) => setFormData({ ...formData, urlCapa: e.target.value })}
                        className="pl-9 bg-secondary"
                    />
                  </div>
                </div>

                {/* Campos */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título *</Label>
                    <Input id="titulo" value={formData.titulo} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} className="bg-secondary" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria *</Label>
                    <Select value={formData.categoriaId} onValueChange={(v) => setFormData({ ...formData, categoriaId: v })}>
                      <SelectTrigger className="bg-secondary"><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => <SelectItem key={cat.id} value={String(cat.id)}>{cat.nome}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN (Opcional)</Label>
                    <Input id="isbn" value={formData.isbn} onChange={(e) => setFormData({ ...formData, isbn: e.target.value })} className="bg-secondary" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea id="descricao" value={formData.descricao} onChange={(e) => setFormData({ ...formData, descricao: e.target.value })} className="bg-secondary min-h-[120px]" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button variant="outline" onClick={handleBack} className="gap-2 bg-transparent">
                    <ChevronLeft size={16} /> Voltar
                </Button>
                {/* Botão Final de Submit na Etapa 2 */}
                <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-accent text-accent-foreground gap-2">
                    {isSubmitting ? <Loader2 size={16} className="animate-spin"/> : <><Upload size={16}/> Hivar Obra</>}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}