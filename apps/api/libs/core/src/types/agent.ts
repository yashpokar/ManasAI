import { BaseChatModel } from '@langchain/core/language_models/chat_models'
import { Tool } from '@langchain/core/tools'

export type Template =
  | {
      author: 'system' | 'human' | 'assistant'
      prompt: string
    }
  | {
      placeholder: string
    }

export interface Prompt {
  name: string
  template: Template[]
}

export interface PlanExecuteState {
  input: string | null
  projectId: string
  plan: string[]
  pastSteps: string[]
  response: string | null
}

export interface AgentOutput {
  steps?: string[]
  response?: string
}

export interface AgentInitilizationInput<LLM extends BaseChatModel> {
  model: LLM
  tools: Tool[]
}
