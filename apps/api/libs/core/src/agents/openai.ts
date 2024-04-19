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
import {
  ChatPromptTemplate,
  MessagesPlaceholder
} from '@langchain/core/prompts'

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
    // TODO: modify the this.getPromptTemplate('openai') to use ChatPromptTemplate.fromMessages
    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `As a world-class programmer tasked with achieving a specific goal, begin by formulating a detailed plan.
        Break down the goal into manageable steps.

        After each action, recap the plan to ensure continuity due to short-term memory constraints.
        Use the terminal for execution and the browser for validation, notifying the user of any external instructions received.
        Start by installing necessary packages by deciding best suitable package manager,
        possibly the executable could also be missing, so install it first and then the package.
        Remember to iterate: execute, validate, and adjust based on outcomes.
        Your ultimate objective is to iteratively develop, test, and refine your solution/plan until the goal is met.`
      ],
      ['system', 'The workspace being used is {projectId}'],
      ['human', '{input}'],
      new MessagesPlaceholder('agent_scratchpad')
    ])

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

    const response = await executor.invoke({
      input,
      projectId: '468c0112-8ae9-4131-bf11-f1715e527661'
    })

    return {
      pastSteps: [input, response.output]
    }
  }
}

export default OpenAIAgent
