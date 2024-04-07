import { Module } from '@nestjs/common'
import { ProjectResolver } from '@/resolvers/project.resolver'
import { ProjectService } from '@/services/project.service'

@Module({
  providers: [ProjectResolver, ProjectService]
})
export class ProjectModule {}
