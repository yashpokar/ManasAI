import {
  ConnectedEvent,
  MessageReceivedEvent,
  ReadyEvent
} from '@manasai/events'

import logger from '../core/logger'
import { Socket } from '../types'
import db from '../core/database'
import { WorkspaceEntity } from '../models'
import { createAgentExecutor } from '../core/agent'

const agentExecutor = createAgentExecutor()

export const onMessageReceived = async (event: MessageReceivedEvent) => {
  logger.debug(`Message received: ${event.payload.content}`)

  if (event.payload.content === '') {
    return
  }

  const result = await agentExecutor.invoke({
    input: event.payload.content,
    workspace_id: 'cGvKJs' // TODO: Get workspace ID from the socket
  })

  logger.debug(`Agent result: ${JSON.stringify(result)}`)
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
