import { EventTypes, Event } from '@manasai/events'
import {
  onWrokspaceChanged,
  onWrokspaceCreated,
  onWrokspaceDeleted
} from './workspace'
import { onMessage } from './message'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handlers: Record<EventTypes, (event: Event<any>) => Promise<void>> = {
  WORKSPACE_CREATED: onWrokspaceCreated,
  WORKSPACE_CHANGED: onWrokspaceChanged,
  WORKSPACE_DELETED: onWrokspaceDeleted,

  MESSAGE_RECEIVED: onMessage
}

export default handlers
