import { MessageEntity } from '@/models/message'
import { ProjectEntity } from '@/models/project'
import { MessageResolver } from '@/resolvers/message.resolver'
import { MessageService } from '@/services/message.service'
import { AIModule } from '@core/core'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, MessageEntity]), AIModule],
  providers: [
    // TODO: instead of listing all the providers here, import AIModule from @core/core
    MessageService,
    MessageResolver
  ]
})
export class MessageModule {}
