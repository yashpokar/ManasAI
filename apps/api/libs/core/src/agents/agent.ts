import { AgentExecutor, AgentExecutorInput } from 'langchain/agents'

abstract class Agent {
  constructor(private readonly executorInput: AgentExecutorInput) {}

  abstract act(): Promise<void>

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
