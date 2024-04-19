import { Injectable } from '@nestjs/common'
import { ChatOpenAI } from '@langchain/openai'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import { createOpenAIFnRunnable } from 'langchain/chains/openai_functions'
import Agent from './agent'
import { AgentOutput, PlanExecuteState } from '../types/agent'
import planFunction from '../functions/plan'
import responseFunction from '../functions/response'

@Injectable()
class RePlannerAgent extends Agent<PlanExecuteState> {
  async act(state: PlanExecuteState): Promise<Partial<PlanExecuteState>> {
    this.logger.debug(`Acting the given state: ${JSON.stringify(state)}`, state)

    const llm = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo'
    })

    const prompt = this.getPromptTemplate('replanner')
    const parser = new JsonOutputFunctionsParser()
    const replanner = createOpenAIFnRunnable({
      functions: [planFunction, responseFunction],
      outputParser: parser,
      llm,
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
