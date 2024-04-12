import React, { useEffect } from 'react'

import Chat from '@/components/Chat'
import Tools from '@/components/Tools'
import Navbar from '@/components/Navbar'
import Loader from '@/components/Loader'
import useTheme from '@/hooks/use-theme'
import useDevice from '@/hooks/use-device'
import { DARK_MODE, LIGHT_MODE } from './constants'
import useDeviceIdGenerator from './hooks/use-device-id-generator'

const App: React.FC = () => {
  const { isDarkMode } = useTheme()
  const { generateDeviceId, deviceId } = useDeviceIdGenerator()
  const { isSetup, setupDevice } = useDevice()

  useEffect(() => {
    if (!isSetup) {
      generateDeviceId()
    }
  }, [generateDeviceId, isSetup])

  useEffect(() => {
    if (!isSetup && deviceId) {
      setupDevice(deviceId)
    }
  }, [isSetup, setupDevice, deviceId])

  if (!isSetup) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-50 dark:bg-zinc-900">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <div
        className="flex gap-x-4 p-4 md:gap-x-8 md:p-8 h-screen antialiased font-normal font-display bg-zinc-50 dark:bg-zinc-900"
        data-mode={isDarkMode ? DARK_MODE : LIGHT_MODE}
      >
        <div className="flex-1">
          <Tools />
        </div>

        <div className="flex-1">
          <Chat />
        </div>

        <div className="">
          <Navbar />
        </div>
      </div>
    </>
  )
}

export default App
