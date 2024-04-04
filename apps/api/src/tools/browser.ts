import {
  DynamicStructuredTool,
  ToolInputParsingException
} from '@langchain/core/tools'
import { z } from 'zod'
import logger from '../core/logger'

export default new DynamicStructuredTool({
  name: 'browser',
  description: 'The tool for browsing the web.',
  schema: z.object({
    url: z
      .string()
      .optional()
      .describe('The URL to navigate to, required if search is not provided.'),
    search: z
      .string()
      .optional()
      .describe('The search term to use, required if url is not provided.')
  }),
  func: async ({ url, search }) => {
    if (!url && !search) {
      throw new ToolInputParsingException(
        'Please provide a URL or search term.'
      )
    }

    if (url) {
      logger.debug(`Navigating to ${url}...`)
      return `Navigating to ${url}...`
    }

    logger.debug(`Searching for ${search}...`)
    return `Searching for ${search}...`
  }
})
