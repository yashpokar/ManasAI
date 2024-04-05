import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'
import Docker from 'dockerode'

import logger from '../core/logger'

const docker = new Docker()

import { Container } from 'dockerode'

const execCommandInContainer = async (
  container: Container,
  command: string[],
  workingDir?: string
): Promise<{ stdout: string; stderr: string }> => {
  const execInstance = await container.exec({
    Cmd: command,
    AttachStdout: true,
    AttachStderr: true,
    Tty: false,
    WorkingDir: workingDir
  })

  const execStream = await execInstance.start({ Tty: false })

  return new Promise((resolve, reject) => {
    const stdoutChunks: Buffer[] = []
    const stderrChunks: Buffer[] = []

    container.modem.demuxStream(
      execStream,
      {
        write: (chunk: Buffer) => stdoutChunks.push(chunk)
      },
      {
        write: (chunk: Buffer) => stderrChunks.push(chunk)
      }
    )

    execStream.on('end', () => {
      const stdout = Buffer.concat(stdoutChunks).toString('utf-8')
      const stderr = Buffer.concat(stderrChunks).toString('utf-8')
      resolve({ stdout, stderr })
    })

    execStream.on('error', reject)
  })
}

export default new DynamicStructuredTool({
  name: 'terminal',
  description:
    'The tool for running terminal commands in-order to verify the generated code.',
  schema: z.object({
    workspaceId: z.string().describe('The project workspace ID.'),
    command: z
      .string()
      .describe(
        'The terminal command to run, the filepath is relative to the project root.'
      )
  }),
  func: async ({ command, workspaceId }) => {
    logger.info(`Running command: ${command}... in workspace ${workspaceId}...`)

    const containers = await docker.listContainers()
    const containerId = containers.find(c =>
      c.Names.includes('/manasai-sandbox')
    )?.Id

    if (!containerId) {
      throw new Error('Container not found')
    }

    const container = docker.getContainer(containerId)

    const { stderr, stdout } = await execCommandInContainer(
      container,
      command.split(' '),
      `/var/www/html/${workspaceId}`
    )

    if (stderr) {
      logger.error(`Execution failed: ${stderr}`)
      return stderr
    }

    logger.info(`Execution succeeded: ${stdout}`)
    return stdout
  }
})
