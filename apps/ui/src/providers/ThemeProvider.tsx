import React, { createContext, useCallback, useContext } from 'react'

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

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setDarkMode] = React.useState<boolean>(true)

  const toggleTheme = useCallback(() => {
    setDarkMode(isDarkMode => !isDarkMode)
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
