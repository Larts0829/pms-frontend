import api, { uploadFile, downloadFile } from './api'
import { ENDPOINTS } from '../config/apiConfig'

// Document Service
export const documentService = {
  // Get all documents with optional filters
  getAll: (params = {}) => api.get(ENDPOINTS.DOCUMENTS.LIST, { params }),
  
  // Get document by ID
  getById: (id) => api.get(ENDPOINTS.DOCUMENTS.DETAIL(id)),
  
  // Upload document
  upload: (file, metadata, onProgress) => {
    const formData = new FormData()
    formData.append('file', file)
    Object.entries(metadata).forEach(([key, value]) => {
      formData.append(key, value)
    })
    
    return api.post(ENDPOINTS.DOCUMENTS.UPLOAD, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress(percentCompleted)
        }
      },
    })
  },
  
  // Update document metadata
  update: (id, data) => api.put(ENDPOINTS.DOCUMENTS.UPDATE(id), data),
  
  // Delete document
  delete: (id) => api.delete(ENDPOINTS.DOCUMENTS.DELETE(id)),
  
  // Download document
  download: (id, filename) => downloadFile(ENDPOINTS.DOCUMENTS.DOWNLOAD(id), filename),
  
  // Get document categories
  getCategories: () => api.get(ENDPOINTS.DOCUMENTS.CATEGORIES),
}

export default documentService

