import { DeviceIdGuard } from '@/guards/device-id.guard'
import { Project } from '@/models/project'
import { ProjectService } from '@/services/project.service'
import { IContext } from '@/types/context'
import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class ProjectResolver {
  constructor(private readonly service: ProjectService) {}

  @Mutation(() => Project)
  @UseGuards(DeviceIdGuard)
  async createProject(
    @Context() ctx: IContext,
    @Args('name') name: string
  ): Promise<Project> {
    return this.service.create(ctx, name)
  }

  @Query(() => [Project])
  @UseGuards(DeviceIdGuard)
  async listProjects(@Context() ctx: IContext): Promise<Project[]> {
    return this.service.list(ctx)
  }

  @Query(() => Boolean)
  @UseGuards(DeviceIdGuard)
  async isProjectNameTaken(
    @Context() ctx: IContext,
    @Args('name') name: string
  ): Promise<boolean> {
    return this.service.isNameTaken(ctx, name)
  }

  @Mutation(() => Project)
  @UseGuards(DeviceIdGuard)
  async changeActiveProject(
    @Context() ctx: IContext,
    @Args('projectId') projectId: string
  ): Promise<Project> {
    return this.service.changeActive(ctx, projectId)
  }

  @Mutation(() => String)
  generateDeviceId(): string {
    return this.service.generateDeviceId()
  }
}
