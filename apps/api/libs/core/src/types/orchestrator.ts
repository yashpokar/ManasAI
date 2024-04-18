import { PregelOptions } from '@langchain/langgraph/dist/pregel'
import { AgentState } from './agent'
import Agent from '../agents/agent'

export interface OrchestratorActInput {
  args: AgentState
  config?: PregelOptions
}

export interface OrchestratorOrchestrateInput {
  nodes: [string, Agent][]
  edges: [string, string][]
  conditionalEdges: [string, CallableFunction, Record<string, string>][]
  entryPoint: string
}
