import api from './api';
import { ENDPOINTS } from '../config/apiConfig';

// Material Service
export const materialService = {
  // Get all materials (optionally by project)
  getAll: (params = {}) => api.get(ENDPOINTS.MATERIALS.LIST, { params }),

  // Get materials for a specific project
  getByProject: (projectId) => api.get(ENDPOINTS.MATERIALS.BY_PROJECT(projectId)),

  // Add material to a project
  addToProject: (projectId, data) => api.post(ENDPOINTS.MATERIALS.BY_PROJECT(projectId), data),

  // Remove material from a project
  removeFromProject: (projectId, materialId) => api.delete(ENDPOINTS.MATERIALS.REMOVE(projectId, materialId)),

  // Update material for a project
  updateForProject: (projectId, materialId, data) => api.put(ENDPOINTS.MATERIALS.UPDATE(projectId, materialId), data),
};

export default materialService;
