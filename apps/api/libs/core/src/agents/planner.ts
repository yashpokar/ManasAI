import { Injectable } from '@nestjs/common'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import { ChatOpenAI } from '@langchain/openai'
import Agent from './agent'
import { AgentOutput, PlanExecuteState } from '../types/agent'
import planFunction from '../functions/plan'

@Injectable()
class PlannerAgent extends Agent<PlanExecuteState> {
  async act(state: PlanExecuteState): Promise<Partial<PlanExecuteState>> {
    this.logger.debug(`Acting the given state: `, state)

    const llm = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview'
    }).bind({
      functions: [planFunction],
      function_call: planFunction
    })

    const planner = this.getPromptTemplate('planner')
      .pipe(llm)
      .pipe(new JsonOutputFunctionsParser({ argsOnly: true }))

    const plan: AgentOutput = await planner.invoke({
      objective: state.input
    })

    return { plan: plan.steps }
  }
}

export default PlannerAgent
