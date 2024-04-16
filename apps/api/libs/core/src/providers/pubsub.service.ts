import { Injectable } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'

@Injectable()
export class PubSubService {
  private pubSub: PubSub

  constructor() {
    this.pubSub = new PubSub()
  }

  publish(trigger: string, payload: any) {
    this.pubSub.publish(trigger, payload)
  }

  asyncIterator<T = any>(trigger: string) {
    return this.pubSub.asyncIterator(trigger) as AsyncIterator<T>
  }
}
