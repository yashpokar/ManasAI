import {
  ConnectedEvent,
  MessageReceivedEvent,
  ReadyEvent
} from '@manasai/events'

import logger from '../core/logger'
import { Socket } from '../types'
import db from '../core/database'
import { WorkspaceEntity } from '../models'

export const onMessageReceived = (event: MessageReceivedEvent) => {
  logger.info(`Message received: ${event.payload.content}`)
}

export const onConnected = async (event: ConnectedEvent, socket: Socket) => {
  const workspaces = await db.manager
    .createQueryBuilder(WorkspaceEntity, 'workspace')
    .where('workspace.deviceToken = :deviceToken', {
      deviceToken: event.payload.deviceToken
    })
    .getMany()

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
}
