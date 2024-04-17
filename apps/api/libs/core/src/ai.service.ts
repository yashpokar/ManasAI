import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { MESSAGE_RECEIVED_EVENT } from './constants'
import { MessageEntity } from '@/models/message'
import AgentsOrchestrator from './agents/orchestrator'

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name)

  constructor(private readonly agent: AgentsOrchestrator) {}

  @OnEvent(MESSAGE_RECEIVED_EVENT)
  async invoke(message: MessageEntity): Promise<void> {
    await this.agent.act(message.content)
  }
}
