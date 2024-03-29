import express from 'express'
import { createServer } from 'node:http'

const app = express()
const server = createServer(app)

server.listen(8000, () => {
  console.log('server running at http://localhost:8000')
})
