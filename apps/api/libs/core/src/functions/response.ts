import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

const response = zodToJsonSchema(
  z.object({
    response: z.string().describe('Response to user.')
  })
)

const responseFunction = {
  name: 'response',
  description: 'Response to user.',
  parameters: response
}

export default responseFunction
