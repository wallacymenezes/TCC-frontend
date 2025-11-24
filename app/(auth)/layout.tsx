import type React from "react"
import { HiveIcon } from "@/components/icons/hexagon-logo"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hexagonal-pattern-dark-purple.jpg')] opacity-10" />
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          <Link href="/" className="absolute top-8 left-8 flex items-center gap-2">
            <HiveIcon size={40} className="text-accent" />
            <span className="font-heading text-2xl font-semibold text-primary-foreground">HiveBooks</span>
          </Link>

          <div className="max-w-md text-center">
            <HiveIcon size={100} className="text-accent mx-auto mb-8 animate-float" />
            <h1 className="font-heading text-4xl font-bold text-primary-foreground mb-4">Bem-vindo à colmeia</h1>
            <p className="text-primary-foreground/80 text-lg">
              Compartilhe o conhecimento e construa uma colmeia. Junte-se a milhares de estudantes transformando a
              educação.
            </p>
          </div>

          <div className="absolute bottom-8 left-8 right-8 flex justify-center gap-8 text-primary-foreground/60 text-sm">
            <span>10K+ Obras</span>
            <span>•</span>
            <span>5K+ Hivers</span>
            <span>•</span>
            <span>50K+ Downloads</span>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <HiveIcon size={32} className="text-accent" />
            <span className="font-heading text-xl font-semibold">HiveBooks</span>
          </Link>

          {children}
        </div>
      </div>
    </div>
  )
}
