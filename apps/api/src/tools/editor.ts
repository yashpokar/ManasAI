import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'

import logger from '../core/logger'

export default new DynamicStructuredTool({
  name: 'editor',
  description: `Editor tool used to edit or write code.`,
  schema: z.object({
    // workspaceId: z.string().describe('The project workspace ID.'),
    operation: z
      .enum(['write', 'read', 'delete'])
      .describe('The operation to perform.'),
    code: z.string().describe('The code to edit or write.'),
    filename: z.string().describe('The name of the file to edit or write.'),
    path: z
      .string()
      .describe(
        'The path where the to be edited or written file is located, relative to the project root.'
      )
  }),
  func: async ({ code, filename, path: filePath }) => {
    logger.debug(`Editing ${filename} at ${filePath}... ${code}`)

    return `Editing ${filename} at ${filePath}... ${code}`
  }
})
