import { Event, MessageReceivedEvent, ReadyEvent } from '@manasai/events'
import EventEmitter from 'events'

import logger from '../core/logger'
import { Socket } from '../types'
import db from '../core/database'
import { WorkspaceEntity } from '../models'

export default (events: EventEmitter) => {
  events.on('MESSAGE_RECEIVED', (event: MessageReceivedEvent) => {
    logger.info(`Message received: ${event.payload.content}`)
  })

  events.on('CONNECTED', async (event: Event, socket: Socket) => {
    logger.info('Connected', event)

    const workspaces = await db.manager.find(WorkspaceEntity)

    socket.emit({
      type: 'READY',
      payload: {
        workspaces: workspaces.map(workspace => ({
          id: workspace.id,
          name: workspace.name
        })),
        messages: [
          {
            author: 'ASSISTANT',
            content: `Hi there! I'm ManasAI. Your buddy engineer, you can ask me a question or tell me your requirements for the project. I'm here to help you.`
          }
        ]
      }
    } as ReadyEvent)
  })
}
