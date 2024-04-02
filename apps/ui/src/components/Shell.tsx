import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import '@xterm/xterm/css/xterm.css'
import { useTheme } from '../providers/ThemeProvider'

const Shell: React.FC = () => {
  const playgroundRef = useRef<HTMLDivElement>(null)
  const { isDarkMode } = useTheme()

  useEffect(() => {
    if (!playgroundRef.current) return

    const terminal = new Terminal({
      cols: 0,
      rows: 0,
      fontFamily: "Menlo, Monaco, 'Courier New', monospace",
      fontSize: 18,
      theme: {
        background: isDarkMode ? '#18181b' : '#f4f4f5',
        foreground: isDarkMode ? '#f4f4f5' : '#18181b',
        cursor: isDarkMode ? '#f4f4f5' : '#18181b'
      }
    })
    terminal.write('$ ')

    const fitAddon = new FitAddon()
    terminal.loadAddon(fitAddon)
    terminal.open(playgroundRef.current)
    fitAddon.activate(terminal)

    fitAddon.fit()

    return () => {
      terminal.dispose()
    }
  }, [playgroundRef, isDarkMode])

  return <div ref={playgroundRef} className="p-2 h-full" />
}

export default Shell
