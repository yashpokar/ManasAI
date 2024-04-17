import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { MESSAGE_RECEIVED_EVENT } from './constants'
import { MessageEntity } from '@/models/message'
import AgentsOrchestrator from './agents/orchestrator'

@Injectable()
export class AIService {
  constructor(private readonly orchestrator: AgentsOrchestrator) {}

  @OnEvent(MESSAGE_RECEIVED_EVENT)
  async invoke(message: MessageEntity): Promise<void> {
    await this.orchestrator.act(message.content)
  }
}
