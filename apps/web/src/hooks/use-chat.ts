import { ChatContext } from '@/providers/ChatProvider'
import { IChatContext } from '@/types'
import { useContext } from 'react'

const useChat = (): IChatContext => {
  const context = useContext(ChatContext)

  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }

  return context
}

export default useChat
