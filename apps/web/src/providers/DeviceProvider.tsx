import { DEVICE_ID } from '@/constants'
import { IDeviceContext, ProviderProps } from '@/types'
import React, { useCallback, useState } from 'react'

export const DeviceContext = React.createContext<IDeviceContext>({
  id: null,
  isSetup: false,
  setupDevice: () => {}
})

const DeviceProvider: React.FC<ProviderProps> = ({ children }) => {
  const [id, setId] = useState<string | null>(null)
  const [isSetup, setupCompleted] = useState<boolean>(false)

  const setupDevice = useCallback((id: string) => {
    localStorage.setItem(DEVICE_ID, id)
    setId(id)
    setupCompleted(true)
  }, [])

  return (
    <DeviceContext.Provider value={{ id, isSetup, setupDevice }}>
      {children}
    </DeviceContext.Provider>
  )
}

export default DeviceProvider
