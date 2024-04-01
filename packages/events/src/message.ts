export type MessageAuthor = 'USER' | 'ASSISTANT'

export interface Message {
  author: MessageAuthor
  content: string
}
