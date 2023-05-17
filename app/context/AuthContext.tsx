'use client'
import useAuth from '@/hooks/useAuth'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'

interface AuthContextProps {
  children: ReactNode
}
interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  city: string
  phone: string
}

interface State {
  loading: boolean
  error: string | null
  data: User | null
}

interface AuthState extends State {
  setAuthState: Dispatch<React.SetStateAction<State>>
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  error: null,
  data: null,
  setAuthState: () => {},
})
const AuthContext: FC<AuthContextProps> = ({ children }) => {
  const [authState, setAuthState] = useState<State>({
    loading: true,
    data: null,
    error: null,
  })
  const fetchUser = async () => {
    setAuthState({ data: null, error: null, loading: true })

    try {
      const jwt = getCookie('jwt')
      if (!jwt) {
        setAuthState({ data: null, error: null, loading: false })
      }
      const response = await axios.get('http://localhost:3000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`

      setAuthState({ data: response.data, error: null, loading: false })
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      })
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthContext
