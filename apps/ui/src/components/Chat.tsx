import React, { useState } from 'react'
import { MessageReceivedEvent } from '@manasai/events'

import { useSocket } from '../providers/SocketProvider'
import { useWorkspace } from '../providers/WorkspaceProvider'

const Chat: React.FC = () => {
  const [query, setQuery] = useState('')
  const { emit } = useSocket()
  const { workspaces } = useWorkspace()

  const onMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    emit({
      type: 'MESSAGE_RECEIVED',
      payload: {
        author: 'USER',
        content: query
      }
    } as MessageReceivedEvent)

    setQuery('')
  }

  const onEnterPress = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      return onMessageSubmit(e)
    }
  }

  return (
    <div className="flex flex-col w-full h-full rounded-lg bg-zinc-200 dark:bg-zinc-800">
      <div className="flex-1"></div>

      <form
        className="relative py-2 px-4 lg:py-4 lg:px-6"
        onSubmit={onMessageSubmit}
      >
        <textarea
          className="w-full border-0 resize-none max-h-full rounded-lg text-sm leading-5 tracking-wide font-chat p-2 shadow-none md:p-3.5 bg-zinc-100 transition placeholder:text-zinc-400 focus:ring-0 focus:bg-opacity-75 dark:bg-zinc-700 dark:text-white"
          placeholder="Your requirements here..."
          data-testid="chat-input"
          onChange={e => setQuery(e.target.value)}
          onKeyDown={onEnterPress}
          value={query}
          disabled={workspaces.length === 0}
        ></textarea>

        <button
          className="absolute bottom-8 right-8 mr-0.5 mb-0.5 text-sm py-1.5 px-2.5 rounded-lg font-medium text-zinc-50 bg-green-500 transition focus:outline-none hover:bg-green-600 focus:bg-green-600"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default Chat
