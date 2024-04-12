import React, { useEffect } from 'react'

import Chat from '@/components/Chat'
import Tools from '@/components/Tools'
import Navbar from '@/components/Navbar'
import useTheme from '@/hooks/use-theme'
import useDevice from '@/hooks/use-device'
import { DARK_MODE, LIGHT_MODE } from '@/constants'
import Splash from '@/Splash'
import useDeviceIdGenerator from '@/hooks/use-device-id-generator'
import useProject from './hooks/use-project'

const App: React.FC = () => {
  const { isDarkMode } = useTheme()
  const { generateDeviceId, deviceId } = useDeviceIdGenerator()
  const { isSetup, setupDevice, loading } = useDevice()
  const { listProjects } = useProject()

  useEffect(() => {
    if (isSetup) {
      listProjects()
    }
  }, [listProjects, isSetup])

  useEffect(() => {
    if (!isSetup && !loading) {
      generateDeviceId()
    }
  }, [generateDeviceId, isSetup, loading])

  useEffect(() => {
    if (deviceId) {
      setupDevice(deviceId)
    }
  }, [setupDevice, deviceId])

  if (!isSetup) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-50 dark:bg-zinc-900">
        <Splash />
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
