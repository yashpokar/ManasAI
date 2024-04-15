import { DEVICE_ID } from '@/constants'
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
  sending: false,
  messages: [],
  sendMessage: () => {},
  setMessages: () => {}
})

const ChatProvider: React.FC<ProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [sendMessage, { loading: sending }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      onCompleted: ({ data }) => {
        console.log(`Message sent with id: ${data.createMessage.id}`)
      }
    }
  )

  useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: {
      projectId: '468c0112-8ae9-4131-bf11-f1715e527661',
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
        sendMessage: sendMessageToServer,
        sending
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider
