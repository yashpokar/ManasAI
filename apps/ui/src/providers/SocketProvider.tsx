import { createContext, useContext, useEffect } from 'react'

interface SocketContextProps {}

interface SocketProviderProps {
  client: WebSocket
  children: React.ReactNode
}

const SocketContext = createContext<SocketContextProps>({})

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  client
}) => {
  useEffect(() => {
    client.onopen = () => {
      console.log('connected')

      client.send('Hello, Server!')
    }

    client.onclose = () => {
      console.log('disconnected')
    }

    client.onerror = () => {
      console.log('error')
    }
  }, [client])

  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  const context = useContext(SocketContext)

  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }

  return context
}
