import { Module } from '@nestjs/common'
import { ProjectResolver } from '@/resolvers/project.resolver'
import { ProjectService } from '@/services/project.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectEntity } from '@/models/project'
import { MessageEntity } from '@/models/message'

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, MessageEntity])],
  providers: [ProjectResolver, ProjectService]
})
export class ProjectModule {}
