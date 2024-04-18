import { BaseChatModel } from '@langchain/core/language_models/chat_models'
import { Tool } from '@langchain/core/tools'

export interface AgentState {
  input: string | null
  plan: string[]
  pastSteps: string[]
  response: string | null
}

export interface AgentOutput {
  steps?: string[]
  response?: string
}

export interface AgentInitilizationInput {
  model: BaseChatModel
  tools: Tool[]
}
