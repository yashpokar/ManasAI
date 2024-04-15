import { CreateMessageInput, MessageEntity } from '@/models/message'
import { ProjectEntity } from '@/models/project'
import { IContext } from '@/types/context'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name)

  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<MessageEntity>,

    private dataSource: DataSource
  ) {}

  async create(
    ctx: IContext,
    input: CreateMessageInput
  ): Promise<MessageEntity> {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      // Note: not depending on the active project from the database
      // in-order to be consistent with the frontend
      const project = await queryRunner.manager.findOne(ProjectEntity, {
        where: { id: ctx.req.projectId, deviceId: ctx.req.deviceId }
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
}
