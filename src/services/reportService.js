import api, { downloadFile } from './api'
import { ENDPOINTS } from '../config/apiConfig'

// Report Service
export const reportService = {
  // Get dashboard summary
  getDashboard: () => api.get(ENDPOINTS.REPORTS.DASHBOARD),
  
  // Get project reports
  getProjectReports: (params = {}) => 
    api.get(ENDPOINTS.REPORTS.PROJECTS, { params }),
  
  // Get progress reports
  getProgressReports: (params = {}) => 
    api.get(ENDPOINTS.REPORTS.PROGRESS, { params }),
  
  // Get performance reports
  getPerformanceReports: (params = {}) => 
    api.get(ENDPOINTS.REPORTS.PERFORMANCE, { params }),
  
  // Generate custom report
  generate: (config) => api.post(ENDPOINTS.REPORTS.GENERATE, config),
  
  // Export report
  export: (id, format = 'pdf') => {
    const filename = `report_${id}.${format}`
    return downloadFile(`${ENDPOINTS.REPORTS.EXPORT(id)}?format=${format}`, filename)
  },
}

export default reportService

