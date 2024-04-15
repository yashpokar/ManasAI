import { IChatContext, Message, ProviderProps } from '@/types'
import React, { createContext, useCallback, useState } from 'react'

export const ChatContext = createContext<IChatContext>({
  messages: [],
  addMessage: () => {},
  setMessages: () => {}
})

const ChatProvider: React.FC<ProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([])

  const addMessage = useCallback((message: Message) => {
    setMessages(prevMessages => [...prevMessages, message])
  }, [])

  return (
    <ChatContext.Provider value={{ messages, setMessages, addMessage }}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider
