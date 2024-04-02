import {
  MessageReceivedEvent,
  WorkspaceCreatedEvent,
  WorkspaceDeletedEvent
} from '@manasai/events'
import logger from '../core/logger'
import { HandlerOptions } from '../types'
import EventEmitter from 'events'

export default (events: EventEmitter) => {
  events.on(
    'WORKSPACE_CREATED',
    (event: WorkspaceCreatedEvent, { emit }: HandlerOptions) => {
      logger.info(`Workspace created: ${event.payload.name}`, emit)

      emit({
        type: 'MESSAGE_RECEIVED',
        payload: {
          author: 'ASSISTANT',
          content: `Workspace ${event.payload.name} created`
        }
      } as MessageReceivedEvent)
    }
  )

  events.on('WORKSPACE_CHANGED', (event: WorkspaceCreatedEvent) => {
    logger.info(`Workspace changed: ${event.payload.name}`)
  })

  events.on('WORKSPACE_DELETED', (event: WorkspaceDeletedEvent) => {
    logger.info(`Workspace deleted: ${event.payload.name}`)
  })
}
