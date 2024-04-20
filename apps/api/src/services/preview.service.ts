import { ProjectEntity } from '@/models/project'
import { PubSubService } from '@core/core/providers/pubsub.service'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class PreviewService {
  constructor(
    private readonly pubsubService: PubSubService,

    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>
  ) {}

  async publish(topic: string, data: any): Promise<void> {
    return this.pubsubService.publish(topic, data)
  }

  async subscribe(topic: string, projectId: string, deviceId: string) {
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

    return this.pubsubService.asyncIterator(topic)
  }
}
