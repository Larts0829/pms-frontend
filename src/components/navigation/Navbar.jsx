import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { ROLES } from '../../config/permissions'
import { cn } from '../../utils/helpers'

/**
 * Navbar Component
 * Top navigation bar with search, notifications, and user menu
 */
function Navbar({ onToggleSidebar, onToggleMobileSidebar, sidebarOpen }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const userMenuRef = useRef(null)
  const notificationRef = useRef(null)

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle logout
  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Implement search navigation
      console.log('Search:', searchQuery)
    }
  }

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'New project update',
      message: 'Westwood Tower Phase 1 progress updated to 75%',
      time: '5 min ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Document uploaded',
      message: 'New engineering plans uploaded for review',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Milestone completed',
      message: 'Foundation work milestone marked as complete',
      time: '2 hours ago',
      unread: false,
    },
  ]

  const unreadCount = notifications.filter(n => n.unread).length
  const showProfileAndSettings = user?.role === ROLES.ADMIN

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-dark-200 px-4 lg:px-6 flex items-center justify-between shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 text-dark-600 hover:text-yellow-600 hover:bg-dark-100 rounded-lg transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Sidebar Toggle (Desktop) */}
        <button
          onClick={onToggleSidebar}
          className="hidden lg:flex p-2 text-dark-600 hover:text-yellow-600 hover:bg-dark-100 rounded-lg transition-colors"
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-500" />
            <input
              type="text"
              placeholder="Search projects, documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 lg:w-80 pl-10 pr-4 py-2 bg-dark-50 border border-dark-200 rounded-lg text-sm text-dark-900 placeholder-dark-500 focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Mobile Search Button */}
        <button className="md:hidden p-2 text-dark-600 hover:text-yellow-600 hover:bg-dark-100 rounded-lg transition-colors">
          <Search className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-dark-600 hover:text-yellow-600 hover:bg-dark-100 rounded-lg transition-colors"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-dark-200 rounded-xl shadow-lg overflow-hidden animate-scale-in origin-top-right">
              <div className="px-4 py-3 border-b border-dark-200 flex items-center justify-between">
                <h3 className="font-semibold text-dark-900">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-xs text-yellow-600">{unreadCount} new</span>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      'px-4 py-3 border-b border-dark-100 hover:bg-dark-50 cursor-pointer transition-colors',
                      notification.unread && 'bg-yellow-50'
                    )}
                  >
                    <div className="flex gap-3">
                      {notification.unread && (
                        <div className="mt-1.5 h-2 w-2 rounded-full bg-yellow-500 flex-shrink-0" />
                      )}
                      <div className={cn(!notification.unread && 'pl-5')}>
                        <p className="text-sm font-medium text-dark-900">
                          {notification.title}
                        </p>
                        <p className="text-xs text-dark-600 mt-0.5">
                          {notification.message}
                        </p>
                        <p className="text-xs text-dark-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-dark-200">
                <Link
                  to="/notifications"
                  className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 pr-3 bg-dark-100 hover:bg-dark-200 border border-dark-200 rounded-lg transition-colors"
          >
            <div className="h-8 w-8 rounded-lg bg-yellow-500 flex items-center justify-center text-sm font-semibold text-white">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-dark-900">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-dark-600" />
          </button>

          {/* User Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-dark-200 rounded-xl shadow-lg overflow-hidden animate-scale-in origin-top-right">
              <div className="px-4 py-3 border-b border-dark-200">
                <p className="text-sm font-medium text-dark-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-dark-600">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded capitalize">
                  {user?.role?.replace('_', ' ')}
                </span>
              </div>
              {showProfileAndSettings && (
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-600 hover:text-dark-900 hover:bg-dark-100 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-600 hover:text-dark-900 hover:bg-dark-100 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </div>
              )}
              <div className="border-t border-dark-200 py-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-error hover:bg-error/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
