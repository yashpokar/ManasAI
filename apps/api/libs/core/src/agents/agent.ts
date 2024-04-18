import { Injectable, Logger } from '@nestjs/common'
import path from 'path'
import * as fs from 'fs'
import { AgentInitilizationInput, AgentState } from '../types/agent'
import { BaseChatModel } from '@langchain/core/language_models/chat_models'
import { ChatPromptTemplate, ParamsFromFString } from '@langchain/core/prompts'
import { Tool } from '@langchain/core/tools'

@Injectable()
abstract class Agent {
  protected logger = new Logger(this.constructor.name)
  protected model: BaseChatModel
  protected tools: Tool[]

  protected getPromptTemplate(
    filename: string
  ): ChatPromptTemplate<ParamsFromFString<string>, any> {
    const prompt = fs.readFileSync(
      path.join(__dirname, `../prompts/${filename}.tpl`),
      'utf8'
    )

    return ChatPromptTemplate.fromTemplate(prompt)
  }

  async initialize({ model, tools }: AgentInitilizationInput): Promise<void> {
    this.model = model
    this.tools = tools
  }

  abstract act(state: AgentState): Promise<Partial<AgentState>>
}

export default Agent
