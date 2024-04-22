import { ProjectIdGuard } from '@/guards/project-id.guard'
import { DeviceIdGuard } from '@/guards/device-id.guard'
import { Message, CreateMessageInput } from '@/models/message'
import { MessageService } from '@/services/message.service'
import { IContext } from '@/types/context'
import { Logger, UseGuards } from '@nestjs/common'
import {
  Args,
  Context,
  Mutation,
  Resolver,
  Subscription
} from '@nestjs/graphql'
import { OnEvent } from '@nestjs/event-emitter'
import { MESSAGE_RECEIVED_EVENT } from '@core/core/constants'
import { MessageResponseEvent } from '@core/core/types/message'

@Resolver()
export class MessageResolver {
  private readonly logger = new Logger(MessageResolver.name)
  constructor(private readonly service: MessageService) {}

  @OnEvent(MESSAGE_RECEIVED_EVENT)
  async onMessageReceived(event: MessageResponseEvent): Promise<void> {
    return this.service.handleMessageResponse(event)
  }

  @Mutation(() => Message)
  @UseGuards(DeviceIdGuard, ProjectIdGuard)
  async createMessage(
    @Context() ctx: IContext,
    @Args('input') input: CreateMessageInput
  ): Promise<Message> {
    this.logger.debug(`creating message for project ${ctx.req.projectId}`)
    return this.service.create(ctx, input)
  }

  @Subscription(() => Message, {
    filter: (payload, variables) => {
      return (
        payload.onMessage.project.deviceId === variables.deviceId &&
        payload.onMessage.project.id === variables.projectId
      )
    }
  })
  async onMessage(
    @Args('projectId') projectId: string,
    @Args('deviceId') deviceId: string
  ): Promise<AsyncIterator<Message>> {
    return this.service.subscribe(projectId, deviceId)
  }
}
