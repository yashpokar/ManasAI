import { Message } from '@/models/message'
import { Injectable, Logger } from '@nestjs/common'
import { toStructuredTools } from '../tools/tool'
import { Tool as StructuredTool } from '@langchain/core/tools'
import EditorTool from '../tools/editor'
import TerminalTool from '../tools/terminal'
import BrowserTool from '../tools/browser'
import SearchTool from '../tools/search'

@Injectable()
abstract class Agent {
  protected logger = new Logger(this.constructor.name)

  constructor(
    private readonly editor: EditorTool,
    private readonly browser: BrowserTool,
    private readonly terminal: TerminalTool,
    private readonly search: SearchTool
  ) {}

  protected get tools(): StructuredTool[] {
    return toStructuredTools([
      this.editor,
      this.browser,
      this.terminal,
      this.search
    ])
  }

  abstract act(question: string, previousMessage: Message[]): Promise<void>
}

export default Agent
