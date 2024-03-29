import React, { useEffect, useRef, useState } from 'react'
import {
  SunIcon,
  MoonIcon,
  QueueListIcon,
  PlusCircleIcon,
  CheckIcon
} from '@heroicons/react/24/outline'
import { Popover } from '@headlessui/react'
import clsx from 'clsx'
import { useTheme } from '../providers/ThemeProvider'
import { useWorkspace } from '../providers/WorkspaceProvider'
import AddWorkspace from './AddWorkspace'

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  const { workspaces, activeWorkspace, onWorkspaceChange } = useWorkspace()
  const [workspaceSelectorOpen, shouldOpenShowWorkspaceSelector] =
    useState(false)
  const [showAddWorkspace, shouldShowAddWorkspace] = useState(false)

  const workspaceSelectorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        workspaceSelectorRef.current &&
        !workspaceSelectorRef.current.contains(event.target as Node)
      ) {
        shouldOpenShowWorkspaceSelector(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [workspaceSelectorRef])

  const onWorkspaceIdChange = (id: string) => {
    onWorkspaceChange(id)
    shouldOpenShowWorkspaceSelector(false)
  }

  return (
    <nav className="flex flex-col justify-between p-2 w-full h-full rounded-lg bg-zinc-200 dark:bg-zinc-800">
      <AddWorkspace show={workspaces.length === 0 || showAddWorkspace} />

      <ul className="">
        <li className="">
          <Popover className="relative text-center" ref={workspaceSelectorRef}>
            <Popover.Button
              className={clsx(
                'p-0.5 md:p-1.5 rounded-full focus:outline-none hover:bg-zinc-300 dark:hover:bg-zinc-700',
                {
                  'bg-zinc-300 dark:bg-zinc-700': workspaceSelectorOpen
                }
              )}
              onClick={() => shouldOpenShowWorkspaceSelector(ps => !ps)}
              data-testid="workspace-selector-button"
            >
              <QueueListIcon className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </Popover.Button>

            {workspaceSelectorOpen && (
              <Popover.Panel
                className="absolute z-10 right-12 -top-1 w-48 shadow-xl"
                static
              >
                <div className="grid p-2 rounded-lg bg-zinc-100 border-zinc-300 dark:bg-zinc-700 dark:border-zinc-800">
                  {workspaces.map(({ id, name }) => (
                    <button
                      key={id}
                      className="flex justify-between py-2 px-4 text-left text-sm font-medium rounded-lg text-zinc-600 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-600"
                      onClick={() => onWorkspaceIdChange(id)}
                      data-testid="workspace-selector-option"
                    >
                      {name}

                      {activeWorkspace?.id === id && (
                        <CheckIcon className="w-4 h-4" strokeWidth={2.5} />
                      )}
                    </button>
                  ))}

                  {workspaces.length > 0 && (
                    <hr className="border-zinc-300 dark:border-zinc-800 opacity-45 my-2" />
                  )}

                  <button
                    className="py-2 text-xs font-semibold text-zinc-700 rounded-lg dark:text-green-50 hover:text-zinc-50 hover:bg-green-500"
                    onClick={() => shouldShowAddWorkspace(true)}
                  >
                    <PlusCircleIcon className="w-5 h-5 inline-block mr-2" />
                    Add New
                  </button>
                </div>
              </Popover.Panel>
            )}
          </Popover>
        </li>
      </ul>

      <ul className="flex flex-col">
        <li className="">
          <button
            className="p-0.5 md:p-1 rounded-full focus:outline-none hover:bg-zinc-300 dark:hover:bg-zinc-700"
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
