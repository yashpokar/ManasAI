import { Project, ProjectEntity } from '@/models/project'
import { IContext } from '@/types/context'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { randomUUID } from 'crypto'
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
      const existingProject = await queryRunner.manager.findOne(ProjectEntity, {
        where: { name, deviceId: ctx.req.deviceId }
      })

      if (existingProject) {
        throw new Error('Project already exists')
      }

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

    return this.repository.find({
      where: {
        deviceId: ctx.req.deviceId
      }
    })
  }

  async isNameTaken(ctx: IContext, name: string): Promise<boolean> {
    const project = await this.repository.findOne({
      where: { name, deviceId: ctx.req.deviceId }
    })

    return !!project
  }

  async changeActive(ctx: IContext, projectId: string): Promise<Project> {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      await queryRunner.manager.update(
        ProjectEntity,
        { deviceId: ctx.req.deviceId },
        { isActive: false }
      )

      const project = await queryRunner.manager.findOne(ProjectEntity, {
        where: { id: projectId, deviceId: ctx.req.deviceId }
      })

      if (!project) {
        throw new Error('Project not found')
      }

      project.isActive = true

      await queryRunner.manager.save(project)

      await queryRunner.commitTransaction()

      return project
    } catch (error) {
      await queryRunner.rollbackTransaction()

      throw error
    } finally {
      await queryRunner.release()
    }
  }

  async getActive(ctx: IContext): Promise<Project> {
    return this.repository.findOne({
      where: { deviceId: ctx.req.deviceId, isActive: true }
    })
  }

  generateDeviceId(): string {
    return randomUUID()
  }
}
