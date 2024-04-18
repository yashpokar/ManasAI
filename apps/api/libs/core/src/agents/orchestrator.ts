import { BaseMessage } from '@langchain/core/messages'
import { StateGraph } from '@langchain/langgraph'
import { Injectable, Logger } from '@nestjs/common'
import { AgentState } from '../types/agent'
import {
  OrchestratorActInput,
  OrchestratorOrchestrateInput
} from '../types/orchestrator'

@Injectable()
class AgentsOrchestrator {
  private readonly logger = new Logger(AgentsOrchestrator.name)
  private graph: StateGraph<AgentState>

  constructor() {
    this.graph = new StateGraph({
      channels: {
        input: {
          value: null
        },
        plan: {
          value: null,
          default: () => []
        },
        pastSteps: {
          value: (prev: BaseMessage[], curr: BaseMessage[]) =>
            prev.concat(curr),
          default: () => []
        },
        response: {
          value: null
        }
      }
    })
  }

  orchestrate({
    nodes,
    edges,
    conditionalEdges,
    entryPoint
  }: OrchestratorOrchestrateInput) {
    this.logger.debug(
      `Orchestrating nodes: ${JSON.stringify(nodes)} and edges: ${JSON.stringify(edges)}, entryPoint: ${JSON.stringify(entryPoint)}`
    )

    for (const [name, node] of nodes) {
      this.graph.addNode(name, node.act.bind(node))
    }

    for (const [from, to] of edges) {
      this.graph.addEdge(from, to)
    }

    for (const [
      startKey,
      condition,
      conditionalEdgeMapping
    ] of conditionalEdges) {
      this.graph.addConditionalEdges(
        startKey,
        condition,
        conditionalEdgeMapping
      )
    }

    this.graph.setEntryPoint(entryPoint)
  }

  async act({ args, config }: OrchestratorActInput): Promise<void> {
    this.logger.debug(`Acting on input: ${args}`)

    const graph = this.graph.compile()

    for await (const event of await graph.stream(args, config)) {
      this.logger.log(`Event: ${JSON.stringify(event)}`, event)
    }
  }
}

export default AgentsOrchestrator
