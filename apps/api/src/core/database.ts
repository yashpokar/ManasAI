import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { Workspace, Task } from '../models'
import logger from './logger'
import path from 'path'

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: path.join(__dirname, '..', '..', '..', '..', 'tmp', 'db.sqlite'),
  entities: [Workspace, Task],
  synchronize: true,
  logging: false
})

AppDataSource.initialize()
  .then(() => logger.info('Database initialized'))
  .catch(error => logger.error('Error initializing database', error))

export default AppDataSource
