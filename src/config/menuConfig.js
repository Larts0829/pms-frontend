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
const createMenuItem = (label, path, icon, module = null, children = null, roles = null) => ({
  label,
  path,
  icon,
  module,
  children,
  roles,
})

// Full navigation structure
export const FULL_MENU = [
  createMenuItem('Dashboard', '/dashboard', LayoutDashboard, MODULES.DASHBOARD),

  createMenuItem('Projects', '/projects', FolderKanban, MODULES.PROJECTS, [
    { label: 'All Projects', path: '/projects' },
    // Only show create for admin/ops
    { label: 'Create Project', path: '/projects/create', roles: [ROLES.ADMIN, ROLES.OPERATIONS_STAFF] },
  ]),

  createMenuItem('Progress', '/progress', TrendingUp, MODULES.PROGRESS, [
    { label: 'Milestones', path: '/progress' },
    // Only show update for admin/engineer
    { label: 'Update Progress', path: '/progress/update', roles: [ROLES.ADMIN, ROLES.PROJECT_ENGINEER] },
  ]),

  createMenuItem('Site Reports', '/site-reports', ClipboardList, MODULES.SITE_REPORTS, [
    { label: 'All Reports', path: '/site-reports' }
    // No upload for viewer
  ]),

  createMenuItem('Documents', '/documents', FileText, MODULES.DOCUMENTS, [
    { label: 'Document Library', path: '/documents' },
    // Only show upload for admin/engineer/ops
    // { label: 'Upload Document', path: '/documents/upload', roles: [ROLES.ADMIN, ROLES.PROJECT_ENGINEER, ROLES.OPERATIONS_STAFF] },
    { label: 'Material Tracking', path: '/documents/material-tracking', roles: [ROLES.ADMIN, ROLES.OPERATIONS_STAFF, ROLES.PROJECT_ENGINEER] },
  ]),
  // Add Budget Tracking page as a direct menu item (not for viewers/clients)
  createMenuItem('Budget', '/projects/budget', BarChart3, null, null, [ROLES.ADMIN, ROLES.OPERATIONS_STAFF, ROLES.PROJECT_ENGINEER]),

  // Clients: direct link, no dropdown
  createMenuItem('Clients', '/clients', Building2, MODULES.CLIENTS),

  // Reports menu item removed for viewer
  createMenuItem('Reports', '/reports', BarChart3, MODULES.REPORTS, null, [ROLES.ADMIN, ROLES.OPERATIONS_STAFF, ROLES.PROJECT_ENGINEER]),

  // Users: direct links to All Users and Roles (no dropdown)
  createMenuItem('All Users', '/users', UserCog, MODULES.USERS),
  createMenuItem('My Profile', '/profile', UserCog, null),
]

/**
 * Get filtered menu items based on user role
 * @param {string} role - User role
 * @returns {Array} Filtered menu items
 */
export const getMenuForRole = (role) => {
  return FULL_MENU.filter(item => {
    // Hide Reports and Clients for viewer
    if (role === ROLES.VIEWER && (item.label === 'Reports' || item.label === 'Clients')) {
      return false
    }
    // Check if user can access the module
    if (item.module && !canAccessModule(role, item.module)) {
      return false
    }
    // If item has roles, check if role is allowed
    if (item.roles && !item.roles.includes(role)) {
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
    items: ['Projects', 'Progress', 'Site Reports', 'Documents', 'Budget'],
  },
  {
    title: 'Operations',
    items: ['Clients', 'Reports'],
  },
  {
    title: 'Administration',
    items: ['All Users', 'My Profile'],
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

