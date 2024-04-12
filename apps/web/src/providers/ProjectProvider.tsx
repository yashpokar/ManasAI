import React, { createContext, useMemo, useReducer } from 'react'
import { FormActions, IProjectContext, ProviderProps } from '@/types'
import {
  ADD_PROJECT,
  CHANGE_ACTIVE_PROJECT,
  LIST_PROJECTS,
  LOADED,
  LOADING
} from '@/constants'
import { Project } from '@/__generated__/graphql'
import { gql, useLazyQuery, useMutation } from '@apollo/client'

const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject($name: String!) {
    createProject(name: $name) {
      id
      name
      isActive
      createdAt
    }
  }
`

const CHANGE_ACTIVE_PROJECT_MUTATION = gql`
  mutation ChangeActiveProject($projectId: String!) {
    changeActiveProject(projectId: $projectId) {
      id
      name
      isActive
      createdAt
    }
  }
`

const LIST_PROJECTS_QUERY = gql`
  query ListProjects {
    listProjects {
      id
      name
      isActive
      createdAt
    }
  }
`

const CHECK_PROJECT_NAME_AVAILABILITY_QUERY = gql`
  query IsProjectNameTaken($name: String!) {
    isProjectNameTaken(name: $name)
  }
`

type ProjectState = {
  projects: Project[]
  activeProject: Project | null
  loading: boolean
}

type ProjectAction =
  | {
      type: typeof ADD_PROJECT
      payload: Project
    }
  | { type: typeof LIST_PROJECTS; payload: Project[] }
  | { type: typeof CHANGE_ACTIVE_PROJECT; payload: string }
  | FormActions

export const ProjectContext = createContext<IProjectContext>({
  projects: [],
  activeProject: null,
  createProject: () => {},
  changeActiveProject: () => {},
  isProjectNameTaken: async () => false,
  processing: () => {},
  listProjects: () => {},
  loading: false
})

const ProjectProvider: React.FC<ProviderProps> = ({ children }) => {
  const [create] = useMutation(CREATE_PROJECT_MUTATION, {
    onCompleted: ({ createProject }) => {
      dispatch({
        type: ADD_PROJECT,
        payload: createProject
      })
    }
  })

  const [changeActive] = useMutation(CHANGE_ACTIVE_PROJECT_MUTATION, {
    onCompleted: ({ changeActiveProject }) => {
      dispatch({
        type: CHANGE_ACTIVE_PROJECT,
        payload: changeActiveProject.id
      })
    }
  })

  const [checkProjectNameAvailability] = useLazyQuery(
    CHECK_PROJECT_NAME_AVAILABILITY_QUERY
  )

  const [listProjects] = useLazyQuery(LIST_PROJECTS_QUERY, {
    onCompleted: ({ listProjects }) => {
      dispatch({
        type: LIST_PROJECTS,
        payload: listProjects
      })
    }
  })

  const [state, dispatch] = useReducer(
    (state: ProjectState, action: ProjectAction) => {
      switch (action.type) {
        case ADD_PROJECT:
          return {
            ...state,
            activeProject: action.payload,
            projects: [...state.projects, action.payload],
            loading: false
          }
        case LIST_PROJECTS:
          return {
            ...state,
            projects: action.payload,
            activeProject:
              action.payload.find(project => project.isActive) || null,
            loading: false
          }
        case CHANGE_ACTIVE_PROJECT:
          return {
            ...state,
            activeProject:
              state.projects.find(project => project.id === action.payload) ||
              null,
            loading: false
          }
        case LOADING:
          return {
            ...state,
            loading: true
          }
        case LOADED:
          return {
            ...state,
            loading: false
          }
        default:
          return state
      }
    },
    { projects: [], activeProject: null, loading: false }
  )

  const actions = useMemo(
    () => ({
      createProject: async (name: string) => {
        dispatch({ type: LOADING })

        create({ variables: { name } })
      },
      changeActiveProject: async (projectId: string) => {
        dispatch({ type: LOADING })

        changeActive({
          variables: { projectId }
        })
      },
      isProjectNameTaken: async (name: string) => {
        const {
          data: { isProjectNameTaken }
        } = await checkProjectNameAvailability({
          variables: { name }
        })
        return isProjectNameTaken
      },
      listProjects: () => {
        dispatch({ type: LOADING })

        listProjects()
      },
      processing: () => dispatch({ type: LOADING })
    }),
    [create, changeActive, checkProjectNameAvailability, listProjects]
  )

  return (
    <ProjectContext.Provider value={{ ...state, ...actions }}>
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectProvider
