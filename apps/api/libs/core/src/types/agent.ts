export interface AgentState {
  input: string | null
  plan: string[]
  pastSteps: string[]
  response: string | null
}

export interface AgentOutput {
  steps?: string[]
  response?: string
}
