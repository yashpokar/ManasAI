import { Module } from '@nestjs/common'
import { AIService } from './ai.service'
import { PubSubService } from './providers/pubsub.service'

@Module({
  providers: [AIService],
  exports: [PubSubService, AIService]
})
export class AIModule {}
