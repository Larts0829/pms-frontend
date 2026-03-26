import { forwardRef } from 'react'
import { cn } from '../../utils/helpers'

/**
 * Form Input Component
 */
const FormInput = forwardRef(
  (
    {
      label,
      error,
      hint,
      className,
      inputClassName,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('space-y-2', className)}>
        {label && (
          <label className="block text-sm font-medium text-dark-700">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-2.5 bg-white border border-dark-300 rounded-lg text-dark-900 placeholder-dark-500',
              'hover:border-yellow-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors',
              error && 'border-error focus:border-error focus:ring-error',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              inputClassName
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
        {hint && !error && <p className="text-xs text-dark-500">{hint}</p>}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'

/**
 * Form Select Component
 */
const FormSelect = forwardRef(
  ({ label, error, hint, options = [], placeholder, className, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', className)}>
        {label && (
          <label className="block text-sm font-medium text-dark-700">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full px-4 py-2.5 bg-white border border-dark-300 rounded-lg text-dark-900',
            'hover:border-yellow-400 hover:bg-yellow-50/40 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors',
            'appearance-none bg-no-repeat bg-right pr-10',
            error && 'border-error focus:border-error focus:ring-error'
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.75rem center',
            backgroundSize: '1.25rem',
          }}
          {...props}
        >
          {placeholder && (
            <option value="" className="text-dark-500">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-white text-dark-900"
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-error">{error}</p>}
        {hint && !error && <p className="text-xs text-dark-500">{hint}</p>}
      </div>
    )
  }
)

FormSelect.displayName = 'FormSelect'

/**
 * Form Textarea Component
 */
const FormTextarea = forwardRef(
  ({ label, error, hint, className, rows = 4, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', className)}>
        {label && (
          <label className="block text-sm font-medium text-dark-700">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            'w-full px-4 py-2.5 bg-white border border-dark-300 rounded-lg text-dark-900 placeholder-dark-500 resize-none',
            'hover:border-yellow-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors',
            error && 'border-error focus:border-error focus:ring-error'
          )}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
        {hint && !error && <p className="text-xs text-dark-500">{hint}</p>}
      </div>
    )
  }
)

FormTextarea.displayName = 'FormTextarea'

/**
 * Form Checkbox Component
 */
const FormCheckbox = forwardRef(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={cn('flex items-start gap-3', className)}>
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            'h-4 w-4 rounded border-dark-300 bg-white text-yellow-500',
            'focus:ring-yellow-500 focus:ring-offset-white'
          )}
          {...props}
        />
        {label && (
          <label className="text-sm text-dark-700 cursor-pointer">
            {label}
          </label>
        )}
      </div>
    )
  }
)

FormCheckbox.displayName = 'FormCheckbox'

/**
 * Form Switch Component
 */
const FormSwitch = forwardRef(
  ({ label, description, className, ...props }, ref) => {
    return (
      <div className={cn('flex items-start justify-between gap-4', className)}>
        <div>
          {label && <p className="text-sm font-medium text-dark-900">{label}</p>}
          {description && (
            <p className="text-xs text-dark-600 mt-0.5">{description}</p>
          )}
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            className="sr-only peer"
            {...props}
          />
          <div className="w-11 h-6 bg-dark-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-500 peer-focus:ring-offset-2 peer-focus:ring-offset-white rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
        </label>
      </div>
    )
  }
)

FormSwitch.displayName = 'FormSwitch'

export { FormInput, FormSelect, FormTextarea, FormCheckbox, FormSwitch }

