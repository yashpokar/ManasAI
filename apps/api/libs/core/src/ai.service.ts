import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { MessageEntity } from '@/models/message'
import { ChatOpenAI } from '@langchain/openai'
import AgentsOrchestrator from './agents/orchestrator'
import { MESSAGE_RECEIVED_EVENT } from './constants'

@Injectable()
export class AIService {
  constructor(private readonly orchestrator: AgentsOrchestrator) {}

  @OnEvent(MESSAGE_RECEIVED_EVENT)
  async invoke(message: MessageEntity): Promise<void> {
    // TODO: Implement a way to select the model based on the user's preferences
    new ChatOpenAI({
      modelName: 'gpt-4-turbo',
      temperature: 0
    })

    await this.orchestrator.act({
      input: message.content,
      config: {
        recursionLimit: 50
      }
    })
  }
}
