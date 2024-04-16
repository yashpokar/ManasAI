import { z } from 'zod'
import axios from 'axios'
import { Tool } from './tool'

class SearchTool extends Tool {
  protected name = 'web-search'
  protected description = `Tool that allows an agent to search anything on the web using duckduckgo.`

  protected schema = z.object({
    query: z.string().describe('The query to search for.')
  })

  public async execute(params: z.infer<typeof this.schema>) {
    this.logger.debug(`Searching for ${params.query} on the web...`)

    const resp = await axios.get(
      `https://api.duckduckgo.com/?q=${params.query}&format=json`
    )

    this.logger.debug(
      `Response: ${JSON.stringify(resp.data)}, status: ${resp.status}`
    )

    if (resp.status !== 200) {
      throw new Error('Failed to search for query, retry again.')
    }

    return resp.data
  }
}

export default new SearchTool()
