import { z } from 'zod'
import { Tool } from './tool'
import { Injectable } from '@nestjs/common'
import FileSystemService from '../providers/file-system.service'

@Injectable()
class EditorTool extends Tool {
  protected name = 'editor'
  protected description = `Tool that allows an agent to write, read and delete files or directories in the file system.`

  protected schema = z.object({
    projectId: z.string().describe('The project ID to execute the action in.'),
    action: z
      .enum(['READ', 'WRITE', 'DELETE'])
      .describe('The action to perform.'),
    path: z.string().describe('The path to the file or directory.'),
    data: z.string().optional().describe('The data to write to the file.')
  })

  constructor(private readonly fileSystemService: FileSystemService) {
    super()
  }

  async execute(params: z.infer<typeof this.schema>) {
    this.logger.debug(
      `Performing action: ${params.action} on path: ${params.path}`
    )

    return `Action: ${params.action} on path: ${params.path} completed.`
  }
}

export default EditorTool
