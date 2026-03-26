// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || '/api',
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
}

// API Endpoints
export const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me',
  },
  
  // Projects
  PROJECTS: {
    LIST: '/projects',
    DETAIL: (id) => `/projects/${id}`,
    CREATE: '/projects',
    UPDATE: (id) => `/projects/${id}`,
    DELETE: (id) => `/projects/${id}`,
    TEAM: (id) => `/projects/${id}/team`,
    ADD_TEAM_MEMBER: (id) => `/projects/${id}/team`,
    REMOVE_TEAM_MEMBER: (id, userId) => `/projects/${id}/team/${userId}`,
    TIMELINE: (id) => `/projects/${id}/timeline`,
    DOCUMENTS: (id) => `/projects/${id}/documents`,
    PROGRESS: (id) => `/projects/${id}/progress`,
    MILESTONES: (id) => `/projects/${id}/milestones`,
    SITE_REPORTS: (id) => `/projects/${id}/site-reports`,
  },
  
  // Progress
  PROGRESS: {
    CREATE: (projectId) => `/projects/${projectId}/progress`,
    UPDATE: (id) => `/progress/${id}`,
    DELETE: (id) => `/progress/${id}`,
  },
  
  // Milestones
  MILESTONES: {
    CREATE: (projectId) => `/projects/${projectId}/milestones`,
    UPDATE: (id) => `/milestones/${id}`,
    DELETE: (id) => `/milestones/${id}`,
  },
  
  // Documents
  DOCUMENTS: {
    LIST: '/documents',
    DETAIL: (id) => `/documents/${id}`,
    UPLOAD: '/documents',
    UPDATE: (id) => `/documents/${id}`,
    DELETE: (id) => `/documents/${id}`,
    DOWNLOAD: (id) => `/documents/${id}/download`,
    CATEGORIES: '/documents/categories',
  },
  
  // Site Reports
  SITE_REPORTS: {
    LIST: '/site-reports',
    DETAIL: (id) => `/site-reports/${id}`,
    CREATE: '/site-reports',
    UPDATE: (id) => `/site-reports/${id}`,
    DELETE: (id) => `/site-reports/${id}`,
  },
  
  // Clients
  CLIENTS: {
    LIST: '/clients',
    DETAIL: (id) => `/clients/${id}`,
    CREATE: '/clients',
    UPDATE: (id) => `/clients/${id}`,
    DELETE: (id) => `/clients/${id}`,
    PROJECTS: (id) => `/clients/${id}/projects`,
  },
  
  // Reports
  REPORTS: {
    DASHBOARD: '/reports/dashboard',
    PROJECTS: '/reports/projects',
    PROGRESS: '/reports/progress',
    PERFORMANCE: '/reports/performance',
    GENERATE: '/reports/generate',
    EXPORT: (id) => `/reports/${id}/export`,
  },
  
  // Users
  USERS: {
    LIST: '/users',
    DETAIL: (id) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
    UPDATE_ROLE: (id) => `/users/${id}/role`,
    UPDATE_STATUS: (id) => `/users/${id}/status`,
    ACTIVITY: (id) => `/users/${id}/activity`,
  },
  
  // Settings
  SETTINGS: {
    GET: '/settings',
    UPDATE: '/settings',
    COMPANY: '/settings/company',
    BACKUP: '/settings/backup',
    RESTORE: '/settings/restore',
  },
}

// Default pagination
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
}

// Upload configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ],
}

