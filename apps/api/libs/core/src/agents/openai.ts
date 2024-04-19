import { pull } from 'langchain/hub'
import { ChatPromptTemplate } from '@langchain/core/prompts'
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

@Injectable()
class OpenAIAgent extends Agent<PlanExecuteState> {
  private tools: DynamicStructuredTool[]

  constructor(
    readonly editor: EditorTool,
    readonly browser: BrowserTool,
    readonly terminal: TerminalTool,
    readonly search: SearchTool
  ) {
    super()

    this.tools = toStructuredTools([editor, browser, terminal, search])
  }

  async act({ input }: PlanExecuteState): Promise<Partial<PlanExecuteState>> {
    const prompt = await pull<ChatPromptTemplate>(
      'hwchase17/openai-functions-agent'
    )

    const llm = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo'
    })

    const { tools } = this

    const agent = await createOpenAIToolsAgent({
      llm,
      tools,
      prompt
    })

    const agentExecutor = new AgentExecutor({
      agent,
      tools
    })

    const agentResponse = await agentExecutor.invoke({ input })
    return {
      pastSteps: [input, agentResponse.output]
    }
  }
}

export default OpenAIAgent
