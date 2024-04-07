import { Project } from '@/models/project'
import { IContext } from '@/types/context'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name)

  async createProject(ctx: IContext, name: string): Promise<Project> {
    return {
      id: '1',
      name,
      isActive: true,
      createdAt: new Date()
    }
  }

  async listProjects(ctx: IContext): Promise<Project[]> {
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
