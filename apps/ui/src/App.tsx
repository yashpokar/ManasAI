import React from 'react'
import Chat from './components/Chat'
import Widgets from './components/Widgets'
import Navbar from './components/Navbar'
import { useTheme } from './providers/ThemeProvider'

const App: React.FC = () => {
  const { isDarkMode } = useTheme()

  return (
    <div
      className="flex gap-x-4 p-4 md:gap-x-8 md:p-8 h-screen antialiased font-normal bg-zinc-100 dark:bg-zinc-900"
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
  )
}

export default App
