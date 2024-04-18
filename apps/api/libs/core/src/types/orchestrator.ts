import { RunnableLike } from '@langchain/core/runnables'
import { PregelOptions } from '@langchain/langgraph/dist/pregel'
import { AgentState } from './agent'

export interface OrchestratorActInput {
  args: AgentState
  config?: PregelOptions
}

export interface OrchestratorOrchestrateInput {
  nodes: Map<string, RunnableLike>
  edges: [string, string][]
  conditionalEdges: [string, CallableFunction, Record<string, string>?][]
  entryPoint: string
}
