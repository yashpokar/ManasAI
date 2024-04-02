import {
  ConnectedEvent,
  MessageReceivedEvent,
  ReadyEvent
} from '@manasai/events'
import EventEmitter from 'events'

import logger from '../core/logger'
import { Socket } from '../types'
import db from '../core/database'
import { WorkspaceEntity } from '../models'

export default (events: EventEmitter) => {
  events.on('MESSAGE_RECEIVED', (event: MessageReceivedEvent) => {
    logger.info(`Message received: ${event.payload.content}`)
  })

  events.on('CONNECTED', async (event: ConnectedEvent, socket: Socket) => {
    const workspaces = await db.manager
      .createQueryBuilder(WorkspaceEntity, 'workspace')
      .where('workspace.deviceToken = :deviceToken', {
        deviceToken: event.payload.deviceToken
      })
      .getMany()

    logger.debug('DEvice token', event.payload.deviceToken)
    logger.debug('Workspaces', workspaces)

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
