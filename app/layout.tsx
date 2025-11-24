import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "HiveBooks - Compartilhe o conhecimento e construa uma colmeia",
  description:
    "Plataforma acadêmica colaborativa para compartilhamento de materiais de estudo. Democratizando o acesso à informação no ensino superior.",
  keywords: ["livros", "acadêmico", "estudo", "PDF", "e-books", "resumos", "artigos", "universidade"],
  authors: [{ name: "HiveBooks" }],
  openGraph: {
    title: "HiveBooks",
    description: "Compartilhe o conhecimento e construa uma colmeia",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
