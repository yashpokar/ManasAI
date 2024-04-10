import { MessageResolver } from '@/resolvers/message.resolver'
import { Module } from '@nestjs/common'

@Module({
  imports: [],
  providers: [MessageResolver]
})
export class MessageModule {}
