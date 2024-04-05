import { RunnableSequence } from '@langchain/core/runnables'
import { AgentExecutor, type AgentStep } from 'langchain/agents'
import { ChatOpenAI } from '@langchain/openai'
import { formatToOpenAIFunctionMessages } from 'langchain/agents/format_scratchpad'
import { OpenAIFunctionsAgentOutputParser } from 'langchain/agents/openai/output_parser'
import { convertToOpenAIFunction } from '@langchain/core/utils/function_calling'
import {
  ChatPromptTemplate,
  MessagesPlaceholder
} from '@langchain/core/prompts'

import tools from '../tools'

const prompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `As a world-class programmer tasked with achieving a specific goal, begin by formulating a detailed plan.
Break down the goal into manageable steps, including code snippets and commands for validation or online research.
After each action, recap the plan to ensure continuity due to short-term memory constraints.
Use the terminal for execution and the browser for validation, notifying the user of any external instructions received.
Start by installing necessary packages by deciding best suitable package manager,
possibly the executable could also be missing, so install it first and then the package.
Remember to iterate: execute, validate, and adjust based on outcomes.
Your ultimate objective is to iteratively develop, test, and refine your solution/plan until the goal is met.

The operating system is Ubuntu 20.04`
  ],
  ['system', 'The workspace being used is {workspace_id}'],
  ['human', '{input}'],
  new MessagesPlaceholder('agent_scratchpad')
])

const model = new ChatOpenAI({
  modelName: 'gpt-4-0125-preview',
  temperature: 0
})

const modelWithFunctions = model.bind({
  functions: tools.map(tool => convertToOpenAIFunction(tool))
})

export const createAgentExecutor = (): AgentExecutor => {
  const runnableAgent = RunnableSequence.from([
    {
      input: (i: { input: string; workspace_id: string; steps: AgentStep[] }) =>
        i.input,
      agent_scratchpad: (i: { input: string; steps: AgentStep[] }) =>
        formatToOpenAIFunctionMessages(i.steps),
      workspace_id: (i: { workspace_id: string }) => i.workspace_id
    },
    prompt,
    modelWithFunctions,
    new OpenAIFunctionsAgentOutputParser()
  ])

  return AgentExecutor.fromAgentAndTools({
    agent: runnableAgent,
    tools,
    maxIterations: 10
  })
}
