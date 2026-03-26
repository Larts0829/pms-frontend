import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/common/Button'
import { FormInput } from '../../components/forms/FormFields'

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

/**
 * Forgot Password Page Component
 */
function ForgotPasswordPage() {
  const { forgotPassword, isLoading, error, clearError } = useAuth()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  // Handle form submission
  const onSubmit = async (data) => {
    clearError()
    try {
      await forgotPassword(data.email)
      setIsSubmitted(true)
    } catch (err) {
      // Error is handled in context
    }
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="h-16 w-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-dark-900 mb-2">Check your email</h2>
        <p className="text-dark-600 mb-6">
          We've sent a password reset link to{' '}
          <span className="text-dark-900">{getValues('email')}</span>
        </p>
        <p className="text-sm text-dark-600 mb-8">
          Didn't receive the email? Check your spam folder or{' '}
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-yellow-500 hover:text-yellow-400"
          >
            try again
          </button>
        </p>
        <Link to="/login">
          <Button variant="secondary" className="w-full">
            Back to Sign In
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Back Link */}
      <Link
        to="/login"
        className="inline-flex items-center gap-2 text-sm text-dark-600 hover:text-dark-900 mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Sign In
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-dark-900">Forgot your password?</h2>
        <p className="text-dark-600 mt-2">
          No worries! Enter your email and we'll send you a reset link.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl text-error text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          label="Email Address"
          type="email"
          placeholder="you@westwood.com"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={isLoading}
        >
          Send Reset Link
        </Button>
      </form>
    </div>
  )
}

export default ForgotPasswordPage

