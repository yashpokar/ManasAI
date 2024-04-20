import { DEVICE_ID, PROJECT_ID } from '@/constants'
import { IChatContext, Message, ProviderProps } from '@/types'
import { gql, useMutation, useSubscription } from '@apollo/client'
import React, { createContext, useCallback, useState } from 'react'

const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($content: String!) {
    createMessage(input: { content: $content, author: "USER" }) {
      id
      content
      author
    }
  }
`

const MESSAGES_SUBSCRIPTION = gql`
  subscription MessagesSubscription($projectId: String!, $deviceId: String!) {
    onMessage(projectId: $projectId, deviceId: $deviceId) {
      id
      content
      author
    }
  }
`

export const ChatContext = createContext<IChatContext>({
  messages: [],
  sendMessage: () => {},
  setMessages: () => {}
})

const ChatProvider: React.FC<ProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION)

  useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: {
      projectId: localStorage.getItem(PROJECT_ID),
      deviceId: localStorage.getItem(DEVICE_ID)
    },
    onData: ({
      data: {
        data: { onMessage }
      }
    }) => {
      addMessage(onMessage)
    }
  })

  const addMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message])
  }

  const sendMessageToServer = useCallback(
    (content: string) => {
      sendMessage({ variables: { content } })
    },
    [sendMessage]
  )

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        sendMessage: sendMessageToServer
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider
