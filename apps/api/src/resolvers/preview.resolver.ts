import { Plan } from '@core/core/models/plan'
import { PreviewService } from '@/services/preview.service'
import {
  TOPIC_EDITOR,
  TOPIC_PLAN,
  TOPIC_BROWSER,
  TOPIC_TERMINAL,
  PREVIEW_EVENT
} from '@core/core/constants'
import { Args, Resolver, Subscription } from '@nestjs/graphql'
import { Editor } from '@core/core/models/editor'
import { Terminal } from '@core/core/models/terminal'
import { Browser } from '@core/core/models/browser'
import { OnEvent } from '@nestjs/event-emitter'

@Resolver()
export class PreviewResolver {
  constructor(private readonly service: PreviewService) {}

  @OnEvent(PREVIEW_EVENT)
  async preview(topic: string, data: any): Promise<void> {
    return this.service.publish(topic, data)
  }

  @Subscription(() => Plan)
  async onPlanPreview(
    @Args('projectId') projectId: string,
    @Args('deviceId') deviceId: string
  ): Promise<AsyncIterator<Plan>> {
    return this.service.subscribe(TOPIC_PLAN, projectId, deviceId)
  }

  @Subscription(() => Editor)
  async onEditorPreview(
    @Args('projectId') projectId: string,
    @Args('deviceId') deviceId: string
  ): Promise<AsyncIterator<Editor>> {
    return this.service.subscribe(TOPIC_EDITOR, projectId, deviceId)
  }

  @Subscription(() => Terminal)
  async onTerminalPreview(
    @Args('projectId') projectId: string,
    @Args('deviceId') deviceId: string
  ): Promise<AsyncIterator<Terminal>> {
    return this.service.subscribe(TOPIC_TERMINAL, projectId, deviceId)
  }

  @Subscription(() => Browser)
  async onBrowserPreview(
    @Args('projectId') projectId: string,
    @Args('deviceId') deviceId: string
  ): Promise<AsyncIterator<Browser>> {
    return this.service.subscribe(TOPIC_BROWSER, projectId, deviceId)
  }
}
