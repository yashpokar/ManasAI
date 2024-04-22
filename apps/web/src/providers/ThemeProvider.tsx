import { DARK_MODE_KEY } from '@/constants'
import { ProviderProps, IThemeContext } from '@/types'
import React, { createContext, useCallback, useEffect } from 'react'

export const ThemeContext = createContext<IThemeContext>({
  isDarkMode: true,
  toggleTheme: () => {}
})

const ThemeProvider: React.FC<ProviderProps> = ({ children }) => {
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

export default ThemeProvider
