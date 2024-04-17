import { Message } from '@/models/message'
import { Logger } from '@nestjs/common'
import { Tool, toStructuredTools } from '../tools/tool'
import { Tool as StructuredTool } from '@langchain/core/tools'

abstract class Agent {
  protected logger = new Logger(this.constructor.name)
  protected tools: StructuredTool[] = []

  constructor(...tools: Tool[]) {
    this.tools = toStructuredTools(tools)
  }

  abstract act(question: string, previousMessage: Message[]): Promise<void>
}

export default Agent
