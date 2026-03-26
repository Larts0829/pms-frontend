import api from './api'
import { ENDPOINTS } from '../config/apiConfig'

// Site Report Service
export const siteReportService = {
  // Get all site reports
  getAll: (params = {}) => api.get(ENDPOINTS.SITE_REPORTS.LIST, { params }),
  
  // Get site report by ID
  getById: (id) => api.get(ENDPOINTS.SITE_REPORTS.DETAIL(id)),
  
  // Create site report
  create: (data) => {
    const formData = new FormData()
    
    // Add text fields
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'photos' && Array.isArray(value)) {
        value.forEach((photo) => {
          formData.append('photos', photo)
        })
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value))
      } else {
        formData.append(key, value)
      }
    })
    
    return api.post(ENDPOINTS.SITE_REPORTS.CREATE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  
  // Update site report
  update: (id, data) => api.put(ENDPOINTS.SITE_REPORTS.UPDATE(id), data),
  
  // Delete site report
  delete: (id) => api.delete(ENDPOINTS.SITE_REPORTS.DELETE(id)),
}

export default siteReportService

