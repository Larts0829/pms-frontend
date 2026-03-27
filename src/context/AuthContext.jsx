import { createContext, useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../services/api'
import { ENDPOINTS } from '../config/apiConfig'

// Create the auth context
export const AuthContext = createContext(null)

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('accessToken'))
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const navigate = useNavigate()
  const location = useLocation()

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user

  // Initialize auth state from stored token
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('accessToken')
      
      if (storedToken) {
        // Demo mode: restore user from demo token (remove when backend is ready)
        if (storedToken.startsWith('demo-token-')) {
          const role = storedToken.replace('demo-token-', '')
          const demoUser = Object.values(DEMO_ACCOUNTS).find(u => u.role === role)
          if (demoUser) {
            const { password: _, ...userData } = demoUser
            setUser(userData)
            setToken(storedToken)
          } else {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
          }
          setIsLoading(false)
          return
        }

        try {
          // Fetch current user data
          const response = await api.get(ENDPOINTS.AUTH.ME)
          setUser(response.data.data.user)
          setToken(storedToken)
        } catch (err) {
          // Token is invalid, clear storage
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          setToken(null)
          setUser(null)
        }
      }
      
      setIsLoading(false)
    }

    initAuth()
  }, [])

  // Demo accounts for frontend-only testing (remove when backend is ready)
  const DEMO_ACCOUNTS = {
    'admin@westwoodpms.com': {
      id: 'user_001', firstName: 'Admin', lastName: 'User',
      email: 'admin@westwoodpms.com', role: 'admin',
      avatar: null, password: 'admin123', assignedProjectIds: ['prj_001', 'prj_002', 'prj_003', 'prj_004', 'prj_005'],
    },
    'engineer@westwoodpms.com': {
      id: 'user_002', firstName: 'Project', lastName: 'Engineer',
      email: 'engineer@westwoodpms.com', role: 'project_engineer',
      avatar: null, password: 'engineer123', assignedProjectIds: ['prj_001'],
    },
    'staff@westwoodpms.com': {
      id: 'user_003', firstName: 'Operations', lastName: 'Staff',
      email: 'staff@westwoodpms.com', role: 'operations_staff',
      avatar: null, password: 'staff123', assignedProjectIds: ['prj_001', 'prj_002', 'prj_003', 'prj_004', 'prj_005'],
    },
    'viewer@westwoodpms.com': {
      id: 'user_004', firstName: 'Client', lastName: 'Viewer',
      email: 'viewer@westwoodpms.com', role: 'viewer',
      avatar: null, password: 'viewer123', assignedProjectIds: ['prj_001'],
    },
  }

  // Login function
  const login = useCallback(async (email, password) => {
    try {
      setError(null)
      setIsLoading(true)

      // Demo mode: check demo accounts first (remove when backend is ready)
      const demoUser = DEMO_ACCOUNTS[email]
      if (demoUser && demoUser.password === password) {
        const demoToken = 'demo-token-' + demoUser.role
        localStorage.setItem('accessToken', demoToken)
        localStorage.setItem('refreshToken', 'demo-refresh-token')
        const { password: _, ...userData } = demoUser
        setUser(userData)
        setToken(demoToken)
        const from = location.state?.from?.pathname || '/dashboard'
        navigate(from, { replace: true })
        return { data: { user: userData } }
      }

      const response = await api.post(ENDPOINTS.AUTH.LOGIN, { email, password })
      const { user: userData, accessToken, refreshToken } = response.data.data
      
      // Store tokens
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      
      // Update state
      setUser(userData)
      setToken(accessToken)
      
      // Redirect to intended location or dashboard
      const from = location.state?.from?.pathname || '/dashboard'
      navigate(from, { replace: true })
      
      return response.data
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [navigate, location])

  // Logout function
  const logout = useCallback(async () => {
    try {
      await api.post(ENDPOINTS.AUTH.LOGOUT)
    } catch (err) {
      // Ignore logout errors
    } finally {
      // Clear storage and state
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      setUser(null)
      setToken(null)
      navigate('/login', { replace: true })
    }
  }, [navigate])

  // Forgot password function
  const forgotPassword = useCallback(async (email) => {
    try {
      setError(null)
      const response = await api.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email })
      return response.data
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to send reset email.'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [])

  // Reset password function
  const resetPassword = useCallback(async (token, password, confirmPassword) => {
    try {
      setError(null)
      const response = await api.post(ENDPOINTS.AUTH.RESET_PASSWORD, {
        token,
        password,
        confirmPassword,
      })
      return response.data
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to reset password.'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [])

  // Update user profile in state
  const updateUser = useCallback((updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }))
  }, [])

  // Clear errors
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Context value
  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateUser,
    clearError,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

