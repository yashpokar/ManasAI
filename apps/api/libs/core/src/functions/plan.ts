import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

const plan = zodToJsonSchema(
  z.object({
    steps: z
      .array(z.string())
      .describe('different steps to follow, should be in sorted order')
  })
)

const planFunction = {
  name: 'plan',
  description: 'This tool is used to plan the steps to follow',
  parameters: plan
}

export default planFunction
