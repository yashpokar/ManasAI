import { PregelOptions } from '@langchain/langgraph/dist/pregel'
import { BinaryOperator } from '@langchain/langgraph/dist/channels/binop'
import Agent from '../agents/agent'

export interface OrchestratorActInput<AgentState> {
  args: AgentState
  config?: PregelOptions
}

export interface OrchestratorOrchestrateInput<AgentState> {
  nodes: [string, Agent<AgentState>][]
  edges: [string, string][]
  conditionalEdges: [
    string,
    (s: AgentState) => string,
    Record<string, string>
  ][]
  entryPoint: string
}

export type OrchestratorInitiateInput<AgentState> = {
  [K in keyof AgentState]:
    | {
        value: BinaryOperator<AgentState[K]> | null
        default?: () => AgentState[K]
      }
    | string
}
