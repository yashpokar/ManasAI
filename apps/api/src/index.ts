import express from 'express'
import { createServer } from 'node:http'

import { API_PORT, API_URL } from 'core'
import logger from 'core/dist/logger'

const app = express()
const server = createServer(app)

server.listen(API_PORT, () => {
  logger.info(`server running at ${API_URL}`)
})
