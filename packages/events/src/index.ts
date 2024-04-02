export class Workspace {
  id: string
  name: string
}

export type MessageAuthor = 'USER' | 'ASSISTANT'

export interface Message {
  author: MessageAuthor
  content: string
}

export type EventTypes =
  | 'WORKSPACE_CREATED'
  | 'WORKSPACE_DELETED'
  | 'WORKSPACE_CHANGED'
  | 'MESSAGE_RECEIVED'
  | 'CONNECTED'
  | 'DISCONNECTED'

export interface Event {
  type: EventTypes
}

export interface EventWithPayload<T> extends Event {
  payload: T
}

export interface WorkspaceCreatedEvent extends EventWithPayload<Workspace> {
  type: 'WORKSPACE_CREATED'
}

export interface WorkspaceDeletedEvent extends EventWithPayload<Workspace> {
  type: 'WORKSPACE_DELETED'
}

export interface WorkspaceChangedEvent extends EventWithPayload<Workspace> {
  type: 'WORKSPACE_CHANGED'
}

export interface MessageReceivedEvent extends EventWithPayload<Message> {
  type: 'MESSAGE_RECEIVED'
}

export interface ConnectedEvent extends Event {
  type: 'CONNECTED'
}

export interface DisconnectedEvent extends Event {
  type: 'DISCONNECTED'
}
