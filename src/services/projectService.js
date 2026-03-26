import api, { uploadFile } from './api'
import { ENDPOINTS } from '../config/apiConfig'

// Project Service
export const projectService = {
  // Get all projects with optional filters
  getAll: (params = {}) => api.get(ENDPOINTS.PROJECTS.LIST, { params }),
  
  // Get project by ID
  getById: (id) => api.get(ENDPOINTS.PROJECTS.DETAIL(id)),
  
  // Create new project
  create: (data) => api.post(ENDPOINTS.PROJECTS.CREATE, data),
  
  // Update project
  update: (id, data) => api.put(ENDPOINTS.PROJECTS.UPDATE(id), data),
  
  // Delete project
  delete: (id) => api.delete(ENDPOINTS.PROJECTS.DELETE(id)),
  
  // Get project team
  getTeam: (id) => api.get(ENDPOINTS.PROJECTS.TEAM(id)),
  
  // Add team member
  addTeamMember: (projectId, userId, role) => 
    api.post(ENDPOINTS.PROJECTS.ADD_TEAM_MEMBER(projectId), { userId, role }),
  
  // Remove team member
  removeTeamMember: (projectId, userId) => 
    api.delete(ENDPOINTS.PROJECTS.REMOVE_TEAM_MEMBER(projectId, userId)),
  
  // Get project timeline
  getTimeline: (id) => api.get(ENDPOINTS.PROJECTS.TIMELINE(id)),
  
  // Get project documents
  getDocuments: (id, params = {}) => 
    api.get(ENDPOINTS.PROJECTS.DOCUMENTS(id), { params }),
  
  // Get project progress
  getProgress: (id) => api.get(ENDPOINTS.PROJECTS.PROGRESS(id)),
  
  // Get project milestones
  getMilestones: (id) => api.get(ENDPOINTS.PROJECTS.MILESTONES(id)),
  
  // Get project site reports
  getSiteReports: (id, params = {}) => 
    api.get(ENDPOINTS.PROJECTS.SITE_REPORTS(id), { params }),
}

// Progress Service
export const progressService = {
  // Create progress update
  create: (projectId, data) => 
    api.post(ENDPOINTS.PROGRESS.CREATE(projectId), data),
  
  // Update progress entry
  update: (id, data) => api.put(ENDPOINTS.PROGRESS.UPDATE(id), data),
  
  // Delete progress entry
  delete: (id) => api.delete(ENDPOINTS.PROGRESS.DELETE(id)),
}

// Milestone Service
export const milestoneService = {
  // Create milestone
  create: (projectId, data) => 
    api.post(ENDPOINTS.MILESTONES.CREATE(projectId), data),
  
  // Update milestone
  update: (id, data) => api.put(ENDPOINTS.MILESTONES.UPDATE(id), data),
  
  // Delete milestone
  delete: (id) => api.delete(ENDPOINTS.MILESTONES.DELETE(id)),
}

export default projectService

