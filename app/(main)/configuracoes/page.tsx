"use client"

import { useState } from "react"
import { User, Lock, Bell, Shield, Trash2, Save, Loader2, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function ConfiguracoesPage() {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [profileData, setProfileData] = useState({
    nome: user?.nome || "",
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    likes: true,
    comments: true,
    downloads: false,
    newsletter: true,
  })

  const handleSaveProfile = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    updateUser(profileData)
    toast({
      title: "Perfil atualizado!",
      description: "Suas alterações foram salvas com sucesso.",
    })
    setIsLoading(false)
  }

  return (
    <div className="container max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-muted-foreground">Gerencie sua conta e preferências</p>
      </div>

      <Tabs defaultValue="perfil" className="space-y-8">
        <TabsList className="bg-secondary w-full justify-start">
          <TabsTrigger value="perfil" className="gap-2">
            <User size={16} />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="gap-2">
            <Lock size={16} />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="gap-2">
            <Bell size={16} />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="privacidade" className="gap-2">
            <Shield size={16} />
            Privacidade
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="perfil">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
              <CardDescription>Atualize suas informações pessoais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl bg-accent text-accent-foreground">
                      {user?.nome?.charAt(0) || "H"}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-accent text-accent-foreground"
                  >
                    <Camera size={14} />
                  </Button>
                </div>
                <div>
                  <p className="font-medium">Foto de perfil</p>
                  <p className="text-sm text-muted-foreground">JPG, PNG ou GIF. Máximo 2MB.</p>
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome completo</Label>
                    <Input
                      id="nome"
                      value={profileData.nome}
                      onChange={(e) => setProfileData({ ...profileData, nome: e.target.value })}
                      className="bg-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                      <Input
                        id="username"
                        value={profileData.username}
                        onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                        className="bg-secondary pl-8"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="bg-secondary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Conte um pouco sobre você..."
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="bg-secondary min-h-[100px]"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Salvar alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="seguranca">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Segurança da Conta</CardTitle>
              <CardDescription>Gerencie sua senha e segurança</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha atual</Label>
                  <Input id="current-password" type="password" className="bg-secondary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova senha</Label>
                  <Input id="new-password" type="password" className="bg-secondary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                  <Input id="confirm-password" type="password" className="bg-secondary" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Alterar senha</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notificacoes">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>Escolha como deseja ser notificado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações por e-mail</p>
                    <p className="text-sm text-muted-foreground">Receba atualizações importantes por e-mail</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Curtidas em suas obras</p>
                    <p className="text-sm text-muted-foreground">Quando alguém curtir suas obras</p>
                  </div>
                  <Switch
                    checked={notifications.likes}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, likes: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Comentários e avaliações</p>
                    <p className="text-sm text-muted-foreground">Quando alguém avaliar suas obras</p>
                  </div>
                  <Switch
                    checked={notifications.comments}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, comments: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Downloads</p>
                    <p className="text-sm text-muted-foreground">Quando alguém baixar suas obras</p>
                  </div>
                  <Switch
                    checked={notifications.downloads}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, downloads: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-muted-foreground">Novidades e dicas da HiveBooks</p>
                  </div>
                  <Switch
                    checked={notifications.newsletter}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newsletter: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacidade">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Privacidade</CardTitle>
              <CardDescription>Controle quem pode ver suas informações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Perfil público</p>
                    <p className="text-sm text-muted-foreground">Permitir que outros vejam seu perfil</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mostrar obras curtidas</p>
                    <p className="text-sm text-muted-foreground">Exibir obras que você curtiu no perfil</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mostrar estatísticas</p>
                    <p className="text-sm text-muted-foreground">Exibir contadores de downloads e curtidas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <div className="flex items-start gap-4">
                  <Trash2 className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive">Excluir conta</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Esta ação é irreversível. Todos os seus dados serão permanentemente removidos.
                    </p>
                    <Button variant="destructive" size="sm">
                      Excluir minha conta
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
