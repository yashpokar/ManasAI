import { createServer } from 'http'
import { WebSocketServer } from 'ws'

import { API_PORT } from './core/config'
import logger from './core/logger'
import EventsHandler from './core/events'

import './core/database'

const server = createServer()

new EventsHandler(
  new WebSocketServer({
    server
  })
).handle()

server.listen(API_PORT, async () => {
  logger.info(`API server listening on port ${API_PORT}`)
})
