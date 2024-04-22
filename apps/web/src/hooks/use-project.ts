import { useContext } from 'react'
import { ProjectContext } from '@/providers/ProjectProvider'
import { IProjectContext } from '@/types'

const useProject = (): IProjectContext => {
  const context = useContext(ProjectContext)

  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider')
  }

  return context
}

export default useProject
