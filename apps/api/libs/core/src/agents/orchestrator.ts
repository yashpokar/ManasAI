import { BaseMessage } from '@langchain/core/messages'
import { StateGraph } from '@langchain/langgraph'
import { Injectable, Logger } from '@nestjs/common'
import { AgentState } from '../types/agent'
import {
  OrchestratorActInput,
  OrchestratorOrchestrateInput
} from '../types/orchestrator'
import EditorTool from '../tools/editor'
import TerminalTool from '../tools/terminal'
import BrowserTool from '../tools/browser'
import SearchTool from '../tools/search'
import { toStructuredTools } from '../tools/tool'
import { Tool } from '@langchain/core/tools'

@Injectable()
class AgentsOrchestrator {
  private readonly logger = new Logger(AgentsOrchestrator.name)
  private graph: StateGraph<AgentState>

  constructor(
    private readonly editor: EditorTool,
    private readonly browser: BrowserTool,
    private readonly terminal: TerminalTool,
    private readonly search: SearchTool
  ) {
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
      `Orchestrating nodes: ${nodes} and edges: ${edges}, entryPoint: ${entryPoint}`
    )

    for (const [name, node] of nodes) {
      this.graph.addNode(name, node)
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

  async *act({
    args,
    config
  }: OrchestratorActInput): AsyncGenerator<any, void, undefined> {
    this.logger.debug(`Acting on input: ${args}`)

    const graph = this.graph.compile()

    for await (const event of await graph.stream(args, config)) {
      yield event
    }
  }

  getStructuredTools(): Tool[] {
    return toStructuredTools([
      this.editor,
      this.browser,
      this.terminal,
      this.search
    ])
  }
}

export default AgentsOrchestrator
