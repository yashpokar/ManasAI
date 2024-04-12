import { DEVICE_ID } from '@/constants'
import { IDeviceContext, ProviderProps } from '@/types'
import React, { useCallback, useEffect, useState } from 'react'

export const DeviceContext = React.createContext<IDeviceContext>({
  id: null,
  isSetup: false,
  loading: true,
  setupDevice: () => {}
})

const DeviceProvider: React.FC<ProviderProps> = ({ children }) => {
  const [id, setId] = useState<string | null>(null)
  const [isSetup, setupCompleted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const setupDevice = useCallback((id: string) => {
    localStorage.setItem(DEVICE_ID, id)
    setId(id)
    setupCompleted(true)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!id && loading) {
      const deviceId = localStorage.getItem(DEVICE_ID)
      if (deviceId) {
        setId(deviceId)
        setupCompleted(true)
      }
      setLoading(false)
    }
  }, [loading, id])

  return (
    <DeviceContext.Provider value={{ id, isSetup, loading, setupDevice }}>
      {children}
    </DeviceContext.Provider>
  )
}

export default DeviceProvider
