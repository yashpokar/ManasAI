import { Event, MessageReceivedEvent } from '@manasai/events'
import logger from '../core/logger'
import { HandlerOptions } from '../types'
import EventEmitter from 'events'

export default (events: EventEmitter) => {
  events.on('MESSAGE_RECEIVED', (event: MessageReceivedEvent) => {
    logger.info(`Message received: ${event.payload.content}`)
  })

  events.on('CONNECTED', (event: Event, { emit }: HandlerOptions) => {
    logger.info('Connected', event, emit)

    emit({
      type: 'MESSAGE_RECEIVED',
      payload: {
        author: 'ASSISTANT',
        content: 'Hello, world!'
      }
    } as MessageReceivedEvent)
  })
}
