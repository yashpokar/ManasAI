import { Injectable } from '@nestjs/common'
import Agent from './agent'

@Injectable()
class OpenAIAgent extends Agent {
  async act(): Promise<void> {
    this.logger.log('OpenAIAgent acting')
  }
}

export default OpenAIAgent
