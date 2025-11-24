"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Tipos baseados no seu Backend DTOs
interface User {
  id: number // Backend usa Long (number)
  nome: string
  email: string
  fotoUrl?: string // Backend: fotoUrl
  descricao?: string // Backend: descricao
  perfis: string[] // Backend: Set<String>
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, senha: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateUser: (data: Partial<User>) => void
  token: string | null
}

interface RegisterData {
  nome: string
  email: string
  username: string // O backend atual usa email como username, mas podemos manter no front se quiser
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Função auxiliar para buscar dados do usuário logado
  const fetchUserProfile = async (accessToken: string) => {
    try {
      const response = await fetch(`${API_URL}/usuarios/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        logout()
      }
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("hive_token")
    if (storedToken) {
      setToken(storedToken)
      fetchUserProfile(storedToken).finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, senha: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/auth/autenticar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      })

      if (!response.ok) {
        throw new Error("Credenciais inválidas")
      }

      const data = await response.json() // LoginResponseDTO { accessToken, expiresIn }
      const accessToken = data.accessToken

      localStorage.setItem("hive_token", accessToken)
      setToken(accessToken)
      
      // Busca os dados completos do usuário após login
      await fetchUserProfile(accessToken)
      
      router.push("/feed")
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegisterData) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/usuarios/registrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.nome,
          email: data.email,
          senha: data.password, // Mapeando password -> senha
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erro ao criar conta")
      }

      // Após registrar, fazemos o login automático
      await login(data.email, data.password)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("hive_token")
    setToken(null)
    setUser(null)
    router.push("/login")
  }

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}