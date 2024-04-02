import { WorkspaceCreatedEvent, WorkspaceDeletedEvent } from '@manasai/events'
import logger from '../core/logger'
import { Socket } from '../types'
import EventEmitter from 'events'
import { WorkspaceEntity } from '../models'
import db from '../core/database'

export default (events: EventEmitter) => {
  events.on(
    'WORKSPACE_CREATED',
    async (event: WorkspaceCreatedEvent, socket: Socket) => {
      logger.info(`Workspace created: ${event.payload}`)

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
  )

  events.on('WORKSPACE_CHANGED', (event: WorkspaceCreatedEvent) => {
    logger.info(`Workspace changed: ${event.payload.name}`)
  })

  events.on('WORKSPACE_DELETED', (event: WorkspaceDeletedEvent) => {
    logger.info(`Workspace deleted: ${event.payload.name}`)
  })
}
