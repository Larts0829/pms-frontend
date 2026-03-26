import api from './api'
import { ENDPOINTS } from '../config/apiConfig'

// User Service (Admin only)
export const userService = {
  // Get all users
  getAll: (params = {}) => api.get(ENDPOINTS.USERS.LIST, { params }),
  
  // Get user by ID
  getById: (id) => api.get(ENDPOINTS.USERS.DETAIL(id)),
  
  // Create user
  create: (data) => api.post(ENDPOINTS.USERS.CREATE, data),
  
  // Update user
  update: (id, data) => api.put(ENDPOINTS.USERS.UPDATE(id), data),
  
  // Delete user
  delete: (id) => api.delete(ENDPOINTS.USERS.DELETE(id)),
  
  // Update user role
  updateRole: (id, role) => api.put(ENDPOINTS.USERS.UPDATE_ROLE(id), { role }),
  
  // Update user status (activate/deactivate)
  updateStatus: (id, status) => 
    api.put(ENDPOINTS.USERS.UPDATE_STATUS(id), { status }),
  
  // Get user activity log
  getActivity: (id, params = {}) => 
    api.get(ENDPOINTS.USERS.ACTIVITY(id), { params }),
}

export default userService

