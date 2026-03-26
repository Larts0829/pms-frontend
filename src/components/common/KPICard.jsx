import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '../../utils/helpers'
import { Card } from './Card'

/**
 * KPI Card Component
 * Dashboard metric card with icon, value, and trend
 */
function KPICard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  description,
  variant = 'default',
  className,
}) {
  const variants = {
    default: 'bg-yellow-500/10',
    success: 'bg-success/10',
    warning: 'bg-warning/10',
    error: 'bg-error/10',
    info: 'bg-info/10',
  }

  const iconColors = {
    default: 'text-yellow-500',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    info: 'text-info',
  }

  const isPositiveTrend = trend === 'up'

  return (
    <Card hover className={cn('p-6', className)}>
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div
          className={cn(
            'h-12 w-12 rounded-xl flex items-center justify-center',
            variants[variant]
          )}
        >
          <Icon className={cn('h-6 w-6', iconColors[variant])} />
        </div>

        {/* Trend */}
        {trend && trendValue && (
          <div
            className={cn(
              'flex items-center gap-1 text-sm font-medium',
              isPositiveTrend ? 'text-success' : 'text-error'
            )}
          >
            {isPositiveTrend ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {trendValue}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mt-4">
        <p className="text-3xl font-bold text-dark-900">{value}</p>
        <p className="text-sm text-dark-600 mt-1">{title}</p>
      </div>

      {/* Description */}
      {description && (
        <p className="text-xs text-dark-500 mt-3 pt-3 border-t border-dark-200">
          {description}
        </p>
      )}
    </Card>
  )
}

/**
 * Stat Card Component
 * Simpler statistic display card
 */
function StatCard({ label, value, subValue, icon: Icon, className }) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 p-4 bg-dark-50 rounded-xl border border-dark-200',
        className
      )}
    >
      {Icon && (
        <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-yellow-500" />
        </div>
      )}
      <div>
        <p className="text-2xl font-bold text-dark-900">{value}</p>
        <p className="text-xs text-dark-600">
          {label}
          {subValue && <span className="ml-1 text-dark-500">({subValue})</span>}
        </p>
      </div>
    </div>
  )
}

export { KPICard, StatCard }
export default KPICard

