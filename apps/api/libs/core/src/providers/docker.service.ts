import { Injectable, Logger } from '@nestjs/common'
import * as Docker from 'dockerode'
import { ConfigService } from '@nestjs/config'

@Injectable()
class DockerService {
  private logger = new Logger(DockerService.name)
  private docker: Docker
  private container: Docker.Container
  private sandboxImageName: string

  constructor(private readonly configService: ConfigService) {
    this.docker = new Docker()
    this.sandboxImageName = this.configService.get<string>('SANDBOX_IMAGE_NAME')
  }

  async initialize(): Promise<void> {
    this.logger.debug('Initializing Docker service...')

    const containers = await this.docker.listContainers({
      all: true,
      filters: { name: [this.sandboxImageName] }
    })

    if (!containers) {
      this.logger.debug('Preparing sandbox...')

      const container = await this.docker.createContainer({
        Image: this.sandboxImageName,
        Tty: true,
        AttachStdout: true,
        AttachStderr: true,
        name: this.sandboxImageName
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
