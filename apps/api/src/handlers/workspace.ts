import { Workspace, Event } from '@manasai/events'
import logger from '../core/logger'

export const onWrokspaceCreated = async (event: Event<Workspace>) => {
  logger.info(`Workspace created: ${event.payload}`)
}

export const onWrokspaceChanged = async (event: Event<Workspace>) => {
  logger.info(`Workspace changed: ${event.payload}`)
}

export const onWrokspaceDeleted = async (event: Event<Workspace>) => {
  logger.info(`Workspace deleted: ${event.payload}`)
}
