import { StateGraph } from '@langchain/langgraph'
import { Injectable, Logger } from '@nestjs/common'
import {
  OrchestratorActInput,
  OrchestratorInitiateInput,
  OrchestratorOrchestrateInput
} from '../types/orchestrator'
import { RunnableLike } from '@langchain/core/runnables'

@Injectable()
class AgentsOrchestrator<AgentState> {
  private readonly logger = new Logger(AgentsOrchestrator.name)
  private graph: StateGraph<AgentState>

  initiate(channels: OrchestratorInitiateInput<AgentState>) {
    this.graph = new StateGraph({
      channels
    })
  }

  addNode(name: string, action: RunnableLike) {
    this.graph.addNode(name, action)
  }

  addEdge(from: string, to: string) {
    this.graph.addEdge(from, to)
  }

  addConditionalEdges(
    startKey: string,
    condition: (s: AgentState) => string,
    conditionalEdgeMapping: Record<string, string>
  ) {
    this.graph.addConditionalEdges(startKey, condition, conditionalEdgeMapping)
  }

  setEntryPoint(entryPoint: string) {
    this.graph.setEntryPoint(entryPoint)
  }

  orchestrate({
    nodes,
    edges,
    conditionalEdges,
    entryPoint
  }: OrchestratorOrchestrateInput<AgentState>) {
    for (const [name, node] of nodes) {
      this.addNode(name, node.act.bind(node))
    }

    for (const [from, to] of edges) {
      this.addEdge(from, to)
    }

    for (const [
      startKey,
      condition,
      conditionalEdgeMapping
    ] of conditionalEdges) {
      this.addConditionalEdges(startKey, condition, conditionalEdgeMapping)
    }

    this.setEntryPoint(entryPoint)
  }

  async act({ args, config }: OrchestratorActInput<AgentState>): Promise<void> {
    this.logger.debug(`Acting on input: ${args}`)

    const graph = this.graph.compile()

    for await (const event of await graph.stream(args, config)) {
      this.logger.log(`Event: ${JSON.stringify(event)}`, event)
    }
  }
}

export default AgentsOrchestrator
