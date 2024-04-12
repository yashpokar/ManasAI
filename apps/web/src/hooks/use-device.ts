import { DeviceContext } from '@/providers/DeviceProvider'
import { IDeviceContext } from '@/types'
import { useContext } from 'react'

const useDevice = (): IDeviceContext => {
  const context = useContext(DeviceContext)

  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider')
  }

  return context
}

export default useDevice
