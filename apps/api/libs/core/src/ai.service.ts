import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { MessageEntity } from '@/models/message'
import { END, StateGraph } from '@langchain/langgraph'
import {
  AGENT_NODE,
  MESSAGE_RECEIVED_EVENT,
  PLANNER_NODE,
  REPLANNER_NODE
} from './constants'
import OpenAIAgent from './agents/openai'
import PlannerAgent from './agents/planner'
import RePlannerAgent from './agents/replanner'
import { PlanExecuteState } from './types/agent'

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name)

  constructor(
    private readonly openaiAgent: OpenAIAgent,
    private readonly plannerAgent: PlannerAgent,
    private readonly replannerAgent: RePlannerAgent
  ) {}

  @OnEvent(MESSAGE_RECEIVED_EVENT)
  async invoke(message: MessageEntity): Promise<void> {
    const workflow = new StateGraph({
      channels: {
        input: {
          value: null
        },
        plan: {
          value: null,
          default: () => []
        },
        pastSteps: {
          value: (x, y) => x.concat(y),
          default: () => []
        },
        response: {
          value: null
        }
      }
    })

    workflow.addNode(
      PLANNER_NODE,
      this.plannerAgent.act.bind(this.plannerAgent)
    )
    workflow.addNode(AGENT_NODE, this.openaiAgent.act.bind(this.openaiAgent))
    workflow.addNode(
      REPLANNER_NODE,
      this.replannerAgent.act.bind(this.replannerAgent)
    )

    workflow.addEdge(PLANNER_NODE, AGENT_NODE)
    workflow.addEdge(AGENT_NODE, REPLANNER_NODE)

    workflow.setEntryPoint(PLANNER_NODE)

    workflow.addConditionalEdges(
      REPLANNER_NODE,
      (state: PlanExecuteState) => {
        if (state.response) {
          return true
        }

        return false
      },
      {
        true: END,
        false: PLANNER_NODE
      }
    )

    const app = workflow.compile()

    for await (const event of await app.stream(
      {
        input: message.content
      },
      {
        recursionLimit: 50
      }
    )) {
      this.logger.log(`Event: ${JSON.stringify(event)}`)
    }
  }
}
