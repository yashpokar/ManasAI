import { Injectable } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import fs from 'fs'

@Injectable()
class FileSystem {
  private logger = new Logger(FileSystem.name)

  async readFile(path: string): Promise<string> {
    this.logger.debug(`Reading file from ${path}...`)

    try {
      return fs.readFileSync(path, 'utf8')
    } catch (error) {
      this.logger.error(`Failed to read file from ${path}.`)
      throw error
    }
  }

  async writeFile(path: string, data: string): Promise<void> {
    this.logger.debug(`Writing file to ${path}...`)

    try {
      fs.writeFileSync(path, data)
    } catch (error) {
      this.logger.error(`Failed to write file to ${path}.`)
      throw error
    }
  }
}

export default FileSystem
