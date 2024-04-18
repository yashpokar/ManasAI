import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { MessageEntity } from '@/models/message'
import { ChatOpenAI } from '@langchain/openai'
import AgentsOrchestrator from './agents/orchestrator'
import { MESSAGE_RECEIVED_EVENT } from './constants'
import OpenAIAgent from './agents/openai'

@Injectable()
export class AIService {
  constructor(
    private readonly orchestrator: AgentsOrchestrator,
    private readonly openaiAgent: OpenAIAgent
  ) {}

  @OnEvent(MESSAGE_RECEIVED_EVENT)
  async invoke(message: MessageEntity): Promise<void> {
    // TODO: Implement a way to select the model based on the user's preferences
    const model = new ChatOpenAI({
      modelName: 'gpt-4-turbo',
      temperature: 0
    })

    this.openaiAgent.initialize(model)

    await this.orchestrator.act({
      input: message.content,
      config: {
        recursionLimit: 50
      }
    })
  }
}
