import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/common/Button'
import { FormInput } from '../../components/forms/FormFields'
import wcdLogo from '../../images/wcd_logo.png'

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

/**
 * Login Page Component
 */
function LoginPage() {
  const { login, isLoading, error, clearError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Handle form submission
  const onSubmit = async (data) => {
    clearError()
    try {
      await login(data.email, data.password)
    } catch (err) {
      // Error is handled in context
    }
  }

  return (
    <div>
      {/* Logo and Header - Centered, Large */}
      <div className="flex flex-col items-center mb-8 mt-8">
        <img src={wcdLogo} alt="Westwood Logo" className="h-32 w-32 mb-4 object-contain mx-auto" />
        <h1 className="text-4xl font-extrabold text-dark-900 tracking-tight text-center mb-2">WORKS</h1>
        <p className="text-base font-semibold text-yellow-700 text-center mb-1">Westwood Operations &amp; Resource Knowledge System</p>
        <h2 className="text-2xl font-bold text-dark-900 text-center mt-2">Welcome back</h2>
        <p className="text-dark-600 mt-2 text-center">
          Sign in to access WORKS fit-out project operations
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl text-error text-sm">
          {error}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          label="Email Address"
          type="email"
          placeholder="you@westwood.com"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <div>
          <FormInput
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-dark-500 hover:text-dark-900"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            error={errors.password?.message}
            {...register('password')}
          />
          <div className="mt-2 text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-yellow-500 hover:text-yellow-400"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </form>

      {/* Demo Accounts */}
      <div className="mt-8 p-4 bg-dark-50 border border-dark-200 rounded-xl">
        <p className="text-sm font-medium text-dark-700 mb-1">Demo Accounts</p>
        <p className="text-xs text-dark-500 mb-3">Westwood Operations &amp; Resource Knowledge System</p>
        <div className="space-y-2 text-xs text-dark-600">
          <p><span className="text-yellow-500">Admin:</span> admin@westwoodpms.com / admin123</p>
          <p><span className="text-yellow-500">Project Engineer:</span> engineer@westwoodpms.com / engineer123</p>
          <p><span className="text-yellow-500">Operations Staff:</span> staff@westwoodpms.com / staff123</p>
          <p><span className="text-yellow-500">Client / Viewer:</span> viewer@westwoodpms.com / viewer123</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

