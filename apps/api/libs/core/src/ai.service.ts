import { Injectable } from '@nestjs/common'
import OpenAIAgent from './agents/openai'

@Injectable()
export class AIService {
  constructor(private readonly agent: OpenAIAgent) {}

  async invoke(): Promise<void> {
    await this.agent.act()
  }
}
