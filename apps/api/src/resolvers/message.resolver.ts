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
@UseGuards(DeviceIdGuard, ProjectIdGuard)
export class MessageResolver {
  private readonly logger = new Logger(MessageResolver.name)
  private pubSub: PubSub

  constructor(private readonly service: MessageService) {
    this.pubSub = new PubSub()
  }

  @Mutation(() => Message)
  async createMessage(
    @Context() ctx: IContext,
    @Args('input') input: CreateMessageInput
  ): Promise<Message> {
    const message = await this.service.create(ctx, input)

    this.pubSub.publish('message', { onMessage: message })
    return message
  }

  @Subscription(() => Message)
  async onMessage(@Context() ctx: IContext): Promise<AsyncIterator<Message>> {
    this.logger.log(`Subscribing to messages from ${ctx}`)

    return this.pubSub.asyncIterator('message')
  }
}
