import { Injectable, Logger } from '@nestjs/common'
import * as Docker from 'dockerode'
import { SANDBOX_DOCKER_IMAGE_NAME } from '../constants'

@Injectable()
class DockerService {
  private logger = new Logger(DockerService.name)
  private docker: Docker
  private container: Docker.Container

  constructor() {
    this.docker = new Docker()
  }

  async init(): Promise<void> {
    this.logger.debug('Initializing Docker service...')

    const containers = await this.docker.listContainers({
      all: true,
      filters: { name: [SANDBOX_DOCKER_IMAGE_NAME] }
    })

    if (!containers) {
      this.logger.debug('Preparing sandbox...')

      const container = await this.docker.createContainer({
        Image: SANDBOX_DOCKER_IMAGE_NAME,
        Tty: true,
        AttachStdout: true,
        AttachStderr: true,
        name: SANDBOX_DOCKER_IMAGE_NAME
      })

      await container.start()

      this.container = container
      return
    }

    const container = containers[0]

    this.container = this.docker.getContainer(container.Id)

    if (container.State === 'exited') {
      this.logger.debug('Starting container...')
      await this.container.start()
    }
  }

  async executeCommand(command: string, workingDir?: string): Promise<string> {
    this.logger.debug(
      `Executing docker command: ${command}, workingDir: ${workingDir}`
    )

    const commands = command.split(' ')

    if (!this.container) {
      throw new Error('Sandbox not initialized.')
    }

    const exec = await this.container.exec({
      Cmd: commands,
      WorkingDir: workingDir,
      Tty: false,
      AttachStdout: true,
      AttachStderr: true
    })

    const stream = await exec.start({ hijack: true, stdin: true })
    const output = await new Promise<string>((resolve, reject) => {
      let data = ''

      stream.on('data', chunk => {
        data += chunk
      })

      stream.on('end', () => {
        resolve(data)
      })

      stream.on('error', error => {
        reject(error)
      })
    })

    this.logger.debug(`Command output: ${output}`)

    return output
  }
}

export default DockerService
