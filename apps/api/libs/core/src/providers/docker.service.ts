import { Injectable, Logger } from '@nestjs/common'
import Docker, { Container } from 'dockerode'

@Injectable()
class DockerService {
  private logger = new Logger(DockerService.name)
  private docker: Docker
  private container: Container

  constructor() {
    this.docker = new Docker()
  }

  async init(): Promise<void> {
    this.logger.debug('Initializing Docker service...')

    const containers = await this.docker.listContainers()
    // TODO: do not hardcode container name
    const container = containers.find(c => c.Names.includes('manasai-sandbox'))

    if (!container) {
      this.logger.debug('Creating sandbox container...')

      // TODO: what if the image does not exist?
      // TODO: do not hardcode image name
      this.container = await this.docker.createContainer({
        Image: 'manasai/sandbox'
      })

      await this.container.start()
    }
  }

  async executeCommand(
    commands: string[],
    workingDir?: string
  ): Promise<string> {
    this.logger.debug(
      `Executing docker command: ${commands.join(' ')}, workingDir: ${workingDir}`
    )

    if (!this.container) {
      throw new Error('Sandbox container not initialized.')
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
