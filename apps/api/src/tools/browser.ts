import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'
import logger from '../core/logger'

export default new DynamicStructuredTool({
  name: 'browser',
  description: 'The tool for testing the generated code.',
  schema: z.object({
    workspaceId: z.string().describe('The project workspace ID.'),
    url: z
      .string()
      .optional()
      .describe('Localhost URL to open in the browser for testing/preview.')
  }),
  func: async ({ url }) => {
    logger.debug(`Opening url ${url}...`)
    return `Opening url ${url}...`
  }
})
