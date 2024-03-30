import path from 'path'
import sqlite from 'sqlite3'
import logger from './logger'

const db = new sqlite.Database(
  path.resolve(__dirname, '../../tmp/database.sqlite'),
  err => {
    if (err) {
      logger.error('Failed to connect to the database', err)
      process.exit(1)
    } else {
      logger.info('Connected to the database')
    }
  }
)

export default db
