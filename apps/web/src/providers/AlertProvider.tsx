import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import ShortUniqueId from 'short-unique-id'

export interface Alert {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  dismissible: boolean
  timeout?: number
}

export interface CancelAlert {
  (): void
}

interface AlertContext {
  alerts: Alert[]
  success: (
    message: string,
    dismissible?: boolean,
    timeout?: number
  ) => CancelAlert
  error: (
    message: string,
    dismissible?: boolean,
    timeout?: number
  ) => CancelAlert
  info: (
    message: string,
    dismissible?: boolean,
    timeout?: number
  ) => CancelAlert
  warning: (
    message: string,
    dismissible?: boolean,
    timeout?: number
  ) => CancelAlert
  delete: (id: string) => void
}

interface AlertProviderProps {
  children: React.ReactNode
}

const AlertContext = createContext<AlertContext>({
  alerts: [],
  success: () => () => {},
  error: () => () => {},
  info: () => () => {},
  warning: () => () => {},
  delete: () => () => {}
})

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([])

  const deleteAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id))
  }, [])

  const flash = useCallback(
    (alert: Alert) => {
      if (alert.timeout) {
        setTimeout(() => {
          deleteAlert(alert.id)
        }, alert.timeout)
      }

      setAlerts(prev => [...prev, alert])
    },
    [deleteAlert]
  )

  const actions = useMemo(
    () => ({
      success: (
        message: string,
        dismissible: boolean = true,
        timeout?: number
      ) => {
        const id = new ShortUniqueId().randomUUID()

        flash({
          id,
          message,
          type: 'success',
          timeout,
          dismissible
        })

        return () => deleteAlert(id)
      },
      error: (
        message: string,
        dismissible: boolean = true,
        timeout?: number
      ) => {
        const id = new ShortUniqueId().randomUUID()

        flash({
          id,
          message,
          type: 'error',
          timeout,
          dismissible
        })

        return () => deleteAlert(id)
      },
      info: (
        message: string,
        dismissible: boolean = true,
        timeout?: number
      ) => {
        const id = new ShortUniqueId().randomUUID()

        flash({
          id,
          message,
          type: 'info',
          timeout,
          dismissible
        })

        return () => deleteAlert(id)
      },
      warning: (
        message: string,
        dismissible: boolean = true,
        timeout?: number
      ) => {
        const id = new ShortUniqueId().randomUUID()

        flash({
          id,
          message,
          type: 'warning',
          timeout,
          dismissible
        })

        return () => deleteAlert(id)
      },
      delete: deleteAlert
    }),
    [flash, deleteAlert]
  )

  return (
    <AlertContext.Provider value={{ ...actions, alerts }}>
      {children}
    </AlertContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => {
  const context = useContext(AlertContext)

  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider')
  }

  return context
}
