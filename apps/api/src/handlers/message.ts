import { Event, Message } from '@manasai/events'
import logger from '../core/logger'

export const onMessage = async (event: Event<Message>) => {
  logger.info(`Message received: ${event.payload}`)
}
