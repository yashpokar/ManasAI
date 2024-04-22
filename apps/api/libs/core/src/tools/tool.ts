import {
  DynamicStructuredTool,
  DynamicStructuredToolInput
} from '@langchain/core/tools'
import { Logger } from '@nestjs/common'
import { z } from 'zod'

export abstract class Tool<
  T extends z.ZodObject<any, any, any, any> = z.ZodObject<any, any, any, any>
> {
  protected readonly logger = new Logger(this.constructor.name)

  protected name: string
  protected description: string
  protected abstract schema: T

  abstract execute(params: z.infer<T>): Promise<any>

  toDynamicStructuredTool(): DynamicStructuredToolInput {
    return {
      name: this.name,
      description: this.description,
      schema: this.schema,
      func: this.execute.bind(this)
    }
  }
}

export const toStructuredTools = <T extends Tool>(
  tools: T[]
): DynamicStructuredTool[] => {
  return tools.map(
    tool => new DynamicStructuredTool(tool.toDynamicStructuredTool())
  )
}
