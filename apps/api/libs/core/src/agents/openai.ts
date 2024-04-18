import { pull } from 'langchain/hub'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { createAgentExecutor } from '@langchain/langgraph/prebuilt'
import { createOpenAIFunctionsAgent } from 'langchain/agents'
import { Inject, Injectable } from '@nestjs/common'
import { Tool } from '@langchain/core/tools'
import Agent from './agent'
import { AgentState } from '../types/agent'
import { OPENAI_SERVICE } from '../constants'
import { ChatOpenAI } from '@langchain/openai'
import EditorTool from '../tools/editor'
import TerminalTool from '../tools/terminal'
import BrowserTool from '../tools/browser'
import SearchTool from '../tools/search'
import { toStructuredTools } from '../tools/tool'

@Injectable()
class OpenAIAgent extends Agent {
  private tools: Tool[]

  constructor(
    @Inject(OPENAI_SERVICE)
    private readonly model: ChatOpenAI,

    readonly editor: EditorTool,
    readonly browser: BrowserTool,
    readonly terminal: TerminalTool,
    readonly search: SearchTool
  ) {
    super()

    this.tools = toStructuredTools([editor, browser, terminal, search])
  }

  async act({ input }: AgentState): Promise<Partial<AgentState>> {
    const prompt = await pull<ChatPromptTemplate>(
      'hwchase17/openai-functions-agent'
    )

    const agentRunnable = await createOpenAIFunctionsAgent({
      llm: this.model,
      tools: this.tools,
      prompt
    })

    const agentExecutor = createAgentExecutor({
      agentRunnable,
      tools: this.tools
    })

    const agentResponse = await agentExecutor.invoke({ input })
    return {
      pastSteps: [input, agentResponse.agentOutcome.returnValues.output]
    }
  }
}

export default OpenAIAgent
