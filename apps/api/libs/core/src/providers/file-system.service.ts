import { Injectable } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import fs from 'fs'

@Injectable()
class FileSystemService {
  private logger = new Logger(FileSystemService.name)

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

  async deleteFile(path: string): Promise<void> {
    this.logger.debug(`Deleting file from ${path}...`)

    try {
      fs.unlinkSync(path)
    } catch (error) {
      this.logger.error(`Failed to delete file from ${path}.`)
      throw error
    }
  }
}

export default FileSystemService
