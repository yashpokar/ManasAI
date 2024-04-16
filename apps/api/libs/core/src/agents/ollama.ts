import Agent from './agent'

class OllamaAgent extends Agent {
  async act(): Promise<void> {
    throw new Error('OllamaAgent not implemented yet.')
  }
}

export default OllamaAgent
