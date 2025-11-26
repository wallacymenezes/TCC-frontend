"use client"

import { useState, useEffect } from "react"
import { User, Lock, Save, Loader2, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function ConfiguracoesPage() {
  const { user, updateUser, token } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Profile State
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [previewFoto, setPreviewFoto] = useState("")
  const [fotoFile, setFotoFile] = useState<File | null>(null)

  // Password State
  const [senhaAtual, setSenhaAtual] = useState("")
  const [novaSenha, setNovaSenha] = useState("")

  useEffect(() => {
    if (user) {
      setNome(user.nome || "")
      setDescricao(user.descricao || "")
      setPreviewFoto(user.fotoUrl || "")
    }
  }, [user])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFotoFile(file)
      setPreviewFoto(URL.createObjectURL(file))
    }
  }

  const handleSaveProfile = async () => {
    if (!token) return
    setIsLoading(true)

    try {
      const formData = new FormData()
      // JSON part as 'dados'
      const dto = { nome, descricao }
      formData.append("dados", new Blob([JSON.stringify(dto)], { type: "application/json" }))
      
      // File part as 'foto'
      if (fotoFile) {
        formData.append("foto", fotoFile)
      }

      // Endpoint correto conforme UsuarioController.java
      const res = await fetch(`${API_URL}/usuarios/atualizar`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData // Content-Type é automático
      })

      if (!res.ok) throw new Error("Falha ao atualizar perfil")

      const updatedUser = await res.json()
      updateUser(updatedUser) // Atualiza contexto
      toast({ title: "Perfil atualizado com sucesso!" })
      
    } catch (error) {
      console.error(error)
      toast({ title: "Erro ao salvar", description: "Tente novamente.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (!token) return
    setIsLoading(true)
    try {
      const res = await fetch(`${API_URL}/usuarios/senha`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ senhaAtual, novaSenha })
      })

      if (res.ok) {
        toast({ title: "Senha alterada com sucesso!" })
        setSenhaAtual("")
        setNovaSenha("")
      } else {
        toast({ title: "Erro", description: "Senha atual incorreta.", variant: "destructive" })
      }
    } catch (error) {
        toast({ title: "Erro ao alterar senha", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl px-4 py-8">
      <h1 className="font-heading text-3xl font-bold mb-8">Configurações</h1>

      <Tabs defaultValue="perfil" className="space-y-8">
        <TabsList className="bg-secondary w-full justify-start">
          <TabsTrigger value="perfil" className="gap-2"><User size={16} /> Perfil</TabsTrigger>
          <TabsTrigger value="seguranca" className="gap-2"><Lock size={16} /> Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil">
          <Card className="bg-card border-border">
            <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <CardDescription>Atualize suas informações públicas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={previewFoto || "/placeholder-user.jpg"} className="object-cover" />
                    <AvatarFallback className="text-2xl">{nome.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <label htmlFor="foto-upload" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center cursor-pointer hover:bg-accent/90 shadow-lg">
                    <Camera size={14} />
                    <input id="foto-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                </div>
                <div>
                   <p className="font-medium">Foto de perfil</p>
                   <p className="text-sm text-muted-foreground">JPG ou PNG. Máx 5MB.</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                    <Label>Nome completo</Label>
                    <Input value={nome} onChange={(e) => setNome(e.target.value)} className="bg-secondary" />
                </div>
                <div className="space-y-2">
                    <Label>E-mail (não editável)</Label>
                    <Input value={user?.email} disabled className="bg-secondary/50 opacity-70" />
                </div>
                <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} className="bg-secondary min-h-[100px]" placeholder="Conte um pouco sobre você..." />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} disabled={isLoading} className="bg-accent text-accent-foreground">
                  {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Save size={16} className="mr-2" />} Salvar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca">
          <Card className="bg-card border-border">
            <CardHeader>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>Altere sua senha de acesso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Senha atual</Label>
                  <Input type="password" value={senhaAtual} onChange={e => setSenhaAtual(e.target.value)} className="bg-secondary" />
                </div>
                <div className="space-y-2">
                  <Label>Nova senha</Label>
                  <Input type="password" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} className="bg-secondary" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleChangePassword} disabled={isLoading || !senhaAtual || !novaSenha} className="bg-accent text-accent-foreground">
                   Alterar senha
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}