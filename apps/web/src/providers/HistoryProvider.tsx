import { IHistoryContext, Message, ProviderProps } from '@/types'
import React, { createContext, useCallback, useState } from 'react'

export const HistoryContext = createContext<IHistoryContext>({
  messages: [],
  addMessage: () => {},
  setMessages: () => {}
})

const HistoryProvider: React.FC<ProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([])

  const addMessage = useCallback((message: Message) => {
    setMessages(prevMessages => [...prevMessages, message])
  }, [])

  return (
    <HistoryContext.Provider value={{ messages, setMessages, addMessage }}>
      {children}
    </HistoryContext.Provider>
  )
}

export default HistoryProvider
