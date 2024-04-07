import { DeviceIdGuard } from '@/guards/device-id.guard'
import { Project } from '@/models/project'
import { ProjectService } from '@/services/project.service'
import { IContext } from '@/types/context'
import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(DeviceIdGuard)
export class ProjectResolver {
  constructor(private readonly service: ProjectService) {}

  @Mutation(() => Project)
  async createProject(
    @Context() ctx: IContext,
    @Args('name') name: string
  ): Promise<Project> {
    return this.service.createProject(ctx, name)
  }

  @Query(() => [Project])
  async listProjects(@Context() ctx: IContext): Promise<Project[]> {
    return this.service.listProjects(ctx)
  }
}
