import { Project, ProjectEntity } from '@/models/project'
import { IContext } from '@/types/context'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name)

  constructor(
    @InjectRepository(ProjectEntity)
    private readonly repository: Repository<ProjectEntity>,

    private dataSource: DataSource
  ) {}

  async create(ctx: IContext, name: string): Promise<Project> {
    const queryRunner = this.dataSource.createQueryRunner()

    let project = new ProjectEntity()
    project.name = name
    project.deviceId = ctx.req.deviceId
    project.isActive = true
    project.createdAt = new Date()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      await queryRunner.manager.update(
        ProjectEntity,
        { deviceId: ctx.req.deviceId },
        { isActive: false }
      )

      project = await queryRunner.manager.save(project)

      await queryRunner.commitTransaction()

      return project
    } catch (error) {
      await queryRunner.rollbackTransaction()

      throw error
    } finally {
      await queryRunner.release()
    }
  }

  async list(ctx: IContext): Promise<Project[]> {
    this.logger.log(`device id ${ctx.req.deviceId}`)

    return [
      {
        id: '1',
        name: 'Project 1',
        isActive: true,
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Project 2',
        isActive: false,
        createdAt: new Date()
      }
    ]
  }
}
