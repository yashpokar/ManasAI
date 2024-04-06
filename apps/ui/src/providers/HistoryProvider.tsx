import {
  EventWithPayload,
  Message,
  MessageReceivedEvent
} from '@manasai/common'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { useSocket } from './SocketProvider'

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
  const { on } = useSocket()

  const addMessage = useCallback((message: Message) => {
    setMessages(prevMessages => [...prevMessages, message])
  }, [])

  useEffect(() => {
    on('MESSAGE_RECEIVED', (event: EventWithPayload<unknown>) => {
      addMessage(event.payload as MessageReceivedEvent['payload'])
    })
  }, [on, addMessage])

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
