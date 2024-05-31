import { Injectable } from '@nestjs/common'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import { ChatOpenAI } from '@langchain/openai'
import Agent from './agent'
import { AgentOutput, PlanExecuteState } from '../types/agent'
import planFunction from '../functions/plan'
import { PREVIEW_EVENT, TOPIC_PLAN } from '../constants'
import { EventEmitter2 } from '@nestjs/event-emitter'

@Injectable()
class PlannerAgent extends Agent<PlanExecuteState> {
  constructor(private readonly eventEmitter: EventEmitter2) {
    super()
  }

  async act(state: PlanExecuteState): Promise<Partial<PlanExecuteState>> {
    this.logger.debug(`Acting the given state: `, state)

    const llm = new ChatOpenAI({
      modelName: 'gpt-4o'
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

    this.eventEmitter.emit(PREVIEW_EVENT, TOPIC_PLAN, {
      onPlanPreview: plan
    })

    return { plan: plan.steps }
  }
}

export default PlannerAgent
