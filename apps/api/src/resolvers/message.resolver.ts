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
import { PubSub } from 'graphql-subscriptions'

@Resolver()
export class MessageResolver {
  private readonly logger = new Logger(MessageResolver.name)
  private pubSub: PubSub = new PubSub()

  constructor(private readonly service: MessageService) {}

  @Mutation(() => Message)
  @UseGuards(DeviceIdGuard, ProjectIdGuard)
  async createMessage(
    @Context() ctx: IContext,
    @Args('input') input: CreateMessageInput
  ): Promise<Message> {
    const message = await this.service.create(ctx, input)

    this.pubSub.publish('message', { onMessage: message })
    return message
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
    if (!projectId || !deviceId) {
      throw new Error('Missing required arguments')
    }

    return this.pubSub.asyncIterator('message')
  }
}
