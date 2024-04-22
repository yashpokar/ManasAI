import { z } from 'zod'
import { Injectable } from '@nestjs/common'
import { Tool } from './tool'
import DockerService from '../providers/docker.service'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Terminal } from '../models/terminal'
import { PREVIEW_EVENT, TOPIC_TERMINAL } from '../constants'

@Injectable()
class TerminalTool extends Tool {
  protected name = 'terminal'
  protected description = `Tool executes commands in isolated sandbox environment.`

  protected schema = z.object({
    projectId: z.string().describe('The project ID to execute the command in.'),
    command: z.string().describe('The shell command to execute.')
  })

  constructor(
    private readonly dockerService: DockerService,
    private readonly eventEmitter: EventEmitter2
  ) {
    super()
    this.dockerService.initialize()
  }

  async execute({ command, projectId }) {
    this.logger.debug(`Executing shell command: ${command}`)

    const output = await this.dockerService.executeCommand(command, projectId)

    const onTerminalPreview: Terminal = {
      command,
      output
    }

    this.eventEmitter.emit(PREVIEW_EVENT, TOPIC_TERMINAL, { onTerminalPreview })

    return output
  }
}

export default TerminalTool
