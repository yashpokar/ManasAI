import React from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../providers/ThemeProvider'

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <nav className="flex items-end p-2 w-full h-full rounded-lg bg-zinc-200 dark:bg-zinc-800">
      <ul className="flex flex-col">
        <li className="">
          <button
            className="p-0.5 md:p-1 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-700"
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              <SunIcon
                className="w-7 h-7 text-zinc-50"
                title="Switch to dark mode"
              />
            ) : (
              <MoonIcon
                className="w-7 h-7 text-zinc-900"
                title="Switch to light mode"
              />
            )}
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
