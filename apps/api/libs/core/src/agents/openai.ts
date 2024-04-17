import { Injectable } from '@nestjs/common'
import { pull } from 'langchain/hub'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatOpenAI } from '@langchain/openai'
import { createOpenAIFunctionsAgent } from 'langchain/agents'
import { createAgentExecutor } from '@langchain/langgraph/prebuilt'

import Agent from './agent'
import EditorTool from '../tools/editor'
import TerminalTool from '../tools/terminal'
import BrowserTool from '../tools/browser'
import SearchTool from '../tools/search'

@Injectable()
class OpenAIAgent extends Agent {
  constructor(
    private readonly editor: EditorTool,
    private readonly browser: BrowserTool,
    private readonly terminal: TerminalTool,
    private readonly search: SearchTool
  ) {
    super(editor, browser, terminal, search)
  }

  async act(question: string): Promise<void> {
    const prompt = await pull<ChatPromptTemplate>(
      'hwchase17/openai-functions-agent'
    )

    const llm = new ChatOpenAI({ modelName: 'gpt-4-0125-preview' })

    const agentRunnable = await createOpenAIFunctionsAgent({
      llm,
      tools: this.tools,
      prompt
    })

    const agentExecutor = createAgentExecutor({
      agentRunnable,
      tools: this.tools
    })

    const response = await agentExecutor.invoke({ input: question })

    this.logger.log(
      `OpenAIAgent acting on question: ${question}, response: ${JSON.stringify(response)}`
    )
  }
}

export default OpenAIAgent
