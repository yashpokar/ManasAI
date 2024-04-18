import { Injectable } from '@nestjs/common'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import Agent from './agent'
import { AgentOutput, AgentState } from '../types/agent'

@Injectable()
class PlannerAgent extends Agent {
  async act(state: AgentState): Promise<Partial<AgentState>> {
    this.logger.debug(`Acting the given state: ${state}`)

    const prompt = this.getPromptTemplate('planner')
    const parser = new JsonOutputFunctionsParser({ argsOnly: true })
    const planner = prompt.pipe(this.llm).pipe(parser)

    const plan: AgentOutput = await planner.invoke({
      objective: state.input
    })

    return { plan: plan.steps }
  }
}

export default PlannerAgent
