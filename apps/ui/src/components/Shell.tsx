import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import '@xterm/xterm/css/xterm.css'

const Shell: React.FC = () => {
  const playgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!playgroundRef.current) return

    const backgroundColor = getComputedStyle(document.getElementById('tabs')!)
      .getPropertyValue('background-color')
      .trim()

    const terminal = new Terminal({
      cols: 0,
      rows: 0,
      fontFamily: "Menlo, Monaco, 'Courier New', monospace",
      fontSize: 18,
      theme: {
        background: backgroundColor
      }
    })
    terminal.write('$ ')

    const fitAddon = new FitAddon()
    terminal.loadAddon(fitAddon)
    terminal.open(playgroundRef.current)
    fitAddon.activate(terminal)

    fitAddon.fit()
  }, [playgroundRef])

  return <div ref={playgroundRef} className="p-2 h-full" />
}

export default Shell
