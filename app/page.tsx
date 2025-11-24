import Link from "next/link"
import { ArrowRight, BookOpen, Users, Upload, Star, Hexagon, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HiveIcon, HexagonLogo } from "@/components/icons/hexagon-logo"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <HiveIcon size={32} className="text-accent" />
            <span className="font-heading text-xl font-semibold">HiveBooks</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="/cadastro">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Começar agora</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 animate-float">
            <Hexagon size={60} className="text-accent" />
          </div>
          <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "1s" }}>
            <Hexagon size={40} className="text-primary" />
          </div>
          <div className="absolute bottom-40 left-1/4 animate-float" style={{ animationDelay: "2s" }}>
            <Hexagon size={80} className="text-accent" />
          </div>
          <div className="absolute bottom-20 right-1/3 animate-float" style={{ animationDelay: "0.5s" }}>
            <Hexagon size={50} className="text-primary" />
          </div>
        </div>

        <div className="container px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles size={16} className="text-accent" />
              <span className="text-sm text-muted-foreground">A nova era do conhecimento colaborativo</span>
            </div>

            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
              Compartilhe o conhecimento e <span className="text-accent">construa uma colmeia</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
              HiveBooks é a plataforma acadêmica colaborativa onde estudantes compartilham materiais de estudo,
              avaliações e constroem juntos o futuro da educação.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cadastro">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 w-full sm:w-auto"
                >
                  Junte-se à colmeia
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/explorar">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto bg-transparent">
                  Explorar obras
                  <BookOpen size={18} />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-heading font-bold text-accent">10K+</p>
                <p className="text-sm text-muted-foreground mt-1">Obras compartilhadas</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-heading font-bold text-accent">5K+</p>
                <p className="text-sm text-muted-foreground mt-1">Hivers ativos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-heading font-bold text-accent">50K+</p>
                <p className="text-sm text-muted-foreground mt-1">Downloads</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Por que fazer parte da <span className="text-accent">HiveBooks</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Uma plataforma pensada para democratizar o acesso ao conhecimento no ensino superior
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Como funciona a <span className="text-accent">colmeia</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Em poucos passos você já pode começar a compartilhar e acessar conhecimento
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground font-heading font-bold text-2xl flex items-center justify-center mx-auto mb-6">
                  {index + 1}
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container px-4 text-center">
          <HexagonLogo size={80} className="mx-auto mb-8 text-accent" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Pronto para se tornar um Hiver?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Junte-se a milhares de estudantes que já estão construindo a maior colmeia de conhecimento acadêmico do
            Brasil.
          </p>
          <Link href="/cadastro">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
              Criar minha conta grátis
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <HiveIcon size={24} className="text-accent" />
            <span className="font-heading font-semibold">HiveBooks</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HiveBooks. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    icon: BookOpen,
    title: "Biblioteca Colaborativa",
    description: "Acesse milhares de PDFs, e-books, resumos e artigos compartilhados pela comunidade.",
  },
  {
    icon: Upload,
    title: "Hive suas Obras",
    description: "Compartilhe seus materiais de estudo e ajude outros estudantes na jornada acadêmica.",
  },
  {
    icon: Star,
    title: "Avaliações Genuínas",
    description: "Encontre os melhores materiais através de avaliações e notas da comunidade.",
  },
  {
    icon: Users,
    title: "Comunidade Ativa",
    description: "Conecte-se com estudantes de todo o país e troque experiências de aprendizado.",
  },
]

const steps = [
  {
    title: "Crie sua conta",
    description: "Cadastre-se gratuitamente e personalize seu perfil de Hiver.",
  },
  {
    title: "Explore ou Hive",
    description: "Busque materiais de estudo ou compartilhe os seus com a comunidade.",
  },
  {
    title: "Avalie e conecte",
    description: "Avalie obras, curta conteúdos e conecte-se com outros Hivers.",
  },
]
