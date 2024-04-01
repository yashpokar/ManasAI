export class Workspace {
  id: string
  name: string
}

export type MessageAuthor = 'USER' | 'ASSISTANT'

export interface Message {
  author: MessageAuthor
  content: string
}

export enum EventTypes {
  WORKSPACE_CREATED = 'WORKSPACE_CREATED',
  WORKSPACE_DELETED = 'WORKSPACE_DELETED',
  WORKSPACE_CHANGED = 'WORKSPACE_CHANGED',
  MESSAGE_RECEIVED = 'MESSAGE_RECEIVED'
}

export interface Event<T> {
  type: EventTypes
  payload: T
}
