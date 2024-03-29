import React from 'react'
import Chat from './components/Chat'
import Widgets from './components/Widgets'
import Navbar from './components/Navbar'
import { useTheme } from './providers/ThemeProvider'
import { useWorkspace } from './providers/WorkspaceProvider'
import AddWorkspace from './components/AddWorkspace'

const App: React.FC = () => {
  const { isDarkMode } = useTheme()
  const { workspaces } = useWorkspace()

  return (
    <div
      className="flex gap-x-4 p-4 md:gap-x-8 md:p-8 h-screen antialiased font-normal font-display bg-zinc-50 dark:bg-zinc-900"
      data-mode={isDarkMode ? 'dark' : 'light'}
    >
      <AddWorkspace show={workspaces.length === 0} />

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
