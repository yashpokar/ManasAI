import { DEVICE_TOKEN_KEY } from '@/constants'
import { IDeviceContext, ProviderProps } from '@/types'
import React, { useEffect, useState } from 'react'

export const DeviceContext = React.createContext<IDeviceContext>({
  token: null,
  isLoading: true
})

const DeviceProvider: React.FC<ProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, loading] = useState(true)

  useEffect(() => {
    if (token) return

    let storedToken = localStorage.getItem(DEVICE_TOKEN_KEY)
    if (!storedToken) {
      storedToken = Math.random().toString(36).substring(2)
      localStorage.setItem(DEVICE_TOKEN_KEY, storedToken)
    }
    setToken(storedToken)
    loading(false)
  }, [token])

  return (
    <DeviceContext.Provider value={{ token, isLoading }}>
      {children}
    </DeviceContext.Provider>
  )
}

export default DeviceProvider
