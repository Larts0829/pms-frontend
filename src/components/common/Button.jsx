import { forwardRef } from 'react'
import { cn } from '../../utils/helpers'

/**
 * Button Component
 * Reusable button with multiple variants
 */
const Button = forwardRef(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const sharedTheme =
      'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500 border border-yellow-500'

    const variants = {
      primary: `${sharedTheme} hover:shadow-yellow`,
      secondary: sharedTheme,
      ghost: sharedTheme,
      danger: sharedTheme,
      success: sharedTheme,
      outline: sharedTheme,
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base',
      icon: 'p-2.5',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          'active:scale-[0.98]',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button

