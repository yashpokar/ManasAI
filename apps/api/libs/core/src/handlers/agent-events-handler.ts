import { BaseCallbackHandler } from '@langchain/core/callbacks/base'
import { Injectable, Logger } from '@nestjs/common'
import { AgentAction, AgentFinish } from 'langchain/agents'

@Injectable()
class AgentEventsHandler extends BaseCallbackHandler {
  name = 'AgentEventsHandler'

  private readonly logger = new Logger(AgentEventsHandler.name)

  async handleAgentAction(action: AgentAction) {
    this.logger.log(`handleAgentAction `, action.log)
  }

  async handleToolEnd(output: string) {
    this.logger.log(`handleToolEnd `, output)
  }

  async handleText(text: string) {
    this.logger.log(`handleText `, text)
  }

  async handleAgentEnd(action: AgentFinish) {
    this.logger.log(`handleAgentEnd `, action.log)
  }
}

export default AgentEventsHandler
