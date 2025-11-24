"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { ArrowLeft, Loader2, Mail, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface RecoverForm {
  email: string
}

export default function RecuperarSenhaPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RecoverForm>()

  const onSubmit = async (data: RecoverForm) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setEmailSent(true)
      toast({
        title: "E-mail enviado!",
        description: "Verifique sua caixa de entrada.",
      })
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-bold">E-mail enviado!</h1>
          <p className="text-muted-foreground">
            Enviamos um link de recuperação para{" "}
            <span className="text-foreground font-medium">{getValues("email")}</span>
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Não recebeu? Verifique a pasta de spam ou{" "}
          <button onClick={() => setEmailSent(false)} className="text-accent hover:underline">
            tente novamente
          </button>
        </p>
        <Link href="/login">
          <Button variant="outline" className="gap-2 bg-transparent">
            <ArrowLeft size={16} />
            Voltar ao login
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Voltar ao login
      </Link>

      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold">Recuperar senha</h1>
        <p className="text-muted-foreground">Informe seu e-mail para receber um link de recuperação</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
              className="bg-secondary pl-10"
            />
          </div>
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar link de recuperação"
          )}
        </Button>
      </form>
    </div>
  )
}
