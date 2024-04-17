import { Module } from '@nestjs/common'
import { AIService } from './ai.service'
import { PubSubService } from './providers/pubsub.service'
import AgentsOrchestrator from './agents/orchestrator'
import EditorTool from './tools/editor'
import BrowserTool from './tools/browser'
import TerminalTool from './tools/terminal'
import SearchTool from './tools/search'
import FileSystemService from './providers/file-system.service'
import DockerService from './providers/docker.service'

@Module({
  providers: [AIService],
  exports: [
    PubSubService,
    FileSystemService,
    DockerService,
    EditorTool,
    BrowserTool,
    TerminalTool,
    SearchTool,
    AgentsOrchestrator,
    AIService
  ]
})
export class AIModule {}
