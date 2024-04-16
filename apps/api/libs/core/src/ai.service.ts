import { Injectable, Logger } from '@nestjs/common'
import OpenAIAgent from './agents/openai'
import { OnEvent } from '@nestjs/event-emitter'
import { MESSAGE_RECEIVED_EVENT } from './constants'
import { MessageEntity } from '@/models/message'

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name)

  constructor(private readonly agent: OpenAIAgent) {}

  @OnEvent(MESSAGE_RECEIVED_EVENT)
  async invoke(message: MessageEntity): Promise<void> {
    this.logger.debug(`invoking AI agent for message ${message.id}`)

    await this.agent.act()
  }
}
