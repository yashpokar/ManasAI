import { BaseMessage } from '@langchain/core/messages'
import { StateGraph } from '@langchain/langgraph'
import { Injectable, Logger } from '@nestjs/common'

const initialState = {
  input: {
    value: null
  },
  plan: {
    value: null,
    default: () => []
  },
  pastSteps: {
    value: (prev: BaseMessage[], curr: BaseMessage[]) => prev.concat(curr),
    default: () => []
  },
  response: {
    value: null
  }
}

interface State {
  input: string | null
  plan: string[]
  pastSteps: string[]
  response: string | null
}

@Injectable()
class AgentsOrchestrator {
  private readonly logger = new Logger(AgentsOrchestrator.name)
  private graph: StateGraph<State>

  constructor() {
    this.graph = new StateGraph({
      channels: initialState
    })
  }

  async act(input: string): Promise<void> {
    this.logger.debug(`Acting on input: ${input}`)
  }
}

export default AgentsOrchestrator
