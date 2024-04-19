import { Inject, Injectable } from '@nestjs/common'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import { ChatOpenAI } from '@langchain/openai'
import Agent from './agent'
import { AgentOutput, PlanExecuteState } from '../types/agent'
import planFunction from '../functions/plan'
import { OPENAI_SERVICE } from '../constants'

@Injectable()
class PlannerAgent extends Agent<PlanExecuteState> {
  constructor(
    @Inject(OPENAI_SERVICE)
    private readonly model: ChatOpenAI
  ) {
    super()
  }

  async act(state: PlanExecuteState): Promise<Partial<PlanExecuteState>> {
    this.logger.debug(`Acting the given state: `, state)

    this.model.bind({
      functions: [planFunction],
      function_call: planFunction
    })

    const planner = this.getPromptTemplate('planner')
      .pipe(this.model)
      .pipe(new JsonOutputFunctionsParser({ argsOnly: true }))

    const plan: AgentOutput = await planner.invoke({
      objective: state.input
    })

    return { plan: plan.steps }
  }
}

export default PlannerAgent
