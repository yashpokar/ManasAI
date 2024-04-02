import {
  WorkspaceChangedEvent,
  WorkspaceCreatedEvent,
  WorkspaceDeletedEvent
} from '@manasai/events'
import logger from '../core/logger'
import { Socket } from '../types'
import EventEmitter from 'events'
import { WorkspaceEntity } from '../models'
import db from '../core/database'

const onWorkspaceCreated = async (
  event: WorkspaceCreatedEvent,
  socket: Socket
) => {
  logger.debug(`Workspace created: ${event.payload}`)

  await db.manager.save(WorkspaceEntity, {
    id: event.payload.id,
    name: event.payload.name,
    deviceToken: event.payload.deviceToken
  })

  socket.emit({
    type: 'WORKSPACE_CREATED',
    payload: event.payload
  } as WorkspaceCreatedEvent)
}

const onWorkspaceDeleted = async (
  event: WorkspaceDeletedEvent,
  socket: Socket
) => {
  logger.debug(`Workspace deleted: ${event.payload}`)

  await db.manager.delete(WorkspaceEntity, event.payload.id)

  socket.emit({
    type: 'WORKSPACE_DELETED',
    payload: event.payload
  } as WorkspaceDeletedEvent)
}

const onWorkspaceChanged = async (event: WorkspaceChangedEvent) => {
  logger.debug(`Workspace changed: ${event.payload}`)
}

export default (events: EventEmitter) => {
  events.on('WORKSPACE_CREATED', onWorkspaceCreated)
  events.on('WORKSPACE_CHANGED', onWorkspaceChanged)
  events.on('WORKSPACE_DELETED', onWorkspaceDeleted)
}
