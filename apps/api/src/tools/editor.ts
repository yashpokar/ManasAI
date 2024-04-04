import {
  DynamicStructuredTool,
  ToolInputParsingException
} from '@langchain/core/tools'
import { z } from 'zod'
import fs from 'fs'

import logger from '../core/logger'
import { getFilepath } from '../utils'
import path from 'path'

export default new DynamicStructuredTool({
  name: 'editor',
  description: `Editor tool used to edit or write code.`,
  schema: z.object({
    workspaceId: z.string().describe('The project workspace ID.'),
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
  func: async ({ code, filename, path: filePath, operation, workspaceId }) => {
    logger.debug(
      `Performing ${operation} operation on ${filename} at ${filePath}...`
    )

    if (!code || !filename || filePath === null || !operation || !workspaceId) {
      throw new ToolInputParsingException(
        'Please provide a code, filename, path, operation, and workspace ID.'
      )
    }

    const fileLocation = path.join(filePath, filename)

    if (operation === 'delete') {
      fs.unlinkSync(getFilepath(workspaceId, fileLocation))
      return `Deleted ${filename} at ${fileLocation}...`
    }

    if (operation === 'read') {
      return fs.readFileSync(getFilepath(workspaceId, fileLocation), 'utf-8')
    }

    fs.writeFileSync(getFilepath(workspaceId, fileLocation), code)
    return `Written ${filename} at ${fileLocation}...`
  }
})
