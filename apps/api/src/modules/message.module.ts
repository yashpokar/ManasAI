import { MessageEntity } from '@/models/message'
import { ProjectEntity } from '@/models/project'
import { MessageResolver } from '@/resolvers/message.resolver'
import { MessageService } from '@/services/message.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, MessageEntity])],
  providers: [MessageService, MessageResolver]
})
export class MessageModule {}
