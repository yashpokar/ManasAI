import React, { useState } from 'react'

import useProject from '@/hooks/use-project'
import useHistory from '@/hooks/use-history'
import Message from './Message'

const Chat: React.FC = () => {
  const [query, setQuery] = useState('')
  const { projects, activeProject } = useProject()
  const { messages } = useHistory()

  const onMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log(query)

    setQuery('')
  }

  const onEnterPress = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      return onMessageSubmit(e)
    }
  }

  return (
    <div className="flex flex-col w-full h-full rounded-lg bg-zinc-200 dark:bg-zinc-800">
      <div className="flex flex-col gap-y-2 md:gap-y-2.5 flex-1 p-2 md:p-4 lg:p-6 overflow-y-scroll">
        {messages.map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </div>

      <form
        className="relative mt-4 pb-2 px-4 lg:pb-4 lg:px-6"
        onSubmit={onMessageSubmit}
      >
        <textarea
          className="w-full border-0 resize-none max-h-full rounded-lg text-sm leading-5 tracking-wide font-chat p-2 shadow-none md:p-3.5 bg-zinc-100 transition placeholder:text-zinc-400 focus:h-32 focus:ring-0 focus:bg-opacity-75 dark:bg-zinc-700 dark:text-white"
          placeholder={`Your requirements here${!activeProject ? ' but after choosing project' : ''}...`}
          data-testid="chat-input"
          onChange={e => setQuery(e.target.value)}
          onKeyDown={onEnterPress}
          value={query}
          disabled={projects.length === 0}
          spellCheck={false}
        />

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
