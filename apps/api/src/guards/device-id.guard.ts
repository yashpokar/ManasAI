import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class DeviceIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context)

    const request = gqlContext.getContext().req

    const deviceId = request?.headers?.['x-device-id']
    if (!deviceId) {
      throw new UnauthorizedException('DeviceId is mandatory')
    }

    request.deviceId = deviceId
    return true
  }
}
