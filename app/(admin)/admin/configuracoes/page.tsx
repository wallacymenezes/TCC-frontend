"use client"

import { useState } from "react"
import { Save, Globe, Bell, Shield, Database, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function AdminConfiguracoesPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [settings, setSettings] = useState({
    siteName: "HiveBooks",
    siteDescription: "Plataforma acadêmica colaborativa",
    contactEmail: "contato@hivebooks.com",
    maxFileSize: "100",
    allowedFormats: "pdf,epub",
    requireApproval: true,
    enableNotifications: true,
    maintenanceMode: false,
    allowRegistration: true,
  })

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast({
      title: "Configurações salvas!",
      description: "As alterações foram aplicadas com sucesso.",
    })
    setIsLoading(false)
  }

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Configurações gerais da plataforma</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Salvar alterações
        </Button>
      </div>

      <div className="space-y-8">
        {/* General Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe size={20} className="text-accent" />
              Configurações Gerais
            </CardTitle>
            <CardDescription>Informações básicas da plataforma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nome do Site</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="bg-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">E-mail de Contato</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="bg-secondary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Descrição</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="bg-secondary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Upload Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database size={20} className="text-accent" />
              Configurações de Upload
            </CardTitle>
            <CardDescription>Regras para envio de arquivos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxFileSize">Tamanho Máximo (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => setSettings({ ...settings, maxFileSize: e.target.value })}
                  className="bg-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowedFormats">Formatos Permitidos</Label>
                <Input
                  id="allowedFormats"
                  value={settings.allowedFormats}
                  onChange={(e) => setSettings({ ...settings, allowedFormats: e.target.value })}
                  className="bg-secondary"
                  placeholder="pdf,epub,doc"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Aprovação obrigatória</p>
                <p className="text-sm text-muted-foreground">
                  Novas obras precisam de aprovação antes de ficarem visíveis
                </p>
              </div>
              <Switch
                checked={settings.requireApproval}
                onCheckedChange={(checked) => setSettings({ ...settings, requireApproval: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} className="text-accent" />
              Notificações
            </CardTitle>
            <CardDescription>Configurações de notificações do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificações por e-mail</p>
                <p className="text-sm text-muted-foreground">Enviar e-mails de notificação para usuários</p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, enableNotifications: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={20} className="text-accent" />
              Segurança
            </CardTitle>
            <CardDescription>Configurações de segurança e acesso</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Permitir novos cadastros</p>
                <p className="text-sm text-muted-foreground">Novos usuários podem se cadastrar na plataforma</p>
              </div>
              <Switch
                checked={settings.allowRegistration}
                onCheckedChange={(checked) => setSettings({ ...settings, allowRegistration: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-yellow-500">Modo de Manutenção</p>
                <p className="text-sm text-muted-foreground">Apenas administradores podem acessar o site</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
