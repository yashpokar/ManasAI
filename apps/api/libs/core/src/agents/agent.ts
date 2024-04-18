import * as path from 'path'
import * as fs from 'fs'
import { AgentState } from '../types/agent'
import { ChatPromptTemplate, ParamsFromFString } from '@langchain/core/prompts'
import { Logger } from '@nestjs/common'

abstract class Agent {
  protected readonly logger = new Logger(this.constructor.name)

  protected getPromptTemplate(
    filename: string
  ): ChatPromptTemplate<ParamsFromFString<string>, any> {
    const prompt = fs.readFileSync(
      path.resolve(__dirname, `../libs/core/src/prompts/${filename}.tpl`),
      'utf8'
    )

    return ChatPromptTemplate.fromTemplate(prompt)
  }

  abstract act(state: AgentState): Promise<Partial<AgentState>>
}

export default Agent
