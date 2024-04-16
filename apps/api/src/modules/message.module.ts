import { MessageEntity } from '@/models/message'
import { ProjectEntity } from '@/models/project'
import { MessageResolver } from '@/resolvers/message.resolver'
import { MessageService } from '@/services/message.service'
import { AIService } from '@core/core'
import OpenAIAgent from '@core/core/agents/openai'
import { PubSubService } from '@core/core/providers/pubsub.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, MessageEntity])],
  providers: [
    PubSubService,
    OpenAIAgent,
    AIService,
    MessageService,
    MessageResolver
  ]
})
export class MessageModule {}
