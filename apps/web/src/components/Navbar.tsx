import React, { Fragment, useEffect, useRef, useState } from 'react'
import {
  SunIcon,
  MoonIcon,
  QueueListIcon,
  PlusCircleIcon,
  CheckIcon
} from '@heroicons/react/24/outline'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import useTheme from '@/hooks/use-theme'
import useProject from '@/hooks/use-project'
import NewProject from '@/components/NewProject'

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  const { projects, activeProject, changeActiveProject } = useProject()
  const [isNewProjectDialogOpen, openNewProjectDialog] = useState(
    projects.length === 0
  )

  const projectSelectorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (projects.length > 0) {
      openNewProjectDialog(false)
    }
  }, [projects, activeProject])

  return (
    <nav className="flex flex-col justify-between p-2 w-full h-full rounded-lg bg-zinc-200 dark:bg-zinc-800">
      <NewProject
        visible={isNewProjectDialogOpen}
        setVisibility={openNewProjectDialog}
      />

      <ul className="">
        <li className="">
          <Popover className="relative text-center" ref={projectSelectorRef}>
            {({ open, close }) => (
              <>
                <Popover.Button
                  className={clsx(
                    'p-0.5 md:p-1.5 rounded-full focus:outline-none hover:bg-zinc-300 dark:hover:bg-zinc-700',
                    {
                      'bg-zinc-300 dark:bg-zinc-700': open
                    }
                  )}
                  onClick={close}
                  data-testid="project-selector-button"
                >
                  <QueueListIcon className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
                </Popover.Button>
                <Popover.Overlay className="fixed inset-0 bg-zinc-900 opacity-30" />

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-150"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 right-12 -top-1 w-48 shadow-xl">
                    <div className="grid gap-y-1.5 p-2 rounded-lg bg-zinc-100 border-zinc-300 dark:bg-zinc-700 dark:border-zinc-800">
                      {projects.map(({ id, name }) => (
                        <button
                          key={id}
                          className={clsx(
                            'flex justify-between py-2 px-4 text-left text-sm font-medium rounded-lg',
                            {
                              'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600  hover:dark:bg-indigo-500':
                                activeProject?.id === id
                            },
                            {
                              'text-zinc-600 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-600':
                                activeProject?.id !== id
                            }
                          )}
                          onClick={() => {
                            changeActiveProject(id)
                            close()
                          }}
                          data-testid="project-selector-option"
                        >
                          {name}

                          {activeProject?.id === id && (
                            <CheckIcon className="w-4 h-4" strokeWidth={2.5} />
                          )}
                        </button>
                      ))}

                      {projects.length > 0 && (
                        <hr className="border-zinc-300 dark:border-zinc-800 opacity-45 my-1" />
                      )}

                      <button
                        className="py-2 text-xs font-semibold text-zinc-700 rounded-lg transition duration-75 dark:text-green-50 hover:text-zinc-50 hover:bg-green-500"
                        onClick={() => {
                          openNewProjectDialog(true)
                        }}
                      >
                        <PlusCircleIcon className="w-5 h-5 inline-block mr-2" />
                        Add New
                      </button>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
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
