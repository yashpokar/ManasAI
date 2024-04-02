import { createContext, useContext, useEffect, useCallback } from 'react'
import { Event, EventWithPayload } from '@manasai/events'

interface SocketContextProps {
  emit: (event: EventWithPayload<unknown> | Event) => void
}

interface SocketProviderProps {
  client: WebSocket
  children: React.ReactNode
}

const SocketContext = createContext<SocketContextProps>({
  emit: () => {
    throw new Error('SocketProvider is not initialized')
  }
})

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  client
}) => {
  const emit = useCallback(
    (event: EventWithPayload<unknown> | Event) => {
      client.send(JSON.stringify(event))
    },
    [client]
  )

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      console.log({ event })
    }

    const onOpen = () => {
      emit({ type: 'CONNECTED' })
    }

    const onClose = () => {
      emit({ type: 'DISCONNECTED' })
    }

    client.addEventListener('open', onOpen)
    client.addEventListener('close', onClose)
    client.addEventListener('message', onMessage)

    return () => {
      client.removeEventListener('message', onMessage)
      client.removeEventListener('open', onOpen)
      client.removeEventListener('close', onClose)
    }
  }, [client, emit])

  return (
    <SocketContext.Provider value={{ emit }}>{children}</SocketContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  const context = useContext(SocketContext)

  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }

  return context
}
