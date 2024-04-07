import React, { createContext, useCallback, useContext, useEffect } from 'react'

interface ThemeContextProps {
  isDarkMode: boolean
  toggleTheme: () => void
}

interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: true,
  toggleTheme: () => {}
})

const DARK_MODE_KEY = 'darkMode'

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setDarkMode] = React.useState<boolean>(true)

  const toggleTheme = useCallback(() => {
    setDarkMode(isDarkMode => {
      localStorage.setItem(DARK_MODE_KEY, JSON.stringify(!isDarkMode))

      return !isDarkMode
    })
  }, [])

  useEffect(() => {
    const darkMode = localStorage.getItem(DARK_MODE_KEY)

    if (darkMode) {
      setDarkMode(JSON.parse(darkMode))
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
