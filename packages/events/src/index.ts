export class Workspace {
  id: string
  name: string
}

export type MessageAuthor = 'USER' | 'ASSISTANT'

export interface DeviceMetadata {
  deviceToken: string
}

export interface ReadPayload {
  workspaces: Workspace[]
  messages: Message[]
}

export interface Message {
  author: MessageAuthor
  content: string
}

export type EventTypes =
  | 'WORKSPACE_CREATED'
  | 'WORKSPACE_DELETED'
  | 'WORKSPACE_CHANGED'
  | 'MESSAGE_RECEIVED'
  | 'READY'
  | 'CONNECTED'
  | 'DISCONNECTED'

export interface Event {
  type: EventTypes
}

export interface EventWithPayload<T> extends Event {
  payload: T
}

export interface WorkspaceCreatedEvent
  extends EventWithPayload<Workspace & DeviceMetadata> {
  type: 'WORKSPACE_CREATED'
}

export interface WorkspaceDeletedEvent
  extends EventWithPayload<Workspace & DeviceMetadata> {
  type: 'WORKSPACE_DELETED'
}

export interface WorkspaceChangedEvent
  extends EventWithPayload<Workspace & DeviceMetadata> {
  type: 'WORKSPACE_CHANGED'
}

export interface MessageReceivedEvent
  extends EventWithPayload<Message & DeviceMetadata> {
  type: 'MESSAGE_RECEIVED'
}

export interface ConnectedEvent extends EventWithPayload<DeviceMetadata> {
  type: 'CONNECTED'
}

export interface DisconnectedEvent extends EventWithPayload<DeviceMetadata> {
  type: 'DISCONNECTED'
}

export interface ReadyEvent
  extends EventWithPayload<ReadPayload & DeviceMetadata> {
  type: 'READY'
}
