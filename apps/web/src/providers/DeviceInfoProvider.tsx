import React, { useContext, useEffect, useState } from 'react'
import ShortUniqueId from 'short-unique-id'

interface DeviceInfoContext {
  token: string | null
  isLoading: boolean
}

interface DeviceInfoProviderProps {
  children: React.ReactNode
}

const DeviceInfoContext = React.createContext<DeviceInfoContext>({
  token: null,
  isLoading: true
})

const DEVICE_TOKEN_KEY = 'device_token'

export const DeviceInfoProvider: React.FC<DeviceInfoProviderProps> = ({
  children
}) => {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, loading] = useState(true)

  useEffect(() => {
    if (token) return

    let storedToken = localStorage.getItem(DEVICE_TOKEN_KEY)
    if (!storedToken) {
      storedToken = new ShortUniqueId().randomUUID(32)
      localStorage.setItem(DEVICE_TOKEN_KEY, storedToken)
    }
    setToken(storedToken)
    loading(false)
  }, [token])

  return (
    <DeviceInfoContext.Provider value={{ token, isLoading }}>
      {children}
    </DeviceInfoContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDeviceInfo = () => {
  const context = useContext(DeviceInfoContext)

  if (!context) {
    throw new Error('useDeviceInfo must be used within a DeviceInfoProvider')
  }

  return context
}
