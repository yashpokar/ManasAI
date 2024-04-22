import { ProjectEntity } from '@/models/project'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ProjectIdGuard implements CanActivate {
  constructor(
    // Note: ideally, we should use a service to check the projectId
    // but to avoid the dependency cycle, we are using the repository directly
    @InjectRepository(ProjectEntity)
    private readonly repository: Repository<ProjectEntity>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context)
    const request = gqlContext.getContext().req

    const projectId = request?.headers?.['x-project-id']
    if (
      !projectId ||
      !(await this.repository.findOne({ where: { id: projectId } }))
    ) {
      throw new UnauthorizedException('ProjectId is mandatory')
    }

    request.projectId = projectId
    return true
  }
}
