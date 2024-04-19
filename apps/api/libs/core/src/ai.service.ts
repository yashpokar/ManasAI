import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { MessageEntity } from '@/models/message'
import { END } from '@langchain/langgraph'
import AgentsOrchestrator from './agents/orchestrator'
import {
  AGENT_NODE,
  CONTINUE,
  EXIT,
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
  constructor(
    private readonly orc: AgentsOrchestrator<PlanExecuteState>,
    private readonly openaiAgent: OpenAIAgent,
    private readonly plannerAgent: PlannerAgent,
    private readonly replannerAgent: RePlannerAgent
  ) {}

  @OnEvent(MESSAGE_RECEIVED_EVENT)
  async invoke(message: MessageEntity): Promise<void> {
    this.orc.initiate({
      input: {
        value: null
      },
      plan: {
        value: null,
        default: () => []
      },
      pastSteps: {
        value: (prev, curr) => prev.concat(curr),
        default: () => []
      },
      response: {
        value: null
      }
    })

    this.orc.orchestrate({
      nodes: [
        [PLANNER_NODE, this.plannerAgent],
        [AGENT_NODE, this.openaiAgent],
        [REPLANNER_NODE, this.replannerAgent]
      ],
      edges: [
        [PLANNER_NODE, AGENT_NODE],
        [AGENT_NODE, REPLANNER_NODE],
        [REPLANNER_NODE, PLANNER_NODE]
      ],
      conditionalEdges: [
        [
          REPLANNER_NODE,
          ({ response }) => (response ? EXIT : CONTINUE),
          {
            [CONTINUE]: PLANNER_NODE,
            [EXIT]: END
          }
        ]
      ],
      entryPoint: PLANNER_NODE
    })

    this.orc.act({
      args: {
        input: message.content,
        plan: [],
        pastSteps: [],
        response: null
      },
      config: {
        recursionLimit: 50
      }
    })
  }
}
