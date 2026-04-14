import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import { cn } from '../../utils/helpers'

/**
 * Modal Component
 * Reusable dialog modal
 */
function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  className,
}) {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90vw]',
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal Container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cn(
                  'w-full bg-white border border-dark-200 rounded-2xl shadow-2xl overflow-hidden text-dark-900',
                  sizes[size],
                  className
                )}
              >
                {/* Header */}
                {(title || showCloseButton) && (
                  <div className="px-6 py-4 bg-yellow-500 flex items-center justify-between">
                    <div>
                      {title && (
                        <Dialog.Title className="text-lg font-semibold text-white">
                          {title}
                        </Dialog.Title>
                      )}
                      {description && (
                        <Dialog.Description className="text-sm text-yellow-100 mt-1">
                          {description}
                        </Dialog.Description>
                      )}
                    </div>
                    {showCloseButton && (
                      <button
                        onClick={onClose}
                        className="p-2 text-yellow-100 hover:text-white hover:bg-yellow-600 rounded-lg transition-colors"
                        aria-label="Close modal"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                )}

                {/* Content */}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

/**
 * Modal Body Component
 */
function ModalBody({ children, className }) {
  return (
    <div className={cn('p-6 overflow-y-auto max-h-[60vh]', className)}>
      {children}
    </div>
  )
}

/**
 * Modal Footer Component
 */
function ModalFooter({ children, className }) {
  return (
    <div
      className={cn(
        'px-6 py-4 border-t border-dark-700 flex items-center justify-end gap-3',
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * Confirm Dialog Component
 */
function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) {
  const variants = {
    danger: 'bg-yellow-500 hover:bg-yellow-600 border border-yellow-500 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 border border-yellow-500 text-white',
    primary: 'bg-yellow-500 hover:bg-yellow-600 border border-yellow-500 text-white',
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-dark-400">{message}</p>
      </div>
      <div className="px-6 py-4 border-t border-dark-700 flex items-center justify-center gap-3">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="px-4 py-2.5 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 border border-yellow-500 rounded-lg transition-colors disabled:opacity-60"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className={cn(
            'px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-60',
            variants[variant]
          )}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            confirmText
          )}
        </button>
      </div>
    </Modal>
  )
}

export { Modal, ModalBody, ModalFooter, ConfirmDialog }
export default Modal

