import { createServer } from 'http'
import { WebSocketServer } from 'ws'
import EventEmitter from 'events'
import { Event, EventWithPayload } from '@manasai/events'
import handlers from './handlers'

import { API_PORT } from './core/config'
import logger from './core/logger'
import './core/database'

const events = new EventEmitter()
const server = createServer()

const socket = new WebSocketServer({
  server
})

handlers(events)

socket.on('connection', ws => {
  ws.on('error', err => logger.error(`Error: ${err}`))

  ws.on('message', data => {
    try {
      logger.debug(`Data received: ${data}`)

      const event = JSON.parse(data.toString()) as Event

      if (!event.type) {
        throw new Error('Event type is required')
      }

      events.emit(event.type, event, {
        emit: (event: Event | EventWithPayload<unknown>) => {
          socket.clients.forEach(client => {
            if (client.readyState === 1) {
              client.send(JSON.stringify(event))
            }
          })
        }
      })

      logger.info(`Event received: ${event.type}`)
    } catch (error) {
      logger.error(`Error parsing event: ${error}`)
    }
  })
})

server.listen(API_PORT, async () => {
  logger.info(`API server listening on port ${API_PORT}`)
})
