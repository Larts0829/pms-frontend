import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import wcdLogo from '../images/wcd_logo.png'

/**
 * Auth Layout Component
 * Layout for authentication pages (login, forgot password, etc.)
 */
function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth()

  // Redirect to dashboard if already authenticated
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-yellow-50">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-yellow-200"></div>
            <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-yellow-100"></div>
          </div>
          
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full p-0">
          {/* Large Centered Logo and Text */}
          <img src={wcdLogo} alt="Westwood" className="h-44 w-44 object-contain mb-6 mx-auto" />
          <h1 className="text-5xl font-extrabold text-dark-900 tracking-tight text-center mb-3">WORKS</h1>
          <p className="text-lg font-semibold text-yellow-700 text-center mb-2">Westwood Operations &amp; Resource Knowledge System</p>
          <h2 className="text-3xl font-bold text-dark-900 text-center mt-2">Building Excellence, <span className="text-yellow-500">Delivering Quality</span></h2>
          <p className="text-dark-600 mt-4 text-center max-w-md">
            Streamline finishing and fit-out project delivery with one professional platform for engineering, operations, and client visibility.
          </p>

          {/* Features */}
          

          {/* Decorative Elements */}
          <div className="absolute bottom-12 left-12 right-12">
            <div className="border-t border-dark-300"></div>
            <div className="mt-6 flex justify-between items-center text-sm text-dark-600">
              <span>&copy; 2026 Westwood Development Corporation</span>
              <span>Project Management System</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8 bg-dark-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <img src={wcdLogo} alt="Westwood" className="h-12 w-12 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-dark-900">WORKS</h1>
              <p className="text-yellow-600 text-sm font-medium">Westwood Operations &amp; Resource Knowledge System</p>
            </div>
          </div>

          {/* Auth Form Content */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

