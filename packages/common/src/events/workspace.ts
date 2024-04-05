import { EventWithPayload } from './types'

export class Workspace {
  id: string
  name: string
}

export interface DeviceMetadata {
  deviceToken: string
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
