import React, { useEffect, useRef, useState } from 'react'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import ShortUniqueId from 'short-unique-id'
import clsx from 'clsx'
import { useWorkspace } from '../providers/WorkspaceProvider'
import { useSocket } from '../providers/SocketProvider'
import { WorkspaceCreatedEvent } from '@manasai/events'

interface AddWorkspaceProps {
  show: boolean
}

const AddWorkspace: React.FC<AddWorkspaceProps> = ({ show }) => {
  const { workspaces, addWorkspace, onWorkspaceChange, isNameTaken } =
    useWorkspace()
  const [name, setName] = useState('')
  const [visibility, setVisibility] = useState(show)
  const [error, setError] = useState('')
  const { emit } = useSocket()

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setVisibility(show)
  }, [show])

  useEffect(() => {
    if (workspaces.length === 0) return

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setVisibility(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [workspaces])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = new ShortUniqueId().randomUUID(6)

    if (isNameTaken(name)) {
      setError('Workspace name already exists')
      return
    }

    addWorkspace({
      name,
      id
    })

    emit({
      type: 'WORKSPACE_CREATED',
      payload: {
        id,
        name
      }
    } as WorkspaceCreatedEvent)

    // TODO: wait for the workspace to be created, let the server acknowledge it
    // before closing the modal

    onWorkspaceChange(id)
    setName('')
    setVisibility(false)
  }

  const onWorkspaceNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.replace(/[^a-zA-Z0-9_-]/g, '')
    if (name.length > 0 && !/^[a-zA-Z]/.test(name)) {
      setError('Workspace name must start with a letter')
      return
    }

    setError('')
    setName(name)
  }

  if (!visibility) return null

  return (
    <div className="fixed flex justify-center items-center inset-0 z-50 opacity-90 bg-zinc-200 dark:bg-zinc-800">
      <div
        className="p-4 md:p-6 lg:p-10 rounded-lg w-1/3 bg-zinc-50 dark:bg-zinc-900"
        ref={modalRef}
      >
        <div className="">
          <span className="font-semibold select-none text-zinc-700 dark:text-zinc-100">
            Create workspace
          </span>
        </div>

        <form className="grid gap-2 md:gap-4 lg:gap-6 mt-4" onSubmit={onSubmit}>
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
              onChange={onWorkspaceNameChange}
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
    </div>
  )
}

export default AddWorkspace
