import { cn } from '../../utils/helpers'

/**
 * Progress Bar Component
 */
function ProgressBar({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'gold',
  showLabel = false,
  className,
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
  }

  const variants = {
    gold: 'bg-yellow-500',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    info: 'bg-info',
  }

  // Determine variant based on percentage thresholds
  const getAutoVariant = () => {
    if (percentage >= 100) return variants.success
    if (percentage >= 75) return variants.gold
    if (percentage >= 50) return variants.warning
    return variants.error
  }

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-dark-600">Progress</span>
          <span className="text-xs font-medium text-dark-900">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn('w-full rounded-full bg-dark-200 overflow-hidden', sizes[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            variant === 'auto' ? getAutoVariant() : variants[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

/**
 * Circular Progress Component
 */
function CircularProgress({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'gold',
  showLabel = true,
  className,
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  const variants = {
    gold: 'stroke-yellow-500',
    success: 'stroke-success',
    warning: 'stroke-warning',
    error: 'stroke-error',
    info: 'stroke-info',
  }

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-dark-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn('transition-all duration-500 ease-out', variants[variant])}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-dark-900">{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  )
}

export { ProgressBar, CircularProgress }
export default ProgressBar

