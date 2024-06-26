import {
  MESSAGE_CREATED_EVENT,
  MESSAGE_RECEIVED_EVENT,
  MESSAGE_SENT_EVENT,
  TOPIC_MESSAGE
} from '@core/core/constants'
import { Author, CreateMessageInput, MessageEntity } from '@/models/message'
import { ProjectEntity } from '@/models/project'
import { IContext } from '@/types/context'
import { PubSubService } from '@core/core/providers/pubsub.service'
import { Injectable, Logger } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { MessageResponseEvent } from '@core/core/types/message'

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name)

  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<MessageEntity>,

    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,

    private dataSource: DataSource,

    private readonly pubsubService: PubSubService,

    private readonly eventEmitter: EventEmitter2
  ) {}

  async handleMessageResponse(event: MessageResponseEvent): Promise<void> {
    this.logger.debug(`handling message response`, event)

    const message = await this._create(event.projectId, event.deviceId, {
      content: event.content,
      author: Author.ASSISTANT
    })

    this.eventEmitter.emit(MESSAGE_SENT_EVENT, message)
  }

  async create(
    ctx: IContext,
    input: CreateMessageInput
  ): Promise<MessageEntity> {
    return this._create(ctx.req.projectId, ctx.req.deviceId, input)
  }

  async _create(
    projectId: string,
    deviceId: string,
    input: CreateMessageInput
  ): Promise<MessageEntity> {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      // Note: not depending on the active project from the database
      // in-order to be consistent with the frontend
      const project = await queryRunner.manager.findOne(ProjectEntity, {
        where: { id: projectId, deviceId }
      })

      if (!project) {
        throw new Error('Project not found')
      }

      const message = new MessageEntity()
      message.author = input.author
      message.content = input.content
      message.project = project
      message.createdAt = new Date()

      await queryRunner.manager.save(message)

      await queryRunner.commitTransaction()

      this.eventEmitter.emit(MESSAGE_CREATED_EVENT, message)

      return message
    } catch (error) {
      await queryRunner.rollbackTransaction()

      throw error
    }
  }

  async list(ctx: IContext): Promise<MessageEntity[]> {
    this.logger.debug(`listing messages for project ${ctx.req.projectId}`)

    return this.repository.find({
      where: { project: { id: ctx.req.projectId } }
    })
  }

  async subscribe(projectId: string, deviceId: string) {
    if (!projectId || !deviceId) {
      throw new Error(`Missing required arguments, 'projectId' and 'deviceId'`)
    }

    if (
      !(await this.projectRepository.findOne({
        where: { id: projectId, deviceId }
      }))
    ) {
      throw new Error(`Project and device combination not found`)
    }

    return this.pubsubService.asyncIterator(TOPIC_MESSAGE)
  }

  @OnEvent(MESSAGE_CREATED_EVENT)
  async onMessageCreated(message: MessageEntity): Promise<boolean> {
    this.logger.debug(`sending message to subscribers`)

    await this.pubsubService.publish(TOPIC_MESSAGE, { onMessage: message })

    if (message.author === Author.USER) {
      return this.eventEmitter.emit(MESSAGE_RECEIVED_EVENT, message)
    }

    return this.eventEmitter.emit(MESSAGE_SENT_EVENT, message)
  }
}
