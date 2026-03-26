import { forwardRef } from 'react'
import { cn } from '../../utils/helpers'

/**
 * Card Component
 * Reusable card container
 */
const Card = forwardRef(
  ({ children, className, hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white border border-dark-200 rounded-xl overflow-hidden',
          hover && 'transition-all duration-300 hover:border-orange-200 hover:shadow-sm',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

/**
 * Card Header Component
 */
const CardHeader = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('px-6 py-4 border-b border-dark-200', className)}
      {...props}
    >
      {children}
    </div>
  )
})

CardHeader.displayName = 'CardHeader'

/**
 * Card Title Component
 */
const CardTitle = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold text-dark-900', className)}
      {...props}
    >
      {children}
    </h3>
  )
})

CardTitle.displayName = 'CardTitle'

/**
 * Card Description Component
 */
const CardDescription = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-dark-600 mt-1', className)}
      {...props}
    >
      {children}
    </p>
  )
})

CardDescription.displayName = 'CardDescription'

/**
 * Card Body Component
 */
const CardBody = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
})

CardBody.displayName = 'CardBody'

/**
 * Card Footer Component
 */
const CardFooter = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'px-6 py-4 border-t border-dark-200 bg-dark-50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter }
export default Card

