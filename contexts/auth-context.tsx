"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  nome: string
  email: string
  username: string
  avatar?: string
  bio?: string
  role: "USER" | "ADMIN"
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

interface RegisterData {
  nome: string
  email: string
  username: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored auth token and validate
    const checkAuth = async () => {
      const token = localStorage.getItem("hive_token")
      if (token) {
        try {
          // Simulate API call to validate token and get user
          const storedUser = localStorage.getItem("hive_user")
          if (storedUser) {
            setUser(JSON.parse(storedUser))
          }
        } catch {
          localStorage.removeItem("hive_token")
          localStorage.removeItem("hive_user")
        }
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call - replace with actual API
      // const response = await fetch('/api/auth/autenticar', { ... })

      // Mock successful login
      const mockUser: User = {
        id: "1",
        nome: "Hiver Demo",
        email,
        username: "hiverdemo",
        avatar: "/diverse-user-avatars.png",
        bio: "Apaixonado por compartilhar conhecimento 📚",
        role: "USER",
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem("hive_token", "mock_jwt_token")
      localStorage.setItem("hive_user", JSON.stringify(mockUser))
      setUser(mockUser)
      router.push("/feed")
    } catch (error) {
      throw new Error("Credenciais inválidas")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegisterData) => {
    setIsLoading(true)
    try {
      // Simulate API call - replace with actual API
      // const response = await fetch('/api/usuarios/registrar', { ... })

      const mockUser: User = {
        id: "1",
        nome: data.nome,
        email: data.email,
        username: data.username,
        role: "USER",
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem("hive_token", "mock_jwt_token")
      localStorage.setItem("hive_user", JSON.stringify(mockUser))
      setUser(mockUser)
      router.push("/feed")
    } catch (error) {
      throw new Error("Erro ao criar conta")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("hive_token")
    localStorage.removeItem("hive_user")
    setUser(null)
    router.push("/")
  }

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      localStorage.setItem("hive_user", JSON.stringify(updatedUser))
      setUser(updatedUser)
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
