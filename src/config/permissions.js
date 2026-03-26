// User Roles
export const ROLES = {
  ADMIN: 'admin',
  PROJECT_ENGINEER: 'project_engineer',
  OPERATIONS_STAFF: 'operations_staff',
  VIEWER: 'viewer',
}

// Role Display Names
export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.PROJECT_ENGINEER]: 'Project Engineer',
  [ROLES.OPERATIONS_STAFF]: 'Operations Staff',
  [ROLES.VIEWER]: 'Client / Viewer',
}

// Module Permissions
export const MODULES = {
  DASHBOARD: 'dashboard',
  PROJECTS: 'projects',
  PROGRESS: 'progress',
  SITE_REPORTS: 'site_reports',
  DOCUMENTS: 'documents',
  CLIENTS: 'clients',
  REPORTS: 'reports',
  USERS: 'users',
  SETTINGS: 'settings',
}

// Actions
export const ACTIONS = {
  VIEW: 'view',
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete',
  UPLOAD: 'upload',
  EXPORT: 'export',
  MANAGE: 'manage',
  REQUEST: 'request',
  PROCURE: 'procure',
}

// Permission Matrix
export const PERMISSIONS = {
  [ROLES.ADMIN]: {
    [MODULES.DASHBOARD]: [ACTIONS.VIEW],
    [MODULES.PROJECTS]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE],
    [MODULES.PROGRESS]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE],
    [MODULES.SITE_REPORTS]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE, ACTIONS.UPLOAD],
    [MODULES.DOCUMENTS]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE, ACTIONS.UPLOAD],
    [MODULES.CLIENTS]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE],
    [MODULES.REPORTS]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EXPORT],
    [MODULES.USERS]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE, ACTIONS.MANAGE],
    [MODULES.SETTINGS]: [ACTIONS.VIEW, ACTIONS.MANAGE],
  },
  [ROLES.PROJECT_ENGINEER]: {
    [MODULES.DASHBOARD]: [ACTIONS.VIEW],
    [MODULES.PROJECTS]: [ACTIONS.VIEW], // Assigned projects only
    [MODULES.PROGRESS]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT],
    [MODULES.SITE_REPORTS]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.UPLOAD],
    [MODULES.DOCUMENTS]: [ACTIONS.VIEW, ACTIONS.UPLOAD, ACTIONS.REQUEST], // Material requests
    [MODULES.CLIENTS]: [],
    [MODULES.REPORTS]: [ACTIONS.VIEW, ACTIONS.EXPORT],
    [MODULES.USERS]: [],
    [MODULES.SETTINGS]: [],
  },
  [ROLES.OPERATIONS_STAFF]: {
    [MODULES.DASHBOARD]: [ACTIONS.VIEW],
    [MODULES.PROJECTS]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT],
    [MODULES.PROGRESS]: [ACTIONS.VIEW],
    [MODULES.SITE_REPORTS]: [ACTIONS.VIEW],
    [MODULES.DOCUMENTS]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.UPLOAD, ACTIONS.DELETE, ACTIONS.PROCURE], // Procurement and delivery tracking
    [MODULES.CLIENTS]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT],
    [MODULES.REPORTS]: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EXPORT],
    [MODULES.USERS]: [],
    [MODULES.SETTINGS]: [],
  },
  [ROLES.VIEWER]: {
    [MODULES.DASHBOARD]: [ACTIONS.VIEW],
    [MODULES.PROJECTS]: [ACTIONS.VIEW], // Own project only
    [MODULES.PROGRESS]: [ACTIONS.VIEW], // Own project only
    [MODULES.SITE_REPORTS]: [ACTIONS.VIEW], // Own project only
    [MODULES.DOCUMENTS]: [ACTIONS.VIEW], // Shared documents only
    [MODULES.CLIENTS]: [],
    [MODULES.REPORTS]: [ACTIONS.VIEW, ACTIONS.EXPORT],
    [MODULES.USERS]: [],
    [MODULES.SETTINGS]: [],
  },
}

/**
 * Check if a role has permission for a specific action on a module
 * @param {string} role - User role
 * @param {string} module - Module name
 * @param {string} action - Action to check
 * @returns {boolean}
 */
export const hasPermission = (role, module, action) => {
  const rolePermissions = PERMISSIONS[role]
  if (!rolePermissions) return false
  
  const modulePermissions = rolePermissions[module]
  if (!modulePermissions) return false
  
  return modulePermissions.includes(action)
}

/**
 * Check if a role can access a module (has any permission)
 * @param {string} role - User role
 * @param {string} module - Module name
 * @returns {boolean}
 */
export const canAccessModule = (role, module) => {
  const rolePermissions = PERMISSIONS[role]
  if (!rolePermissions) return false
  
  const modulePermissions = rolePermissions[module]
  return modulePermissions && modulePermissions.length > 0
}

/**
 * Get all permissions for a role
 * @param {string} role - User role
 * @returns {Object}
 */
export const getRolePermissions = (role) => {
  return PERMISSIONS[role] || {}
}

/**
 * Check if role is admin
 * @param {string} role - User role
 * @returns {boolean}
 */
export const isAdmin = (role) => role === ROLES.ADMIN

