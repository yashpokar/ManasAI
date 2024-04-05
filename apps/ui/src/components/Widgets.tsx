import React, { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import Shell from './Shell'
import Editor from './Editor'
import WebBrowser from './WebBrowser'
import Plan from './Plan'
import { useSocket } from '../providers/SocketProvider'
import {
  EditorCodeChangedEvent,
  EventWithPayload,
  TerminalCommandRunningEndedEvent,
  TerminalCommandRunningStartedEvent
} from '@manasai/common'
import { Command } from '../types'

interface ComponentProps {
  code?: string
  commands: Command[]
}

interface Tab {
  name: string
  component: (props: ComponentProps) => React.ReactElement
}

const tabs: Tab[] = [
  {
    name: 'Shell',
    component: ({ commands }) => <Shell commands={commands} />
  },
  {
    name: 'Browser',
    component: () => <WebBrowser />
  },
  {
    name: 'Editor',
    component: ({ code }) => <Editor code={code} />
  },
  {
    name: 'Planner',
    component: () => <Plan />
  }
]

const Widgets: React.FC = () => {
  const [code, setCode] = useState<string | undefined>()
  const [commands, setCommands] = useState<Command[]>([])
  const { on } = useSocket()

  useEffect(() => {
    on('EDITOR_CODE_CHANGED', (event: EventWithPayload<unknown>) => {
      const { code } = event.payload as EditorCodeChangedEvent['payload']

      console.log('Code changed:', code)
      setCode(code)
    })

    on(
      'TERMINAL_COMMAND_RUNNING_STARTED',
      (event: EventWithPayload<unknown>) => {
        const { command } =
          event.payload as TerminalCommandRunningStartedEvent['payload']
        setCommands(prevCommands => [
          ...prevCommands,
          {
            stdout: command,
            isOutput: false
          }
        ])
      }
    )

    on('TERMINAL_COMMAND_RUNNING_ENDED', (event: EventWithPayload<unknown>) => {
      const { output } =
        event.payload as TerminalCommandRunningEndedEvent['payload']
      let stdout = output
      if (output.includes('failed')) {
        stdout = `\x1b[31m${output}\x1b[0m`
      }
      setCommands(prevCommands => [
        ...prevCommands,
        {
          stdout,
          isOutput: true
        }
      ])
    })
  }, [on, setCode, setCommands])

  return (
    <div className="flex flex-col w-full h-full rounded-lg bg-zinc-200 dark:bg-zinc-800">
      <div className="flex flex-col flex-1 p-1.5 md:p-2.5 lg:p-6 pt-0 md:pt-0 lg:pt-0">
        <Tab.Group>
          <Tab.List className="flex px-4 gap-x-2 md:gap-x-4 lg:gap-x-8">
            {tabs.map(tab => (
              <Tab
                key={tab.name}
                className="py-1 md:py-2 lg:py-3 focus:outline-none"
              >
                {({ selected }) => (
                  <span className="flex items-center gap-x-1.5 font-medium text-sm text-zinc-700 dark:text-zinc-400 ui-selected:text-zinc-900 ui-selected:font-semibold dark:ui-selected:text-zinc-200">
                    {selected && (
                      <svg className="h-1.5 w-1.5 fill-indigo-500">
                        <circle cx="3" cy="3" r="3" />
                      </svg>
                    )}

                    {tab.name}
                  </span>
                )}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="border p-1 flex-1 rounded-lg border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900">
            {tabs.map(tab => (
              <Tab.Panel className="h-full" key={tab.name}>
                {tab.component({ code, commands })}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default Widgets
