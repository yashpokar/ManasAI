import { Injectable, Logger } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'

@Injectable()
export class PubSubService {
  private pubSub: PubSub = new PubSub()
  private readonly logger = new Logger(PubSubService.name)

  async publish(trigger: string, payload: any): Promise<void> {
    this.logger.debug(`Publishing to trigger: ${trigger}`, payload)

    return this.pubSub.publish(trigger, payload)
  }

  asyncIterator<T = any>(trigger: string): AsyncIterator<T> {
    return this.pubSub.asyncIterator(trigger)
  }
}
