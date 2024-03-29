import React, { useState } from 'react'

const Chat: React.FC = () => {
  const [query, setQuery] = useState('')

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
      <div className="flex-1"></div>

      <form className="relative py-2 px-4" onSubmit={onMessageSubmit}>
        <textarea
          className="w-full border-0 resize-none max-h-full rounded-lg text-sm leading-5 tracking-wide font-chat p-2 shadow-none md:p-3.5 bg-zinc-100 placeholder:text-zinc-400 focus:ring-0 dark:bg-zinc-700 dark:text-white"
          placeholder="Your requirements here..."
          data-testid="chat-input"
          onChange={e => setQuery(e.target.value)}
          onKeyDown={onEnterPress}
          value={query}
        ></textarea>

        <button
          className="absolute bottom-6 right-6 text-sm py-1.5 px-2.5 rounded-lg font-medium text-zinc-50 bg-green-500"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default Chat
