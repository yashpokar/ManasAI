import { createContext, useContext, useEffect, useCallback } from 'react'
import {
  DisconnectedEvent,
  EventWithPayload,
  EventTypes
} from '@manasai/events'
import { useDeviceInfo } from './DeviceInfoProvider'

interface SocketContextProps {
  emit: (event: EventWithPayload<unknown>) => void
  on: (
    event: EventTypes,
    listener: (event: EventWithPayload<unknown>) => void
  ) => void
}

interface SocketProviderProps {
  client: WebSocket
  children: React.ReactNode
}

const SocketContext = createContext<SocketContextProps>({
  emit: () => {
    throw new Error('SocketProvider is not initialized')
  },
  on: () => {
    throw new Error('SocketProvider is not initialized')
  }
})

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  client
}) => {
  const { token: deviceToken } = useDeviceInfo()

  const emit = useCallback(
    (event: EventWithPayload<unknown>) => {
      if (!deviceToken) {
        throw new Error('Device token is not available')
      }

      client.send(
        JSON.stringify({
          ...event,
          payload: {
            ...(event.payload ?? {}),
            deviceToken
          }
        })
      )
    },
    [client, deviceToken]
  )

  const on = useCallback(
    (
      event: EventTypes,
      listener: (event: EventWithPayload<unknown>) => void
    ) => {
      client.addEventListener('message', (e: MessageEvent) => {
        const data = JSON.parse(e.data) as EventWithPayload<unknown>

        if (data.type !== event) return

        listener(data)
      })
    },
    [client]
  )

  useEffect(() => {
    if (!deviceToken) return

    const onOpen = () => {}

    const onClose = () => {
      emit({ type: 'DISCONNECTED' } as DisconnectedEvent)
    }

    client.addEventListener('open', onOpen)
    client.addEventListener('close', onClose)

    return () => {
      client.removeEventListener('open', onOpen)
      client.removeEventListener('close', onClose)
    }
  }, [client, emit, deviceToken])

  return (
    <SocketContext.Provider value={{ emit, on }}>
      {children}
    </SocketContext.Provider>
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
