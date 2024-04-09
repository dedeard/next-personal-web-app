import React from 'react'
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { auth, getProviderById } from '@/utils/firebase'
import FIREBASE_ERRORS from '@/constans/firebase-errors'

interface AuthContextProps {
  user: User | null
  isAuthLoading: boolean
  isInitLoading: boolean
  error: string
  login: (id: 'github.com' | 'google.com') => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  isAuthLoading: false,
  isInitLoading: true,
  error: '',
  login: async () => {},
  logout: async () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [isInitLoading, setIsInitLoading] = React.useState(true)
  const [isAuthLoading, setIsAuthLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user)
      setIsInitLoading(false)
    })
  }, [])

  const login = async (id: 'github.com' | 'google.com') => {
    setIsAuthLoading(true)
    setError('')

    try {
      await signInWithPopup(auth, getProviderById(id))
    } catch (error: any) {
      setError(FIREBASE_ERRORS[error.code] || error.message)
    }

    setIsAuthLoading(false)
  }

  const logout = async () => {
    setIsAuthLoading(true)
    setError('')

    try {
      await signOut(auth)
    } catch (error: any) {
      setError(FIREBASE_ERRORS[error.code] || error.message)
    }

    setIsAuthLoading(false)
  }

  return <AuthContext.Provider value={{ user, isAuthLoading, isInitLoading, error, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => React.useContext(AuthContext)

export const useAuthIsAdmin = () => {
  const auth = useAuth()
  if (auth.user?.email === 'me@dedeard.my.id' || auth.user?.email === 'dedeariansya1@gmail.com') return true
  return false
}
