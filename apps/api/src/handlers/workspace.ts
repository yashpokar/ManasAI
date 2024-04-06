import {
  WorkspaceChangedEvent,
  WorkspaceCreatedEvent,
  WorkspaceDeletedEvent
} from '@manasai/common'
import fs from 'fs'
import logger from '../core/logger'
import { Socket } from '../types'
import { WorkspaceEntity } from '../models'
import db from '../core/database'
import { getWorkspacePath } from '../utils'

export const onWorkspaceCreated = async (
  event: WorkspaceCreatedEvent,
  socket: Socket
) => {
  logger.debug(`Workspace created: ${event.payload}`)

  const workspaceDirectory = getWorkspacePath(event.payload.id)

  fs.mkdirSync(workspaceDirectory, { recursive: true })

  await db.manager.save(WorkspaceEntity, {
    id: event.payload.id,
    name: event.payload.name,
    deviceToken: event.payload.deviceToken,
    active: false
  })

  socket.emit({
    type: 'WORKSPACE_CREATED',
    payload: event.payload
  } as WorkspaceCreatedEvent)
}

export const onWorkspaceDeleted = async (
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

export const onWorkspaceChanged = async (event: WorkspaceChangedEvent) => {
  logger.debug(`Workspace changed: ${event.payload}`)

  await db.manager.transaction(async manager => {
    manager.update(
      WorkspaceEntity,
      {
        active: true
      },
      {
        active: false
      }
    )

    manager.update(
      WorkspaceEntity,
      {
        id: event.payload.id
      },
      {
        active: true
      }
    )
  })
}
