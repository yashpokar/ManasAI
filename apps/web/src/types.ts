export interface Workspace {
  id: string
  name: string
}

export interface Command {
  stdout: string
  isOutput: boolean
}
