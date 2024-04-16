import { z } from 'zod'
import { Tool } from './tool'
import { Injectable } from '@nestjs/common'
import DockerService from '../providers/docker.service'

@Injectable()
class TerminalTool extends Tool {
  protected name = 'terminal'
  protected description = `Tool executes commands in isolated sandbox environment.`

  protected schema = z.object({
    projectId: z.string().describe('The project ID to execute the command in.'),
    command: z.string().describe('The shell command to execute.')
  })

  constructor(private readonly dockerService: DockerService) {
    super()
  }

  async execute(params: z.infer<typeof this.schema>) {
    this.logger.debug(`Executing shell command: ${params.command}`)

    return params.command
  }
}

export default TerminalTool
