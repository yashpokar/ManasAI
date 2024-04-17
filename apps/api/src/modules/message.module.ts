import { MessageEntity } from '@/models/message'
import { ProjectEntity } from '@/models/project'
import { MessageResolver } from '@/resolvers/message.resolver'
import { MessageService } from '@/services/message.service'
import { AIService } from '@core/core'
import AgentsOrchestrator from '@core/core/agents/orchestrator'
import DockerService from '@core/core/providers/docker.service'
import FileSystemService from '@core/core/providers/file-system.service'
import { PubSubService } from '@core/core/providers/pubsub.service'
import BrowserTool from '@core/core/tools/browser'
import EditorTool from '@core/core/tools/editor'
import SearchTool from '@core/core/tools/search'
import TerminalTool from '@core/core/tools/terminal'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, MessageEntity])],
  providers: [
    PubSubService,
    FileSystemService,
    DockerService,
    EditorTool,
    BrowserTool,
    TerminalTool,
    SearchTool,
    AgentsOrchestrator,
    AIService,
    MessageService,
    MessageResolver
  ]
})
export class MessageModule {}
