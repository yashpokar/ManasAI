import { Module } from '@nestjs/common'
import { AIService } from './ai.service'
import { PubSubService } from './providers/pubsub.service'
import OpenAIAgent from './agents/openai'

@Module({
  providers: [AIService],
  exports: [PubSubService, OpenAIAgent, AIService]
})
export class AIModule {}
