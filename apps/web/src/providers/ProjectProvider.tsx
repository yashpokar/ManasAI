import React, { createContext, useMemo, useReducer } from 'react'
import { IProjectContext, ProviderProps } from '@/types'
import { ADD_PROJECT, CHANGE_ACTIVE_PROJECT, LIST_PROJECTS } from '@/constants'
import { Project } from '@/__generated__/graphql'

type ProjectState = {
  projects: Project[]
  activeProject: Project | null
}

type ProjectAction =
  | {
      type: typeof ADD_PROJECT
      payload: Project
    }
  | { type: typeof LIST_PROJECTS; payload: Project[] }
  | { type: typeof CHANGE_ACTIVE_PROJECT; payload: string }

export const ProjectContext = createContext<IProjectContext>({
  projects: [],
  activeProject: null,
  createProject: () => {},
  changeActiveProject: () => {},
  isProjectNameTaken: () => false
})

const ProjectProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: ProjectState, action: ProjectAction) => {
      switch (action.type) {
        case ADD_PROJECT:
          return {
            ...state,
            projects: [...state.projects, action.payload]
          }
        case LIST_PROJECTS:
          return {
            ...state,
            projects: action.payload
          }
        case CHANGE_ACTIVE_PROJECT:
          return {
            ...state,
            activeProject:
              state.projects.find(project => project.id === action.payload) ||
              null
          }
        default:
          return state
      }
    },
    { projects: [], activeProject: null }
  )

  const actions = useMemo(
    () => ({
      createProject: (
        project: Omit<Project, 'id' | 'isActive' | 'createdAt'>
      ) => {
        dispatch({
          type: ADD_PROJECT,
          payload: {
            ...project,
            id: Math.random().toString(),
            createdAt: new Date().toISOString(),
            isActive: false
          }
        })
      },
      changeActiveProject: (projectId: string) => {
        dispatch({
          type: CHANGE_ACTIVE_PROJECT,
          payload: projectId
        })
      },
      isProjectNameTaken: (name: string) => {
        return state.projects.some(project => project.name === name)
      }
    }),
    [state]
  )

  return (
    <ProjectContext.Provider value={{ ...state, ...actions }}>
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectProvider
