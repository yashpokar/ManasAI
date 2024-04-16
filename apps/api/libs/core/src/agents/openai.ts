import Agent from './agent'

class OpenAIAgent extends Agent {
  async act(): Promise<void> {
    console.log('OpenAIAgent acting')
  }
}

export default OpenAIAgent
