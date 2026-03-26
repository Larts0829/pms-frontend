import {
  LayoutDashboard,
  FolderKanban,
  TrendingUp,
  ClipboardList,
  FileText,
  Users,
  BarChart3,
  UserCog,
  Settings,
  Building2,
} from 'lucide-react'
import { ROLES, MODULES, canAccessModule } from './permissions'

// Menu item structure
const createMenuItem = (label, path, icon, module = null, children = null) => ({
  label,
  path,
  icon,
  module,
  children,
})

// Full navigation structure
export const FULL_MENU = [
  createMenuItem('Dashboard', '/dashboard', LayoutDashboard, MODULES.DASHBOARD),
  
  createMenuItem('Projects', '/projects', FolderKanban, MODULES.PROJECTS, [
    { label: 'All Projects', path: '/projects' },
    { label: 'Create Project', path: '/projects/create', roles: [ROLES.ADMIN, ROLES.OPERATIONS_STAFF] },
  ]),
  
  createMenuItem('Progress', '/progress', TrendingUp, MODULES.PROGRESS, [
    { label: 'Milestones', path: '/progress' },
    { label: 'Update Progress', path: '/progress/update', roles: [ROLES.ADMIN, ROLES.PROJECT_ENGINEER] },
  ]),
  
  createMenuItem('Site Reports', '/site-reports', ClipboardList, MODULES.SITE_REPORTS, [
    { label: 'All Reports', path: '/site-reports' },
    { label: 'Upload Report', path: '/site-reports/upload', roles: [ROLES.ADMIN, ROLES.PROJECT_ENGINEER] },
  ]),
  
  createMenuItem('Documents', '/documents', FileText, MODULES.DOCUMENTS, [
    { label: 'Document Library', path: '/documents' },
    { label: 'Upload Document', path: '/documents/upload', roles: [ROLES.ADMIN, ROLES.PROJECT_ENGINEER, ROLES.OPERATIONS_STAFF] },
    { label: 'Material Tracking', path: '/documents', roles: [ROLES.ADMIN, ROLES.OPERATIONS_STAFF] },
  ]),
  
  createMenuItem('Clients', '/clients', Building2, MODULES.CLIENTS, [
    { label: 'All Clients', path: '/clients' },
    { label: 'Add Client', path: '/clients/create', roles: [ROLES.ADMIN, ROLES.OPERATIONS_STAFF] },
  ]),
  
  createMenuItem('Reports', '/reports', BarChart3, MODULES.REPORTS),
  
  createMenuItem('Users', '/users', UserCog, MODULES.USERS, [
    { label: 'All Users', path: '/users' },
    { label: 'Add User', path: '/users/create' },
    { label: 'Roles', path: '/users/roles' },
  ]),
  
  createMenuItem('Settings', '/settings', Settings, MODULES.SETTINGS),
]

/**
 * Get filtered menu items based on user role
 * @param {string} role - User role
 * @returns {Array} Filtered menu items
 */
export const getMenuForRole = (role) => {
  return FULL_MENU.filter(item => {
    // Check if user can access the module
    if (item.module && !canAccessModule(role, item.module)) {
      return false
    }
    return true
  }).map(item => {
    // Filter children based on role
    if (item.children) {
      const filteredChildren = item.children.filter(child => {
        if (child.roles && !child.roles.includes(role)) {
          return false
        }
        return true
      })
      return { ...item, children: filteredChildren }
    }
    return item
  })
}

// Sections for sidebar grouping
export const MENU_SECTIONS = [
  {
    title: null, // No title for first section
    items: ['Dashboard'],
  },
  {
    title: 'Project Management',
    items: ['Projects', 'Progress', 'Site Reports', 'Documents'],
  },
  {
    title: 'Operations',
    items: ['Clients', 'Reports'],
  },
  {
    title: 'Administration',
    items: ['Users', 'Settings'],
  },
]

/**
 * Get menu grouped by sections
 * @param {string} role - User role
 * @returns {Array} Grouped menu sections
 */
export const getGroupedMenu = (role) => {
  const roleMenu = getMenuForRole(role)
  
  return MENU_SECTIONS.map(section => {
    const sectionItems = roleMenu.filter(item => 
      section.items.includes(item.label)
    )
    
    if (sectionItems.length === 0) return null
    
    return {
      title: section.title,
      items: sectionItems,
    }
  }).filter(Boolean)
}

