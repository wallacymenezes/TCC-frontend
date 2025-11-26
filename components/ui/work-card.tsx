"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, Download, BookOpen } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Rating } from "@/components/ui/rating"
import { cn } from "@/lib/utils"

export interface Work {
  id: string
  titulo: string
  autor: string
  capa?: string
  categoria: string
  nota: number
  totalAvaliacoes: number
  curtidas: number
  downloads: number
  usuario: {
    id: string
    nome: string
    username: string
    avatar?: string
  }
  createdAt: string
}

interface WorkCardProps {
  work: Work
  className?: string
  variant?: "default" | "compact"
}

export function WorkCard({ work, className, variant = "default" }: WorkCardProps) {
  const isCompact = variant === "compact"

  return (
    <Card
      className={cn(
        "group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300",
        className,
      )}
    >
      <Link href={`/obra/${work.id}`}>
        <div className={cn("relative overflow-hidden bg-secondary", isCompact ? "aspect-3/4" : "aspect-4/5")}>
          {work.capa ? (
            <Image
              src={work.capa || "/placeholder.svg"}
              alt={work.titulo}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{work.categoria}</Badge>
        </div>
      </Link>

      <CardContent className={cn("p-4", isCompact && "p-3")}>
        <Link href={`/obra/${work.id}`}>
          <h3
            className={cn(
              "font-heading font-semibold text-foreground line-clamp-2 hover:text-accent transition-colors",
              isCompact ? "text-sm" : "text-base",
            )}
          >
            {work.titulo}
          </h3>
        </Link>
        <p className={cn("text-muted-foreground mt-1 line-clamp-1", isCompact ? "text-xs" : "text-sm")}>
          por {work.autor}
        </p>

        <div className="flex items-center gap-2 mt-3">
          <Rating value={work.nota} size="sm" />
          <span className="text-xs text-muted-foreground">({work.totalAvaliacoes})</span>
        </div>
      </CardContent>

      <CardFooter className={cn("px-4 pb-4 pt-0 flex items-center justify-between", isCompact && "px-3 pb-3")}>
        <Link
          href={`/perfil/${work.usuario.username}`}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Avatar className={cn("border border-border", isCompact ? "h-6 w-6" : "h-7 w-7")}>
            <AvatarImage src={work.usuario.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
              {work.usuario.nome.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className={cn("text-muted-foreground", isCompact ? "text-xs" : "text-sm")}>
            @{work.usuario.username}
          </span>
        </Link>

        <div className="flex items-center gap-3 text-muted-foreground">
          <button className="flex items-center gap-1 hover:text-accent transition-colors">
            <Heart size={isCompact ? 14 : 16} />
            <span className={cn(isCompact ? "text-xs" : "text-sm")}>{work.curtidas}</span>
          </button>
          <div className="flex items-center gap-1">
            <Download size={isCompact ? 14 : 16} />
            <span className={cn(isCompact ? "text-xs" : "text-sm")}>{work.downloads}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
