"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import {
  Upload,
  FileText,
  Search,
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  ImageIcon,
  Loader2,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const steps = [
  { id: 1, title: "Arquivo", description: "Envie seu material" },
  { id: 2, title: "Informações", description: "Detalhes da obra" },
  { id: 3, title: "Revisão", description: "Confirme os dados" },
]

const categories = [
  { value: "exatas", label: "Exatas" },
  { value: "humanas", label: "Humanas" },
  { value: "saude", label: "Saúde" },
  { value: "tecnologia", label: "Tecnologia" },
  { value: "direito", label: "Direito" },
  { value: "engenharias", label: "Engenharias" },
  { value: "artes", label: "Artes" },
]

export default function HivarPage() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [file, setFile] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    descricao: "",
    categoria: "",
    isbn: "",
    anoPublicacao: "",
  })

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
    maxSize: 100 * 1024 * 1024, // 100MB
  })

  const handleSearchGoogleBooks = async () => {
    if (!formData.titulo && !formData.isbn) {
      toast({
        title: "Preencha o título ou ISBN",
        description: "Informe o título ou ISBN para buscar informações.",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    // Simulate API call to Google Books
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock data - in real app, this would come from API
    setFormData((prev) => ({
      ...prev,
      autor: prev.autor || "Autor encontrado",
      anoPublicacao: prev.anoPublicacao || "2023",
    }))
    setCoverImage("/book-cover-found.jpg")

    toast({
      title: "Informações encontradas!",
      description: "Dados preenchidos automaticamente.",
    })
    setIsSearching(false)
  }

  const handleNext = () => {
    if (currentStep === 1 && !file) {
      toast({
        title: "Arquivo obrigatório",
        description: "Envie um arquivo antes de continuar.",
        variant: "destructive",
      })
      return
    }

    if (currentStep === 2 && (!formData.titulo || !formData.categoria)) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha título e categoria.",
        variant: "destructive",
      })
      return
    }

    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Obra Hivada com sucesso! 🎉",
      description: "Sua contribuição está disponível na colmeia.",
    })

    // Reset form
    setFile(null)
    setCoverImage(null)
    setFormData({
      titulo: "",
      autor: "",
      descricao: "",
      categoria: "",
      isbn: "",
      anoPublicacao: "",
    })
    setCurrentStep(1)
    setIsSubmitting(false)
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
          Compartilhe conhecimento com a colmeia. Envie seus materiais de estudo e ajude outros Hivers em sua jornada
          acadêmica.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors",
                  currentStep >= step.id ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground",
                )}
              >
                {currentStep > step.id ? <Check size={20} /> : step.id}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-sm font-medium",
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground hidden sm:block">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn("w-16 md:w-24 h-1 mx-4 rounded", currentStep > step.id ? "bg-accent" : "bg-secondary")}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="bg-card border-border">
        <CardContent className="p-6 md:p-8">
          {/* Step 1: File Upload */}
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
                    <p className="text-sm text-muted-foreground mt-1">PDF ou EPUB até 100MB</p>
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

          {/* Step 2: Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Google Books Search */}
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
                {/* Cover Preview */}
                <div className="space-y-4">
                  <Label>Capa da Obra</Label>
                  <div className="aspect-[3/4] rounded-lg bg-secondary border border-border overflow-hidden flex items-center justify-center">
                    {coverImage ? (
                      <img src={coverImage || "/placeholder.svg"} alt="Capa" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Capa será preenchida automaticamente</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título *</Label>
                    <Input
                      id="titulo"
                      placeholder="Nome da obra"
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      className="bg-secondary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="autor">Autor</Label>
                    <Input
                      id="autor"
                      placeholder="Nome do autor"
                      value={formData.autor}
                      onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
                      className="bg-secondary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria *</Label>
                    <Select
                      value={formData.categoria}
                      onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                    >
                      <SelectTrigger className="bg-secondary">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="isbn">ISBN</Label>
                      <Input
                        id="isbn"
                        placeholder="978-XX-XXXX-XXX-X"
                        value={formData.isbn}
                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                        className="bg-secondary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ano">Ano</Label>
                      <Input
                        id="ano"
                        placeholder="2024"
                        value={formData.anoPublicacao}
                        onChange={(e) => setFormData({ ...formData, anoPublicacao: e.target.value })}
                        className="bg-secondary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva brevemente o conteúdo da obra..."
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="bg-secondary min-h-[120px]"
                />
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold">Revise sua obra</h2>
                <p className="text-muted-foreground">Confira as informações antes de hivar</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Cover */}
                <div className="aspect-[3/4] rounded-lg bg-secondary border border-border overflow-hidden">
                  {coverImage ? (
                    <img src={coverImage || "/placeholder.svg"} alt="Capa" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Título</p>
                    <p className="font-semibold text-lg">{formData.titulo || "Não informado"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Autor</p>
                    <p className="font-medium">{formData.autor || "Não informado"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Categoria</p>
                      <p className="font-medium capitalize">{formData.categoria || "Não informada"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ano</p>
                      <p className="font-medium">{formData.anoPublicacao || "Não informado"}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Arquivo</p>
                    <p className="font-medium">
                      {file?.name} ({file && formatFileSize(file.size)})
                    </p>
                  </div>
                  {formData.descricao && (
                    <div>
                      <p className="text-sm text-muted-foreground">Descrição</p>
                      <p className="text-sm">{formData.descricao}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-2 bg-transparent"
            >
              <ChevronLeft size={16} />
              Voltar
            </Button>

            {currentStep < 3 ? (
              <Button onClick={handleNext} className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                Próximo
                <ChevronRight size={16} />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Hivando...
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    Hivar Obra
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
