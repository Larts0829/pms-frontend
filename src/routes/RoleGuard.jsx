import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { usePermissions } from '../hooks/usePermissions'

/**
 * Role Guard Component
 * Restricts access based on user role
 * 
 * @param {Object} props
 * @param {Array<string>} props.allowedRoles - Roles allowed to access the route
 * @param {string} props.redirectTo - Redirect path when access denied (default: '/dashboard')
 */
function RoleGuard({ allowedRoles, redirectTo = '/dashboard' }) {
  const { user } = useAuth()
  const { hasRole } = usePermissions()
  const location = useLocation()

  // Check if user has required role
  const hasAccess = hasRole(allowedRoles)

  console.log('RoleGuard DEBUG', {
    user,
    allowedRoles,
    userRole: user?.role,
    hasAccess,
    location: location.pathname
  });

  if (!hasAccess) {
    // Redirect to specified path or dashboard
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // Render the protected content
  return <Outlet />
}

export default RoleGuard

