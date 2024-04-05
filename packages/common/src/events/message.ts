import { EventWithPayload } from './types'
import { DeviceMetadata, Workspace } from './workspace'

export type MessageAuthor = 'USER' | 'ASSISTANT'

export interface ReadPayload {
  workspaces: Workspace[]
  messages: Message[]
}

export interface Message {
  author: MessageAuthor
  content: string
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
