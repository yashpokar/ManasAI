import React, { createContext, useCallback, useContext, useState } from 'react'
import { Workspace } from '../types'

interface WorkspaceContextProps {
  workspaces: Workspace[]
  activeWorkspace?: Workspace
  addWorkspace: (workspace: Workspace) => void
  onWorkspaceChange: (id: string) => void
  isNameTaken: (name: string) => boolean
}

interface WorkspaceProviderProps {
  children: React.ReactNode
}

const WorkspaceContext = createContext<WorkspaceContextProps>({
  workspaces: [],
  addWorkspace: () => null,
  onWorkspaceChange: () => null,
  isNameTaken: () => false
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
  }, [])

  const isNameTaken = useCallback(
    (name: string) => {
      return workspaces.some(w => w.name === name)
    },
    [workspaces]
  )

  const context: WorkspaceContextProps = {
    workspaces,
    addWorkspace,
    onWorkspaceChange,
    isNameTaken
  }

  if (activeWorkspaceId) {
    context.activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId)
  }

  return (
    <WorkspaceContext.Provider value={context}>
      {children}
    </WorkspaceContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWorkspace = () => {
  const context = useContext(WorkspaceContext)

  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider')
  }

  return context
}