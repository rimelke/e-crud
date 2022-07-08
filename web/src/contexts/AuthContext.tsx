import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext
} from 'react'
import useCookieState from '../hooks/useCookieState'

export interface IAuthContextData {
  isAuthenticated: boolean
  logout: () => void
  setToken: (token: string) => void
}

export const AuthContext = createContext({} as IAuthContextData)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useCookieState('token')

  const logout = useCallback(() => {
    setToken(undefined)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        logout,
        setToken
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
