import { Injectable } from '@nestjs/common'
import { ToolExecutor } from '@langchain/langgraph/prebuilt'
import Agent from './agent'
import { AgentState } from '../types/agent'
import { convertToOpenAIFunction } from '@langchain/core/utils/function_calling'
import { ChatOpenAI } from '@langchain/openai'

@Injectable()
class OpenAIAgent extends Agent<ChatOpenAI> {
  async act(): Promise<Partial<AgentState>> {
    const toolExecutor = new ToolExecutor({ tools: this.tools })

    const toolsAsOpenAIFunctions = this.tools.map(tool =>
      convertToOpenAIFunction(tool)
    )

    const model = this.model.bind({
      functions: toolsAsOpenAIFunctions
    })

    return {}
  }
}

export default OpenAIAgent
