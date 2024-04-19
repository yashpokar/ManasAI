import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AIService } from './ai.service'
import { PubSubService } from './providers/pubsub.service'
import AgentsOrchestrator from './agents/orchestrator'
import EditorTool from './tools/editor'
import BrowserTool from './tools/browser'
import TerminalTool from './tools/terminal'
import SearchTool from './tools/search'
import FileSystemService from './providers/file-system.service'
import DockerService from './providers/docker.service'
import OpenAIAgent from './agents/openai'
import RePlannerAgent from './agents/replanner'
import PlannerAgent from './agents/planner'

@Module({
  imports: [ConfigModule],
  providers: [
    PubSubService,
    FileSystemService,
    DockerService,
    EditorTool,
    BrowserTool,
    TerminalTool,
    SearchTool,
    OpenAIAgent,
    PlannerAgent,
    RePlannerAgent,
    AgentsOrchestrator,
    AIService
  ],
  exports: [
    PubSubService,
    FileSystemService,
    DockerService,
    AgentsOrchestrator,
    AIService
  ]
})
export class AIModule {}
