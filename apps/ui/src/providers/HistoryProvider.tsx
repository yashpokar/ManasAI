import { Message } from '@manasai/events'
import React, { createContext, useContext, useState } from 'react'

interface HistoryContext {
  messages: Message[]
  addMessage: (message: Message) => void
  setMessages: (messages: Message[]) => void
}

interface HistoryProviderProps {
  children: React.ReactNode
}

const HistoryContext = createContext<HistoryContext>({
  messages: [],
  addMessage: () => {},
  setMessages: () => {}
})

export const HistoryProvider: React.FC<HistoryProviderProps> = ({
  children
}) => {
  const [messages, setMessages] = useState<Message[]>([])

  const addMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message])
  }

  return (
    <HistoryContext.Provider value={{ messages, setMessages, addMessage }}>
      {children}
    </HistoryContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useHistory = (): HistoryContext => {
  const context = useContext(HistoryContext)

  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider')
  }

  return context
}
