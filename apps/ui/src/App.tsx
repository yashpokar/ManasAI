import React, { useEffect } from 'react'
import Chat from './components/Chat'
import Widgets from './components/Widgets'
import Navbar from './components/Navbar'
import { useTheme } from './providers/ThemeProvider'
import { useAlert } from './providers/AlertProvider'
import Alert from './components/Alert'
import { useDeviceInfo } from './providers/DeviceInfoProvider'
import Loader from './components/Loader'
import { useSocket } from './providers/SocketProvider'
import { ConnectedEvent } from '@manasai/events'

const App: React.FC = () => {
  const { isDarkMode } = useTheme()
  const { alerts } = useAlert()
  const { isLoading, token: deviceToken } = useDeviceInfo()
  const { emit } = useSocket()

  useEffect(() => {
    if (!isLoading && deviceToken) {
      emit({
        type: 'CONNECTED',
        payload: {
          deviceToken
        }
      } as ConnectedEvent)
    }
  }, [isLoading, emit, deviceToken])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <>
      {alerts.map(alert => (
        <Alert key={alert.id} {...alert} />
      ))}

      <div
        className="flex gap-x-4 p-4 md:gap-x-8 md:p-8 h-screen antialiased font-normal font-display bg-zinc-50 dark:bg-zinc-900"
        data-mode={isDarkMode ? 'dark' : 'light'}
      >
        <div className="flex-1">
          <Widgets />
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
