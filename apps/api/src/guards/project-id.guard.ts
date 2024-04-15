import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class ProjectIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context)
    const request = gqlContext.getContext().req

    const projectId = request?.headers?.['x-project-id']
    if (!projectId) {
      throw new UnauthorizedException('ProjectId is mandatory')
    }

    request.projectId = projectId
    return true
  }
}
