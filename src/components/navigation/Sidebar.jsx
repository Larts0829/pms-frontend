import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { 
  ChevronDown, 
  ChevronRight,
  X
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { getGroupedMenu } from '../../config/menuConfig'
import { ROLE_LABELS } from '../../config/permissions'
import { cn } from '../../utils/helpers'
import wcdLogo from '../../images/wcd_logo.png'

/**
 * Sidebar Component
 * Main navigation sidebar with role-based menu
 */
function Sidebar({ isOpen, isMobileOpen, onMobileClose }) {
  const { user } = useAuth()
  const location = useLocation()
  const [expandedItems, setExpandedItems] = useState({})

  // Get menu items based on user role
  const menuSections = getGroupedMenu(user?.role)

  // Toggle submenu expansion
  const toggleExpand = (label) => {
    setExpandedItems(prev => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  // Check if a path is active
  const isPathActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  // Check if any child is active
  const hasActiveChild = (children) => {
    return children?.some(child => isPathActive(child.path))
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-white border-r border-dark-200 flex flex-col transition-all duration-300',
          isOpen ? 'w-64' : 'w-20',
          'hidden lg:flex'
        )}
      >
        {/* Logo */}
        <div className="h-16 px-4 flex items-center border-b border-dark-200">
          <div className="flex items-center gap-3">
            <img 
              src={wcdLogo} 
              alt="Westwood Logo" 
              className="h-10 w-10 flex-shrink-0 object-contain"
            />
            {isOpen && (
              <div className="overflow-hidden">
                <h1 className="text-lg font-bold text-dark-900 truncate">WORKS</h1>
                <p className="text-xs text-yellow-600 truncate">Westwood System</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuSections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-4">
              {/* Section Title */}
              {section.title && isOpen && (
                <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-dark-700">
                  {section.title}
                </h3>
              )}

              {/* Menu Items */}
              {section.items.map((item) => {
                const Icon = item.icon
                const hasChildren = item.children && item.children.length > 0
                const isExpanded = expandedItems[item.label]
                const isActive = isPathActive(item.path) || hasActiveChild(item.children)

                // If item has only one child, render as direct link
                if (hasChildren && item.children.length === 1) {
                  const child = item.children[0]
                  return (
                    <NavLink
                      key={item.label}
                      to={child.path}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'text-dark-600 hover:text-dark-900 hover:bg-dark-100'
                        )
                      }
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {isOpen && <span>{item.label}</span>}
                    </NavLink>
                  )
                }

                return (
                  <div key={item.label}>
                    {hasChildren ? (
                      // Item with submenu
                      <>
                        <button
                          onClick={() => toggleExpand(item.label)}
                          className={cn(
                            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                            isActive
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'text-dark-600 hover:text-dark-900 hover:bg-dark-100'
                          )}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          {isOpen && (
                            <>
                              <span className="flex-1 text-left">{item.label}</span>
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </>
                          )}
                        </button>

                        {/* Submenu */}
                        {isOpen && isExpanded && (
                          <div className="mt-1 ml-4 pl-4 border-l border-dark-200 space-y-1">
                            {item.children.map((child) => (
                              <NavLink
                                key={child.path}
                                to={child.path}
                                className={({ isActive }) =>
                                  cn(
                                    'block px-3 py-2 rounded-lg text-sm transition-colors',
                                    isActive
                                      ? 'text-yellow-600 bg-yellow-50'
                                      : 'text-dark-600 hover:text-dark-900 hover:bg-dark-100'
                                  )
                                }
                              >
                                {child.label}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      // Regular menu item
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                            isActive
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'text-dark-600 hover:text-dark-900 hover:bg-dark-100'
                          )
                        }
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        {isOpen && <span>{item.label}</span>}
                      </NavLink>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </nav>

        {/* User Info */}
        {isOpen && (
          <div className="p-4 border-t border-dark-200">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center text-sm font-semibold text-white">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-dark-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-dark-600 truncate capitalize">
                  {ROLE_LABELS[user?.role] || user?.role?.replace('_', ' ')}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-dark-200 flex flex-col transition-transform duration-300 lg:hidden',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Mobile Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-dark-200">
          <div className="flex items-center gap-3">
            <img 
              src={wcdLogo} 
              alt="Westwood Logo" 
              className="h-10 w-10 object-contain"
            />
            <div>
              <h1 className="text-lg font-bold text-dark-900">WORKS</h1>
              <p className="text-xs text-yellow-600">Westwood System</p>
            </div>
          </div>
          <button
            onClick={onMobileClose}
            className="p-2 text-dark-600 hover:text-dark-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuSections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-4">
              {section.title && (
                <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-dark-700">
                  {section.title}
                </h3>
              )}

              {section.items.map((item) => {
                const Icon = item.icon
                const hasChildren = item.children && item.children.length > 0
                const isExpanded = expandedItems[item.label]
                const isActive = isPathActive(item.path) || hasActiveChild(item.children)

                return (
                  <div key={item.label}>
                    {hasChildren ? (
                      <>
                        <button
                          onClick={() => toggleExpand(item.label)}
                          className={cn(
                            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                            isActive
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'text-dark-600 hover:text-dark-900 hover:bg-dark-100'
                          )}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          <span className="flex-1 text-left">{item.label}</span>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="mt-1 ml-4 pl-4 border-l border-dark-200 space-y-1">
                            {item.children.map((child) => (
                              <NavLink
                                key={child.path}
                                to={child.path}
                                onClick={onMobileClose}
                                className={({ isActive }) =>
                                  cn(
                                    'block px-3 py-2 rounded-lg text-sm transition-colors',
                                    isActive
                                      ? 'text-yellow-600 bg-yellow-50'
                                      : 'text-dark-600 hover:text-dark-900 hover:bg-dark-100'
                                  )
                                }
                              >
                                {child.label}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <NavLink
                        to={item.path}
                        onClick={onMobileClose}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                            isActive
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'text-dark-600 hover:text-dark-900 hover:bg-dark-100'
                          )
                        }
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <span>{item.label}</span>
                      </NavLink>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Mobile User Info */}
        <div className="p-4 border-t border-dark-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center text-sm font-semibold text-white">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-dark-900 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-dark-600 truncate capitalize">
                {ROLE_LABELS[user?.role] || user?.role?.replace('_', ' ')}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
