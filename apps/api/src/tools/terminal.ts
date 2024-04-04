import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'

import logger from '../core/logger'

export default new DynamicStructuredTool({
  name: 'terminal',
  description:
    'The tool for running terminal commands in-order to verify the generated code.',
  schema: z.object({
    command: z.string()
  }),
  func: async ({ command }) => {
    logger.debug(`Running command: ${command}...`)

    return `Running command: ${command}...`
  }
})
