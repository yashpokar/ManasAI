import { Injectable, Logger } from '@nestjs/common'
import path from 'path'
import * as fs from 'fs'
import { AgentState } from '../types/agent'
import { BaseChatModel } from '@langchain/core/language_models/chat_models'
import { ChatPromptTemplate, ParamsFromFString } from '@langchain/core/prompts'

@Injectable()
abstract class Agent {
  protected logger = new Logger(this.constructor.name)
  protected llm: BaseChatModel

  protected getPromptTemplate(
    filename: string
  ): ChatPromptTemplate<ParamsFromFString<string>, any> {
    const prompt = fs.readFileSync(
      path.join(__dirname, `../prompts/${filename}.tpl`),
      'utf8'
    )

    return ChatPromptTemplate.fromTemplate(prompt)
  }

  async initialize(llm: BaseChatModel): Promise<void> {
    this.llm = llm
  }

  abstract act(state: AgentState): Promise<Partial<AgentState>>
}

export default Agent
