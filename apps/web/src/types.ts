import { Project } from '@/gql/graphql'
import { LOADED, LOADING } from '@/constants'

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
  loading: boolean
  createProject: (projectName: string) => void
  changeActiveProject: (projectId: string) => void
  isProjectNameTaken: (name: string) => Promise<boolean>
  listProjects: () => void
  processing: () => void
}

export interface IDeviceContext {
  id: string | null
  isSetup: boolean
  loading: boolean
  setupDevice: (id: string) => void
}

export interface Message {
  id: string
  content: string | React.ReactNode
  author: 'USER' | 'ASSISTANT' | 'SYSTEM'
}

export interface IChatContext {
  messages: Message[]
  sendMessage: (content: string) => void
  setMessages: (messages: Message[]) => void
}

export type FormActions =
  | {
      type: typeof LOADING
    }
  | {
      type: typeof LOADED
    }
