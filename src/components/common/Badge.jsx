import { cn } from '../../utils/helpers'

/**
 * Badge Component
 * Status indicator badge
 */
function Badge({ children, variant = 'neutral', size = 'md', className, ...props }) {
  const variants = {
    gold: 'bg-yellow-500/20 text-yellow-500',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    error: 'bg-error/20 text-error',
    info: 'bg-info/20 text-info',
    neutral: 'bg-dark-200 text-dark-700',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

/**
 * Status Badge with Dot
 */
function StatusBadge({ status, label, className }) {
  const statusConfig = {
    active: { color: 'success', label: label || 'Active' },
    inactive: { color: 'neutral', label: label || 'Inactive' },
    pending: { color: 'warning', label: label || 'Pending' },
    completed: { color: 'success', label: label || 'Completed' },
    in_progress: { color: 'warning', label: label || 'In Progress' },
    on_hold: { color: 'neutral', label: label || 'On Hold' },
    planning: { color: 'info', label: label || 'Planning' },
    cancelled: { color: 'error', label: label || 'Cancelled' },
    delayed: { color: 'error', label: label || 'Delayed' },
  }

  const config = statusConfig[status] || { color: 'neutral', label: status }

  const dotColors = {
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    info: 'bg-info',
    neutral: 'bg-dark-400',
    gold: 'bg-yellow-500',
  }

  return (
    <Badge variant={config.color} className={cn('gap-1.5', className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', dotColors[config.color])} />
      {config.label}
    </Badge>
  )
}

export { Badge, StatusBadge }
export default Badge

