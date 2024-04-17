import { z } from 'zod'
import { Injectable } from '@nestjs/common'
import { Tool } from './tool'
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

    this.dockerService.init()
  }

  async execute({ command, projectId }: z.infer<typeof this.schema>) {
    this.logger.debug(`Executing shell command: ${command}`)

    return this.dockerService.executeCommand(command, projectId)
  }
}

export default TerminalTool
