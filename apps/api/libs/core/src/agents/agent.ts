import { Message } from '@/models/message'
import { Logger } from '@nestjs/common'
import { AgentExecutor, AgentExecutorInput } from 'langchain/agents'

abstract class Agent {
  protected logger = new Logger(this.constructor.name)

  constructor(private readonly executorInput: AgentExecutorInput) {}

  abstract act(question: string, previousMessage: Message[]): Promise<void>

  public getExecutor(
    input: Partial<AgentExecutorInput> = {
      returnIntermediateSteps: true
    }
  ) {
    return new AgentExecutor({
      ...this.executorInput,
      ...input
    })
  }
}

export default Agent
