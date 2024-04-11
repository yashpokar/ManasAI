import React, { createContext, useCallback, useContext, useState } from 'react'
import { Workspace } from '../types'

interface ProjectContextProps {
  workspaces: Workspace[]
  activeWorkspace?: Workspace
  addWorkspace: (workspace: Workspace) => void
  onWorkspaceChange: (id: string) => void
  isNameTaken: (name: string) => boolean
  setWorkspaces: (workspaces: Workspace[]) => void
}

interface WorkspaceProviderProps {
  children: React.ReactNode
}

const ProjectContext = createContext<ProjectContextProps>({
  workspaces: [],
  addWorkspace: () => null,
  onWorkspaceChange: () => null,
  isNameTaken: () => false,
  setWorkspaces: () => null
})

export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({
  children
}) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>()

  const addWorkspace = useCallback((workspace: Workspace) => {
    setWorkspaces(workspaces => [...workspaces, workspace])
  }, [])

  const onWorkspaceChange = useCallback((id: string) => {
    setActiveWorkspaceId(id)

    // TODO: change it in the database as well
  }, [])

  const isNameTaken = useCallback(
    (name: string) => {
      return workspaces.some(w => w.name === name)
    },
    [workspaces]
  )

  const context: ProjectContextProps = {
    workspaces,
    addWorkspace,
    onWorkspaceChange,
    isNameTaken,
    setWorkspaces
  }

  if (activeWorkspaceId) {
    context.activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId)
  }

  return (
    <ProjectContext.Provider value={context}>
      {children}
    </ProjectContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProject = () => {
  const context = useContext(ProjectContext)

  if (context === undefined) {
    throw new Error('useProject must be used within a WorkspaceProvider')
  }

  return context
}
