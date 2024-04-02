import { EventEmitter } from 'events'
import {
  onWorkspaceChanged,
  onWorkspaceCreated,
  onWorkspaceDeleted
} from './workspace'
import { onConnected, onMessageReceived } from './message'

export default (events: EventEmitter) => {
  events.on('WORKSPACE_CREATED', onWorkspaceCreated)
  events.on('WORKSPACE_CHANGED', onWorkspaceChanged)
  events.on('WORKSPACE_DELETED', onWorkspaceDeleted)

  events.on('CONNECTED', onConnected)
  events.on('MESSAGE_RECEIVED', onMessageReceived)
}
