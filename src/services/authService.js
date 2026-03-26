import api from './api'
import { ENDPOINTS } from '../config/apiConfig'

// Auth Service
export const authService = {
  login: (credentials) => api.post(ENDPOINTS.AUTH.LOGIN, credentials),
  logout: () => api.post(ENDPOINTS.AUTH.LOGOUT),
  refreshToken: (refreshToken) => api.post(ENDPOINTS.AUTH.REFRESH, { refreshToken }),
  forgotPassword: (email) => api.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }),
  resetPassword: (data) => api.post(ENDPOINTS.AUTH.RESET_PASSWORD, data),
  getCurrentUser: () => api.get(ENDPOINTS.AUTH.ME),
}

export default authService

