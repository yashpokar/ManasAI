import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

import { Alert as AlertType, useAlert } from '../providers/AlertProvider'

const Alert: React.FC<AlertType> = ({ id, message, type, dismissible }) => {
  let bgColor = 'bg-green-300 dark:bg-green-100'
  let textColor = 'text-green-900 dark:text-green-700'

  const { delete: deleteAlert } = useAlert()

  switch (type) {
    case 'error':
      bgColor = 'bg-red-300 dark:bg-red-100'
      textColor = 'text-red-900 dark:text-red-700'
      break
    case 'info':
      bgColor = 'bg-blue-300 dark:bg-blue-100'
      textColor = 'text-blue-900 dark:text-blue-700'
      break
    case 'warning':
      bgColor = 'bg-yellow-300 dark:bg-yellow-100'
      textColor = 'text-yellow-900 dark:text-yellow-700'
      break
  }

  return (
    <div
      className="fixed flex items-center justify-center z-50 left-8 bottom-4 bg-transparent"
      data-testid={`alert-${id}`}
    >
      <div
        className={clsx(
          'flex items-center justify-between gap-x-4 px-8 py-3 rounded cursor-pointer text-sm',
          bgColor,
          textColor
        )}
      >
        <span className="">{message}</span>

        {dismissible && (
          <button
            data-testid={`alert-close-${id}`}
            className="hover:opacity-85"
            onClick={() => deleteAlert(id)}
          >
            <XMarkIcon className="w-4 h-4" strokeWidth={3} />
          </button>
        )}
      </div>
    </div>
  )
}

export default Alert
