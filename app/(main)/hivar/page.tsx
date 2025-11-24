"use client"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import {
  Upload, FileText, Search, X, Check, ChevronRight, ChevronLeft, ImageIcon, Loader2, BookOpen,
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

// DTOs
interface CategoriaDTO {
  id: number
  nome: string
  descricao?: string
}

interface GoogleBookDTO {
  googleId: string
  titulo: string
  descricao: string
  autores: string[]
  dataPublicacao: string
  capaUrl: string
}

const steps = [
  { id: 1, title: "Arquivo", description: "Envie seu material" },
  { id: 2, title: "Informações", description: "Detalhes da obra" },
  { id: 3, title: "Revisão", description: "Confirme os dados" },
]

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

export default function HivarPage() {
  const { toast } = useToast()
  const { token } = useAuth() // Pegar token para requisições autenticadas
  
  const [currentStep, setCurrentStep] = useState(1)
  const [file, setFile] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  
  // Estados de dados
  const [categories, setCategories] = useState<CategoriaDTO[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    titulo: "",
    autor: "", // Apenas visual, o backend pega o autor do token
    descricao: "",
    categoriaId: "", // ID da categoria selecionada
    isbn: "", // Opcional, usado na busca
  })

  // Carregar categorias ao iniciar
  useEffect(() => {
    fetch(`${API_URL}/categorias`, {
        headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Erro ao carregar categorias", err))
  }, [token])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0]
    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/epub+zip": [".epub"],
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB (Limite configurado no backend)
  })

  const handleSearchGoogleBooks = async () => {
    const query = formData.isbn || formData.titulo
    if (!query) {
      toast({
        title: "Preencha o título ou ISBN",
        description: "Informe o título ou ISBN para buscar informações.",
        variant: "destructive",
      })
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
          setFormData((prev) => ({
            ...prev,
            titulo: book.titulo,
            descricao: book.descricao || prev.descricao,
            autor: book.autores.join(", "),
          }))
          if (book.capaUrl) setCoverImage(book.capaUrl)
          
          toast({
            title: "Livro encontrado!",
            description: "Dados preenchidos automaticamente via Google Books.",
          })
        } else {
            toast({ title: "Nenhum livro encontrado", variant: "destructive" })
        }
      }
    } catch (error) {
      toast({ title: "Erro na busca", description: "Tente novamente.", variant: "destructive" })
    } finally {
      setIsSearching(false)
    }
  }

  const handleNext = () => {
    if (currentStep === 1 && !file) {
      toast({ title: "Arquivo obrigatório", description: "Envie um arquivo.", variant: "destructive" })
      return
    }
    if (currentStep === 2 && (!formData.titulo || !formData.categoriaId)) {
      toast({ title: "Campos obrigatórios", description: "Preencha título e categoria.", variant: "destructive" })
      return
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const handleSubmit = async () => {
    if (!file || !token) return

    setIsSubmitting(true)
    try {
      // Preparar o Multipart Form Data
      const data = new FormData()
      
      // O JSON deve ser enviado como uma parte chamada 'dados' com Content-Type application/json
      const obraDTO = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        categoriaId: Number(formData.categoriaId)
      }
      
      data.append("dados", new Blob([JSON.stringify(obraDTO)], { type: "application/json" }))
      data.append("arquivo", file)

      const response = await fetch(`${API_URL}/obras`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Não defina Content-Type aqui! O navegador define automaticamente como multipart/form-data com boundary
        },
        body: data,
      })

      if (!response.ok) throw new Error("Falha no upload")

      toast({
        title: "Obra Hivada com sucesso! 🎉",
        description: "Sua contribuição está disponível na colmeia.",
      })

      // Reset
      setFile(null)
      setCoverImage(null)
      setFormData({ titulo: "", autor: "", descricao: "", categoriaId: "", isbn: "" })
      setCurrentStep(1)

    } catch (error) {
      toast({
        title: "Erro ao publicar",
        description: "Verifique o tamanho do arquivo (Max 50MB) ou tente novamente.",
        variant: "destructive",
      })
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
      {/* Header e Steps mantidos... */}
      
      {/* Step Content */}
      <Card className="bg-card border-border">
        <CardContent className="p-6 md:p-8">
          {/* Step 1: File Upload (Mantido igual) */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div
                {...getRootProps()}
                className={cn(
                  "border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors",
                  isDragActive ? "border-accent bg-accent/5" : "border-border hover:border-accent/50",
                )}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">
                      {isDragActive ? "Solte o arquivo aqui" : "Arraste seu arquivo ou clique para enviar"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">PDF ou EPUB até 50MB</p>
                  </div>
                </div>
              </div>
              {file && (
                <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                    <X size={18} />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Information (Atualizado com Select de categorias dinâmico) */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-3">
                  Preencha o título ou ISBN e busque informações automaticamente no Google Books
                </p>
                <Button
                  variant="outline"
                  onClick={handleSearchGoogleBooks}
                  disabled={isSearching}
                  className="gap-2 bg-transparent"
                >
                  {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                  Buscar no Google Books
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Capa da Obra</Label>
                  <div className="aspect-3/4 rounded-lg bg-secondary border border-border overflow-hidden flex items-center justify-center">
                    {coverImage ? (
                      <img src={coverImage} alt="Capa" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Capa automática (Google Books)</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título *</Label>
                    <Input
                      id="titulo"
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      className="bg-secondary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria *</Label>
                    <Select
                      value={formData.categoriaId}
                      onValueChange={(value) => setFormData({ ...formData, categoriaId: value })}
                    >
                      <SelectTrigger className="bg-secondary">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="isbn">ISBN (Opcional)</Label>
                      <Input
                        id="isbn"
                        value={formData.isbn}
                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                        className="bg-secondary"
                      />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="bg-secondary min-h-[120px]"
                />
              </div>
            </div>
          )}

          {/* Step 3: Review (Mantido estrutura, apenas exibindo dados) */}
          {currentStep === 3 && (
            <div className="space-y-6">
                {/* ... layout igual ao original ... */}
                {/* Botões de navegação chamando handleSubmit */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                    <Button variant="outline" onClick={handleBack} className="gap-2 bg-transparent">
                        <ChevronLeft size={16} /> Voltar
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-accent text-accent-foreground">
                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <><Upload size={16} className="mr-2"/> Hivar Obra</>}
                    </Button>
                </div>
            </div>
          )}
          
          {/* Botões de navegação do Step 1 e 2 */}
          {currentStep < 3 && (
             <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button variant="outline" onClick={handleBack} disabled={currentStep===1} className="gap-2 bg-transparent">
                    <ChevronLeft size={16} /> Voltar
                </Button>
                <Button onClick={handleNext} className="bg-accent text-accent-foreground">
                    Próximo <ChevronRight size={16} />
                </Button>
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}