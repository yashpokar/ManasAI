import Agent from './agent'

class OpenAIAgent implements Agent {
  constructor() {
    console.log('OpenAIAgent created')
  }

  async act(): Promise<void> {
    console.log('OpenAIAgent acting')
  }
}

export default OpenAIAgent
