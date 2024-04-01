import { Server } from 'ws'
import { Event } from '@manasai/events'
import logger from './logger'

class EventsHandler {
  protected client: Server

  constructor(client: Server) {
    this.client = client
  }

  handle() {
    this.client.on('connection', ws => {
      ws.on('error', err => logger.error(`Error: ${err}`))

      ws.on('message', data => {
        try {
          const event = JSON.parse(data.toString()) as Event<unknown>

          logger.info(`Event received: ${event.type}`)
        } catch (error) {
          logger.error(`Error parsing event: ${error}`)
        }
      })
    })
  }
}

export default EventsHandler
