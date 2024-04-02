import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState
} from 'react'
import {
  ConnectedEvent,
  DisconnectedEvent,
  EventWithPayload,
  EventTypes
} from '@manasai/events'
import ShortUniqueId from 'short-unique-id'

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

const DEVICE_TOKEN_KEY = 'device_token'

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
  const [deviceToken, setDeviceToken] = useState<string>('')

  const emit = useCallback(
    (event: EventWithPayload<unknown>) => {
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
    if (!deviceToken) {
      let deviceId = localStorage.getItem(DEVICE_TOKEN_KEY)

      if (!deviceId) {
        deviceId = new ShortUniqueId().randomUUID(6)
        localStorage.setItem(DEVICE_TOKEN_KEY, deviceId)
      }

      if (deviceId) {
        setDeviceToken(deviceId)
      }
    }
  }, [deviceToken])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      console.log({ event })
    }

    const onOpen = () => {
      emit({
        type: 'CONNECTED',
        payload: {
          deviceToken
        }
      } as ConnectedEvent)
    }

    const onClose = () => {
      emit({ type: 'DISCONNECTED' } as DisconnectedEvent)
    }

    client.addEventListener('open', onOpen)
    client.addEventListener('close', onClose)
    client.addEventListener('message', onMessage)

    return () => {
      client.removeEventListener('message', onMessage)
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
