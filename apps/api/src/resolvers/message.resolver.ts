import { Message, CreateMessageInput } from '@/models/message'
import { IContext } from '@/types/context'
import { Logger } from '@nestjs/common'
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
  private pubSub: PubSub

  constructor() {
    this.pubSub = new PubSub()
  }

  @Mutation(() => Message)
  async createMessage(
    @Context() ctx: IContext,
    @Args('input') input: CreateMessageInput
  ): Promise<Message> {
    const message = {
      id: '1',
      content: input.content,
      author: input.author
    }

    this.pubSub.publish('message', { onMessage: message })
    return message
  }

  @Subscription(() => Message)
  async onMessage(@Context() ctx: IContext): Promise<AsyncIterator<Message>> {
    this.logger.log(`Subscribing to messages from ${ctx}`)

    return this.pubSub.asyncIterator('message')
  }
}
