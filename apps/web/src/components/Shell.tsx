import { useLayoutEffect, useRef } from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'
import useTheme from '@/hooks/use-theme'
import { Command } from '@/types'

interface ShellProps {
  commands: Command[]
}

const Shell: React.FC<ShellProps> = ({ commands }) => {
  const playgroundRef = useRef<HTMLDivElement>(null)
  const { isDarkMode } = useTheme()

  useLayoutEffect(() => {
    if (!playgroundRef.current) return

    const terminal = new Terminal({
      cols: 0,
      rows: 0,
      fontFamily: "Menlo, Monaco, 'Courier New', monospace",
      fontSize: 14,
      theme: {
        background: isDarkMode ? '#18181b' : '#f4f4f5',
        foreground: isDarkMode ? '#f4f4f5' : '#18181b',
        cursor: isDarkMode ? '#f4f4f5' : '#18181b'
      }
    })
    terminal.write('$ ')

    commands.forEach(({ stdout, isOutput }) => {
      terminal.writeln(stdout)

      if (isOutput) {
        terminal.write('$ ')
      }
    })

    const fitAddon = new FitAddon()
    terminal.loadAddon(fitAddon)
    terminal.open(playgroundRef.current!)
    fitAddon.activate(terminal)

    // TODO: this is a hack to fix the terminal to fit following error caught by StrictMode:
    // Uncaught TypeError: Cannot read properties of undefined (reading 'dimensions')
    // at get dimensions (@xterm_xterm.js?v=83ce3ba0:2062:41)
    // at t2.Viewport.syncScrollArea (@xterm_xterm.js?v=83ce3ba0:918:70)
    // at @xterm_xterm.js?v=83ce3ba0:893:1498
    // get dimensions @ @xterm_xterm.js?v=83ce3ba0:2062
    // syncScrollArea @ @xterm_xterm.js?v=83ce3ba0:918
    // (anonymous) @ @xterm_xterm.js?v=83ce3ba0:893
    // setTimeout (async)
    // t2.Viewport @ @xterm_xterm.js?v=83ce3ba0:893
    // createInstance @ @xterm_xterm.js?v=83ce3ba0:6154
    // open @ @xterm_xterm.js?v=83ce3ba0:602
    // open @ @xterm_xterm.js?v=83ce3ba0:6588
    // (anonymous) @ Shell.tsx:45
    // commitHookEffectListMount @ chunk-7Y2SNXSS.js?v=83ce3ba0:16904
    // commitLayoutEffectOnFiber @ chunk-7Y2SNXSS.js?v=83ce3ba0:16992
    // commitLayoutMountEffects_complete @ chunk-7Y2SNXSS.js?v=83ce3ba0:17976
    // commitLayoutEffects_begin @ chunk-7Y2SNXSS.js?v=83ce3ba0:17965
    // commitLayoutEffects @ chunk-7Y2SNXSS.js?v=83ce3ba0:17916
    // commitRootImpl @ chunk-7Y2SNXSS.js?v=83ce3ba0:19349
    // commitRoot @ chunk-7Y2SNXSS.js?v=83ce3ba0:19273
    // finishConcurrentRender @ chunk-7Y2SNXSS.js?v=83ce3ba0:18801
    // performConcurrentWorkOnRoot @ chunk-7Y2SNXSS.js?v=83ce3ba0:18714
    // workLoop @ chunk-7Y2SNXSS.js?v=83ce3ba0:197
    // flushWork @ chunk-7Y2SNXSS.js?v=83ce3ba0:176
    // performWorkUntilDeadline @ chunk-7Y2SNXSS.js?v=83ce3ba0:384
    // Show 19 more frames
    // Show less
    // ProjectProvider.tsx:103
    setTimeout(() => {
      fitAddon.fit()
    }, 0)

    return () => {
      terminal.dispose()
    }
  }, [playgroundRef, isDarkMode, commands])

  return <div ref={playgroundRef} className="p-2 h-full" />
}

export default Shell
