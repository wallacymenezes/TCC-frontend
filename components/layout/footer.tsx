import Link from "next/link"
import { HiveIcon } from "@/components/icons/hexagon-logo"
import { Github, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <HiveIcon size={28} className="text-accent" />
              <span className="font-heading text-lg font-semibold">HiveBooks</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Compartilhe o conhecimento e construa uma colmeia. Democratizando o acesso à informação no ensino
              superior.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold">Plataforma</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/explorar" className="hover:text-foreground transition-colors">
                  Explorar Obras
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="hover:text-foreground transition-colors">
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/hivar" className="hover:text-foreground transition-colors">
                  Hivar uma Obra
                </Link>
              </li>
              <li>
                <Link href="/ranking" className="hover:text-foreground transition-colors">
                  Ranking
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold">Suporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/ajuda" className="hover:text-foreground transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-foreground transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/reportar" className="hover:text-foreground transition-colors">
                  Reportar Problema
                </Link>
              </li>
              <li>
                <Link href="/sugestoes" className="hover:text-foreground transition-colors">
                  Sugestões
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/termos" className="hover:text-foreground transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-foreground transition-colors">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="/diretrizes" className="hover:text-foreground transition-colors">
                  Diretrizes
                </Link>
              </li>
              <li>
                <Link href="/licencas" className="hover:text-foreground transition-colors">
                  Licenças
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HiveBooks. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">Feito com 💛 para a comunidade acadêmica</p>
        </div>
      </div>
    </footer>
  )
}
