import { Injectable } from '@nestjs/common'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import Agent from './agent'
import { AgentOutput, AgentState } from '../types/agent'
import { createOpenAIFnRunnable } from 'langchain/chains/openai_functions'
import { ChatOpenAI } from '@langchain/openai'

@Injectable()
class RePlannerAgent extends Agent<ChatOpenAI> {
  async act(state: AgentState): Promise<Partial<AgentState>> {
    this.logger.debug(`Acting the given state: ${state}`)

    const prompt = this.getPromptTemplate('replanner')
    const parser = new JsonOutputFunctionsParser()
    const replanner = createOpenAIFnRunnable({
      functions: [],
      outputParser: parser,
      llm: this.model,
      prompt
    })

    const plan: AgentOutput = await replanner.invoke({
      input: state.input,
      plan: state.plan ? state.plan.join('\n') : '',
      pastSteps: state.pastSteps.join('\n')
    })

    if ('response' in plan) {
      return { response: plan.response }
    }

    return { plan: plan.steps }
  }
}

export default RePlannerAgent
