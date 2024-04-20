import * as path from 'path'
import * as fs from 'fs'
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  ParamsFromFString
} from '@langchain/core/prompts'
import { Logger } from '@nestjs/common'
import * as yaml from 'js-yaml'
import { Prompt } from '../types/agent'

abstract class Agent<State> {
  protected readonly logger = new Logger(this.constructor.name)

  protected getPromptTemplate(
    filename: string
  ): ChatPromptTemplate<ParamsFromFString<string>, any> {
    const promptContent = fs.readFileSync(
      path.resolve(__dirname, `../libs/core/src/prompts/${filename}.yaml`),
      'utf8'
    )

    const data = yaml.load(promptContent) as Prompt

    return ChatPromptTemplate.fromMessages(
      data.template.map(prompt => {
        if ('placeholder' in prompt) {
          return new MessagesPlaceholder(prompt.placeholder)
        }

        return [prompt.author, prompt.prompt]
      })
    )
  }

  abstract act(state: State): Promise<Partial<State>>
}

export default Agent
