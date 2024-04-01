import { Event, Workspace } from '@manasai/events'

class WorkspaceEventsListener {
  public async onWorkspaceCreated(workspace: Event<Workspace>) {
    console.log('Workspace created', workspace)
  }

  public async onWorkspaceUpdated(workspace: Event<Workspace>) {
    console.log('Workspace updated', workspace)
  }

  public async onWorkspaceDeleted(workspace: Event<Workspace>) {
    console.log('Workspace deleted', workspace)
  }
}

export default WorkspaceEventsListener
