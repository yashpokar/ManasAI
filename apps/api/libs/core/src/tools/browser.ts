import { z } from 'zod'
import { Tool } from './tool'

class BrowserTool extends Tool {
  protected name = 'browser'
  protected description = `Tool that allows an agent to test/preview web page using playwright so that it can know if generated code is working as expected.`

  protected schema = z.object({
    projectId: z.string().describe('The project ID to execute the command in.'),
    url: z.string().describe('The URL to test/preview.')
  })

  public async execute(params: z.infer<typeof this.schema>) {
    this.logger.debug(`Testing/previewing URL: ${params.url}`)

    return params.url
  }
}

export default BrowserTool
