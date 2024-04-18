import { RunnableLike } from '@langchain/core/runnables'
import { PregelOptions } from '@langchain/langgraph/dist/pregel'

export interface OrchestratorActInput {
  input: string
  config?: PregelOptions
}

export interface OrchestratorOrchestrateInput {
  nodes: Map<string, RunnableLike>
  edges: [string, string][]
  conditionalEdges: [string, CallableFunction, Record<string, string>?][]
  entryPoint: string
}
