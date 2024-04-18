import { AgentState } from '../types/agent'
import Agent from './agent'

class OllamaAgent extends Agent {
  async act(): Promise<Partial<AgentState>> {
    throw new Error('OllamaAgent not implemented yet.')
  }
}

export default OllamaAgent
