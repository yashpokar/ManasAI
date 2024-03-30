import { createServer } from 'http'
import { WebSocket, WebSocketServer } from 'ws'

import { API_PORT } from './core/config'
import logger from './core/logger'

const server = createServer()
const wss = new WebSocketServer({
  server
})

wss.on('connection', (ws: WebSocket) => {
  ws.on('error', logger.error)

  ws.on('message', data => {
    logger.info('received: %s', data)
  })

  ws.send('something')
})

server.listen(API_PORT, () => {
  logger.info(`API server listening on port ${API_PORT}`)
})
