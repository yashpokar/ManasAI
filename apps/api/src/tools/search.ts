import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'
import axios from 'axios'

import logger from '../core/logger'

export default new DynamicStructuredTool({
  name: 'browser',
  description:
    'The tool that enables the agent to search and understand the topic.',
  schema: z.object({
    workspaceId: z.string().describe('The project workspace ID.'),
    topic: z
      .string()
      .describe('Best keyword that helps you understand the topic.')
  }),
  func: async ({ topic }) => {
    logger.debug(`Searching for ${topic}...`)

    const response = await axios.get(`https://www.duckduckgo.com/?q=${topic}`)

    // TODO: parse the text from the response
    return response.data
  }
})
