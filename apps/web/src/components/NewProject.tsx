import React, { Fragment, useState } from 'react'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import ShortUniqueId from 'short-unique-id'
import clsx from 'clsx'
import { useWorkspace } from '../providers/ProjectProvider'
import { Dialog, Transition } from '@headlessui/react'
import { useTheme } from '../providers/ThemeProvider'

interface NewWorkspaceProps {
  visible: boolean
  setVisibility: (visible: boolean) => void
}

const NewProject: React.FC<NewWorkspaceProps> = ({
  setVisibility,
  visible
}) => {
  const { workspaces, addWorkspace, onWorkspaceChange, isNameTaken } =
    useWorkspace()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const { isDarkMode } = useTheme()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const id = new ShortUniqueId().randomUUID(6)

    if (isNameTaken(name)) {
      setError('Project name already taken')
      return
    }

    addWorkspace({
      name,
      id
    })

    // TODO: wait for the workspace to be created, let the server acknowledge it
    // before closing the modal

    onWorkspaceChange(id)
    setName('')
    setVisibility(false)
  }

  const onProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.replace(/[^a-zA-Z0-9_-]/g, '')
    if (name.length > 0 && !/^[a-zA-Z]/.test(name)) {
      setError('Project name must start with a letter')
      return
    }

    setError('')
    setName(name)
  }

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        onClose={() => setVisibility(false)}
        as="div"
        className="relative z-30"
        data-mode={isDarkMode ? 'dark' : 'light'}
      >
        <div className="fixed inset-0 bg-zinc-400 dark:bg-zinc-700 bg-opacity-80 dark:bg-opacity-80" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="flex items-center justify-center pointer-events-none fixed inset-y-0 right-0 max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Dialog.Panel className="flex items-center justify-center h-full pointer-events-auto w-screen">
                  <div className="p-4 md:p-6 lg:p-10 rounded-lg w-1/3 bg-zinc-50 dark:bg-zinc-900">
                    <div className="">
                      <Dialog.Title className="font-semibold select-none text-zinc-700 dark:text-zinc-100">
                        New Project
                      </Dialog.Title>
                    </div>

                    <form
                      className="grid gap-2 md:gap-4 lg:gap-6 mt-4"
                      onSubmit={onSubmit}
                    >
                      <div className="">
                        <input
                          type="text"
                          className={clsx(
                            'border py-2.5 font-chat text-sm rounded-lg w-full dark:bg-zinc-800 dark:text-zinc-200 focus:ring-0 dark:focus:border-zinc-700',
                            {
                              'border-red-500 focus:border-red-500': error
                            },
                            {
                              'border-zinc-200 dark:border-zinc-900 focus:border-zinc-200 dark:focus:border-zinc-900':
                                !error
                            }
                          )}
                          onChange={onProjectNameChange}
                          value={name}
                          spellCheck="false"
                          required
                        />

                        {error && (
                          <span className="text-red-500 text-xs font-semibold mt-1">
                            {error}
                          </span>
                        )}
                      </div>

                      <div className="flex justify-end gap-x-2 lg:gap-x-4">
                        <button
                          type="button"
                          className={clsx(
                            'flex items-center text-xs font-semibold py-2 px-4 select-none rounded-lg text-zinc-700 bg-zinc-200 disabled:cursor-not-allowed focus:outline-none dark:text-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 focus:bg-zinc-300 dark:focus:bg-zinc-700 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-400',
                            {
                              'hover:bg-zinc-300': workspaces.length > 0
                            }
                          )}
                          data-testid="close-add-workspace-button"
                          disabled={workspaces.length === 0}
                          onClick={() => setVisibility(false)}
                        >
                          <XMarkIcon className="w-5 h-5 mr-1" />
                          Close
                        </button>

                        <button
                          type="submit"
                          className="flex items-center text-xs font-semibold py-2 px-4 select-none rounded-lg text-zinc-100 focus:outline-none dark:text-zinc-100 bg-green-600 hover:bg-green-700 focus:bg-green-700"
                          data-testid="submit-add-workspace-button"
                        >
                          <PlusIcon className="w-5 h-5 mr-1" />
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default NewProject