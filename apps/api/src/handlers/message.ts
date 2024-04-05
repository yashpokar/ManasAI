import {
  ConnectedEvent,
  MessageReceivedEvent,
  ReadyEvent,
  TerminalCommandRunningEndedEvent
} from '@manasai/common'

import logger from '../core/logger'
import { Socket } from '../types'
import db from '../core/database'
import { WorkspaceEntity } from '../models'
import { createAgentExecutor } from '../core/agent'

const agentExecutor = createAgentExecutor()

const runIdMappings = new Map<string, string>()

export const onMessageReceived = async (
  event: MessageReceivedEvent,
  socket: Socket
) => {
  logger.debug(`Message received: ${event.payload.content}`)

  if (event.payload.content === '') {
    return
  }

  const result = await agentExecutor.invoke(
    {
      input: event.payload.content,
      workspace_id: 'cGvKJs' // TODO: Get workspace ID from the socket
    },
    {
      callbacks: [
        {
          handleToolStart(
            _tool,
            input,
            runId,
            _parentRunId,
            _tags,
            _metadata,
            name
          ) {
            if (!name) return

            runIdMappings.set(runId, name)

            if (name === 'terminal') {
              const { command } = JSON.parse(input)

              socket.emit({
                type: 'TERMINAL_COMMAND_RUNNING_STARTED',
                payload: {
                  command
                }
              })
            } else if (name === 'editor') {
              const { code } = JSON.parse(input)

              socket.emit({
                type: 'EDITOR_CODE_CHANGED',
                payload: {
                  code
                }
              })
            }
          },
          handleToolEnd(output: string, runId: string) {
            logger.debug(`output: ${output}, runId: ${runId}`)

            if (runIdMappings.get(runId) === 'terminal') {
              const event: TerminalCommandRunningEndedEvent = {
                type: 'TERMINAL_COMMAND_RUNNING_ENDED',
                payload: {
                  output
                }
              }

              socket.emit(event)
            }

            runIdMappings.delete(runId)
          }
        }
      ]
    }
  )

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
