import api from './api'
import { ENDPOINTS } from '../config/apiConfig'

// Client Service
export const clientService = {
  // Get all clients
  getAll: (params = {}) => api.get(ENDPOINTS.CLIENTS.LIST, { params }),
  
  // Get client by ID
  getById: (id) => api.get(ENDPOINTS.CLIENTS.DETAIL(id)),
  
  // Create client
  create: (data) => api.post(ENDPOINTS.CLIENTS.CREATE, data),
  
  // Update client
  update: (id, data) => api.put(ENDPOINTS.CLIENTS.UPDATE(id), data),
  
  // Delete client
  delete: (id) => api.delete(ENDPOINTS.CLIENTS.DELETE(id)),
  
  // Get client projects
  getProjects: (id, params = {}) => 
    api.get(ENDPOINTS.CLIENTS.PROJECTS(id), { params }),
}

export default clientService

