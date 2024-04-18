import { Injectable } from '@nestjs/common'
import { pull } from 'langchain/hub'
import { BasePromptTemplate, ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatOpenAI } from '@langchain/openai'
import { createOpenAIFunctionsAgent } from 'langchain/agents'
import { createAgentExecutor } from '@langchain/langgraph/prebuilt'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import { createOpenAIFnRunnable } from 'langchain/chains/openai_functions'
import { END, StateGraph } from '@langchain/langgraph'

import Agent from './agent'

import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { BaseMessage } from '@langchain/core/messages'
import { AgentState } from '../types/agent'

const planExecuteState = {
  input: {
    value: null
  },
  plan: {
    value: null,
    default: () => []
  },
  pastSteps: {
    value: (x: BaseMessage[], y: BaseMessage[]) => x.concat(y),
    default: () => []
  },
  response: {
    value: null
  }
}

const plan = zodToJsonSchema(
  z.object({
    steps: z
      .array(z.string())
      .describe('different steps to follow, should be in sorted order')
  })
)

const planFunction = {
  name: 'plan',
  description: 'This tool is used to plan the steps to follow',
  parameters: plan
}

const response = zodToJsonSchema(
  z.object({
    response: z.string().describe('Response to user.')
  })
)
const responseFunction = {
  name: 'response',
  description: 'Response to user.',
  parameters: response
}

type PlanExecuteState = {
  input: string | null
  plan: Array<string>
  pastSteps: Array<string>
  response: string | null
}

type ReplannerOutput = {
  steps?: string[]
  response?: string
}

@Injectable()
class OpenAIAgent extends Agent {
  async act(): Promise<Partial<AgentState>> {
    const prompt = await pull<ChatPromptTemplate>(
      'hwchase17/openai-functions-agent'
    )

    const llm = new ChatOpenAI({ modelName: 'gpt-4-0125-preview' })

    const agentRunnable = await createOpenAIFunctionsAgent({
      llm,
      tools: [],
      prompt
    })

    const agentExecutor = createAgentExecutor({
      agentRunnable,
      tools: []
    })

    const plannerPrompt =
      ChatPromptTemplate.fromTemplate(`For the given objective, come up with a simple step by step plan. \
This plan should involve individual tasks, that if executed correctly will yield the correct answer. Do not add any superfluous steps. \
The result of the final step should be the final answer. Make sure that each step has all the information needed - do not skip steps.

{objective}`)
    const model = new ChatOpenAI({
      modelName: 'gpt-4-0125-preview'
    }).bind({
      functions: [planFunction],
      function_call: planFunction
    })
    const parserSingle = new JsonOutputFunctionsParser({ argsOnly: true })
    const planner = plannerPrompt.pipe(model).pipe(parserSingle)

    const replannerPrompt =
      ChatPromptTemplate.fromTemplate(`For the given objective, come up with a simple step by step plan.
This plan should involve individual tasks, that if executed correctly will yield the correct answer. Do not add any superfluous steps.
The result of the final step should be the final answer. Make sure that each step has all the information needed - do not skip steps.

Your objective was this:
{input}

Your original plan was this:
{plan}

You have currently done the follow steps:
{pastSteps}

Update your plan accordingly. If no more steps are needed and you can return to the user, then respond with that and use the 'response' function.
Otherwise, fill out the plan.
Only add steps to the plan that still NEED to be done. Do not return previously done steps as part of the plan.`)
    const parser = new JsonOutputFunctionsParser()
    const replanner = createOpenAIFnRunnable({
      functions: [planFunction, responseFunction],
      outputParser: parser,
      llm: new ChatOpenAI({
        modelName: 'gpt-4-0125-preview'
      }),
      prompt: replannerPrompt as BasePromptTemplate
    })

    async function executeStep(
      state: PlanExecuteState
    ): Promise<Partial<PlanExecuteState>> {
      const task = state.input
      const agentResponse = await agentExecutor.invoke({ input: task })
      return {
        pastSteps: [task, agentResponse.agentOutcome.returnValues.output]
      }
    }

    async function planStep(
      state: PlanExecuteState
    ): Promise<Partial<PlanExecuteState>> {
      const plan: ReplannerOutput = await planner.invoke({
        objective: state.input
      })

      return { plan: plan.steps }
    }

    async function replanStep(
      state: PlanExecuteState
    ): Promise<Partial<PlanExecuteState>> {
      const output: ReplannerOutput = await replanner.invoke({
        input: state.input,
        plan: state.plan ? state.plan.join('\n') : '',
        pastSteps: state.pastSteps.join('\n')
      })
      if ('response' in output) {
        return { response: output.response as string }
      }

      return { plan: output.steps }
    }

    function shouldEnd(state: PlanExecuteState) {
      if (state.response) {
        return 'true'
      }
      return 'false'
    }

    const workflow = new StateGraph({
      channels: planExecuteState
    })

    workflow.addNode('planner', planStep)
    workflow.addNode('agent', executeStep)
    workflow.addNode('replan', replanStep)
    workflow.setEntryPoint('planner')
    workflow.addEdge('planner', 'agent')
    workflow.addEdge('agent', 'replan')

    workflow.addConditionalEdges('replan', shouldEnd, {
      true: END,
      false: 'planner'
    })

    return {}
  }
}

export default OpenAIAgent
