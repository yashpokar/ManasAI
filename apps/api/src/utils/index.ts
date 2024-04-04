import path from 'path'
import { WORKSPACE_DIR } from '../core/config'

export const getWorkspaceDir = () => {
  if (WORKSPACE_DIR.startsWith('/')) {
    return WORKSPACE_DIR
  }

  return path.join(__dirname, '../../../../', WORKSPACE_DIR)
}

export const getWorkspacePath = (workspaceId: string) => {
  return path.join(getWorkspaceDir(), workspaceId)
}

export const getFilepath = (workspaceId: string, filename: string) => {
  return path.join(getWorkspacePath(workspaceId), filename)
}
