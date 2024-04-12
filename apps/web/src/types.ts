import { Project } from './__generated__/graphql'

export interface Workspace {
  id: string
  name: string
}

export interface Command {
  stdout: string
  isOutput: boolean
}

export interface ProviderProps {
  children: React.ReactNode
}

export interface IThemeContext {
  isDarkMode: boolean
  toggleTheme: () => void
}

export interface IProjectContext {
  projects: Project[]
  activeProject: Project | null
  createProject: (
    project: Omit<Project, 'id' | 'isActive' | 'createdAt'>
  ) => void
  changeActiveProject: (projectId: string) => void
  isProjectNameTaken: (name: string) => boolean
}

export interface IDeviceContext {
  token: string | null
  isLoading: boolean
}

export interface Message {
  id: string
  content: string
  author: 'USER' | 'ASSISTANT' | 'SYSTEM'
}

export interface IHistoryContext {
  messages: Message[]
  addMessage: (message: Message) => void
  setMessages: (messages: Message[]) => void
}
