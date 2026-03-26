import { useMemo, useCallback } from 'react'
import { useAuth } from './useAuth'
import { 
  hasPermission, 
  canAccessModule, 
  getRolePermissions,
  isAdmin,
  ROLES,
  MODULES,
  ACTIONS 
} from '../config/permissions'

/**
 * Custom hook for role-based permission checks
 * @returns {Object} Permission utilities
 */
export function usePermissions() {
  const { user } = useAuth()
  const role = user?.role || null

  // Check if user has a specific permission
  const can = useCallback(
    (module, action) => {
      if (!role) return false
      return hasPermission(role, module, action)
    },
    [role]
  )

  // Check if user can access a module
  const canAccess = useCallback(
    (module) => {
      if (!role) return false
      return canAccessModule(role, module)
    },
    [role]
  )

  // Check if user has any of the specified roles
  const hasRole = useCallback(
    (allowedRoles) => {
      if (!role) return false
      if (Array.isArray(allowedRoles)) {
        return allowedRoles.includes(role)
      }
      return role === allowedRoles
    },
    [role]
  )

  // Check if user is admin
  const isUserAdmin = useMemo(() => {
    return role === ROLES.ADMIN
  }, [role])

  // Get all permissions for current user
  const permissions = useMemo(() => {
    if (!role) return {}
    return getRolePermissions(role)
  }, [role])

  // Permission check shortcuts
  const canView = useCallback(
    (module) => can(module, ACTIONS.VIEW),
    [can]
  )

  const canCreate = useCallback(
    (module) => can(module, ACTIONS.CREATE),
    [can]
  )

  const canEdit = useCallback(
    (module) => can(module, ACTIONS.EDIT),
    [can]
  )

  const canDelete = useCallback(
    (module) => can(module, ACTIONS.DELETE),
    [can]
  )

  return {
    role,
    can,
    canAccess,
    hasRole,
    isAdmin: isUserAdmin,
    permissions,
    canView,
    canCreate,
    canEdit,
    canDelete,
    ROLES,
    MODULES,
    ACTIONS,
  }
}

export default usePermissions

