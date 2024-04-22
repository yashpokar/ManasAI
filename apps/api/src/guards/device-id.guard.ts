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
export class DeviceIdGuard implements CanActivate {
  constructor(
    // Note: ideally, we should use a service to check the deviceId
    // but to avoid the dependency cycle, we are using the repository directly
    @InjectRepository(ProjectEntity)
    private readonly repository: Repository<ProjectEntity>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context)

    const request = gqlContext.getContext().req

    const deviceId = request?.headers?.['x-device-id']
    if (
      !deviceId ||
      !(await this.repository.findOne({ where: { deviceId } }))
    ) {
      throw new UnauthorizedException('DeviceId is mandatory')
    }

    request.deviceId = deviceId
    return true
  }
}
