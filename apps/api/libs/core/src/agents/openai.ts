import { Injectable } from '@nestjs/common'
import Agent from './agent'

@Injectable()
class OpenAIAgent extends Agent {
  async act(question: string): Promise<void> {
    this.logger.log(`OpenAIAgent acting on question: ${question}`)
  }
}

export default OpenAIAgent
