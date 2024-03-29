import React from 'react'

export type MessageAuthor = 'user' | 'assistant'

export interface MessageProps {
  author: MessageAuthor
  context: string
}

const Message: React.FC<MessageProps> = () => {
  return <div className="flex items-center gap-x-2"></div>
}

export default Message
