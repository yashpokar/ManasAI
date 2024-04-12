import React from 'react'

import Chat from '@/components/Chat'
import Tools from '@/components/Tools'
import Navbar from '@/components/Navbar'
import Loader from '@/components/Loader'
import useTheme from '@/hooks/use-theme'
import useDevice from '@/hooks/use-device'

const App: React.FC = () => {
  const { isDarkMode } = useTheme()
  const { isLoading } = useDevice()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <div
        className="flex gap-x-4 p-4 md:gap-x-8 md:p-8 h-screen antialiased font-normal font-display bg-zinc-50 dark:bg-zinc-900"
        data-mode={isDarkMode ? 'dark' : 'light'}
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
