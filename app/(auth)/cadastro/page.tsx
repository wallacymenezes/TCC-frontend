"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Eye, EyeOff, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

interface RegisterForm {
  nome: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

export default function CadastroPage() {
  const { register: registerUser, isLoading } = useAuth()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>()
  const password = watch("password")

  const onSubmit = async (data: RegisterForm) => {
    if (!acceptedTerms) {
      toast({
        title: "Termos obrigatórios",
        description: "Você precisa aceitar os termos de uso.",
        variant: "destructive",
      })
      return
    }

    try {
      await registerUser({
        nome: data.nome,
        email: data.email,
        username: data.username,
        password: data.password,
      })
      toast({
        title: "Bem-vindo à colmeia!",
        description: "Sua conta foi criada com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao criar conta",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  const passwordRequirements = [
    { label: "Mínimo 8 caracteres", met: password?.length >= 8 },
    { label: "Pelo menos uma letra maiúscula", met: /[A-Z]/.test(password || "") },
    { label: "Pelo menos um número", met: /[0-9]/.test(password || "") },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold">Criar conta</h1>
        <p className="text-muted-foreground">Junte-se à colmeia e comece a compartilhar conhecimento</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome completo</Label>
          <Input
            id="nome"
            placeholder="Seu nome"
            {...register("nome", {
              required: "Nome é obrigatório",
              minLength: {
                value: 3,
                message: "Nome deve ter no mínimo 3 caracteres",
              },
            })}
            className="bg-secondary"
          />
          {errors.nome && <p className="text-sm text-destructive">{errors.nome.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
            <Input
              id="username"
              placeholder="seunome"
              {...register("username", {
                required: "Username é obrigatório",
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: "Username só pode conter letras, números e _",
                },
                minLength: {
                  value: 3,
                  message: "Username deve ter no mínimo 3 caracteres",
                },
              })}
              className="bg-secondary pl-8"
            />
          </div>
          {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register("email", {
              required: "E-mail é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "E-mail inválido",
              },
            })}
            className="bg-secondary"
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 8,
                  message: "Senha deve ter no mínimo 8 caracteres",
                },
              })}
              className="bg-secondary pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {password && (
            <div className="space-y-1 mt-2">
              {passwordRequirements.map((req, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <Check size={14} className={req.met ? "text-green-500" : "text-muted-foreground"} />
                  <span className={req.met ? "text-green-500" : "text-muted-foreground"}>{req.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar senha</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword", {
              required: "Confirmação é obrigatória",
              validate: (value) => value === password || "Senhas não conferem",
            })}
            className="bg-secondary"
          />
          {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={acceptedTerms}
            onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
          />
          <label
            htmlFor="terms"
            className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Aceito os{" "}
            <Link href="/termos" className="text-accent hover:underline">
              termos de uso
            </Link>{" "}
            e a{" "}
            <Link href="/privacidade" className="text-accent hover:underline">
              política de privacidade
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Criando conta...
            </>
          ) : (
            "Criar conta"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Já tem uma conta?{" "}
        <Link href="/login" className="text-accent hover:underline font-medium">
          Entrar
        </Link>
      </p>
    </div>
  )
}
