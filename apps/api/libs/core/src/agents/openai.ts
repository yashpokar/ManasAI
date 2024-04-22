import { AgentExecutor, createOpenAIToolsAgent } from 'langchain/agents'
import { Injectable } from '@nestjs/common'
import { DynamicStructuredTool } from '@langchain/core/tools'
import Agent from './agent'
import { PlanExecuteState } from '../types/agent'
import { ChatOpenAI } from '@langchain/openai'
import EditorTool from '../tools/editor'
import TerminalTool from '../tools/terminal'
import BrowserTool from '../tools/browser'
import SearchTool from '../tools/search'
import { toStructuredTools } from '../tools/tool'
import AgentEventsHandler from '../handlers/agent-events-handler'

@Injectable()
class OpenAIAgent extends Agent<PlanExecuteState> {
  private tools: DynamicStructuredTool[]

  constructor(
    readonly editor: EditorTool,
    readonly browser: BrowserTool,
    readonly terminal: TerminalTool,
    readonly search: SearchTool,

    private readonly eventsHandler: AgentEventsHandler
  ) {
    super()

    this.tools = toStructuredTools([editor, browser, terminal, search])
  }

  async act({
    input,
    projectId
  }: PlanExecuteState): Promise<Partial<PlanExecuteState>> {
    const prompt = this.getPromptTemplate('agent')

    const llm = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview'
    })

    const { tools } = this

    const agent = await createOpenAIToolsAgent({
      llm,
      tools,
      prompt
    })

    const executor = AgentExecutor.fromAgentAndTools({
      agent,
      tools
    })

    const response = await executor.invoke(
      {
        input,
        projectId
      },
      {
        callbacks: [this.eventsHandler]
      }
    )

    return {
      pastSteps: [input, response.output]
    }
  }
}

export default OpenAIAgent
