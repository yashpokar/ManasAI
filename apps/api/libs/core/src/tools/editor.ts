import { z } from 'zod'
import { Tool } from './tool'
import { Injectable } from '@nestjs/common'
import FileSystemService from '../providers/file-system.service'
import { join } from 'path'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { PREVIEW_EVENT, TOPIC_EDITOR } from '../constants'
import { Editor } from '../models/editor'

@Injectable()
class EditorTool extends Tool {
  protected name = 'editor'
  protected description = `Tool that allows an agent to write, read and delete files or directories in the file system.`

  protected schema = z.object({
    projectId: z.string().describe('The project ID to execute the action in.'),
    action: z
      .enum(['READ', 'WRITE', 'DELETE'])
      .describe('The action to perform.'),
    filename: z.string().describe('The name of the file to edit or write.'),
    path: z.string().describe('The relative path to the file or directory.'),
    data: z.string().optional().describe('The data to write to the file.')
  })

  constructor(
    private readonly fileSystemService: FileSystemService,
    private readonly eventEmitter: EventEmitter2
  ) {
    super()
  }

  async execute({ path, action, filename, data }) {
    this.logger.debug(`Performing action: ${action} on path: ${path}`)

    const location = join(path, filename)

    switch (action) {
      case 'READ':
        return this.fileSystemService.readFile(location)
      case 'WRITE':
        const onEditorPreview: Editor = {
          path,
          fileName: filename,
          content: data
        }

        this.eventEmitter.emit(PREVIEW_EVENT, TOPIC_EDITOR, {
          onEditorPreview
        })

        return this.fileSystemService.writeFile(location, data || '')
      case 'DELETE':
        return this.fileSystemService.deleteFile(location)
      default:
        throw new Error(`Action: ${action} not supported.`)
    }
  }
}

export default EditorTool
