import { Module } from '@nestjs/common'
import { PreviewResolver } from '@/resolvers/preview.resolver'
import { PreviewService } from '@/services/preview.service'
import { PubSubService } from '@core/core/providers/pubsub.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectEntity } from '@/models/project'
import { EventEmitter2 } from '@nestjs/event-emitter'

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  providers: [EventEmitter2, PubSubService, PreviewResolver, PreviewService]
})
export class PreviewModule {}
