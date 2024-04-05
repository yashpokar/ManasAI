export type EventTypes =
  | 'WORKSPACE_CREATED'
  | 'WORKSPACE_DELETED'
  | 'WORKSPACE_CHANGED'
  | 'MESSAGE_RECEIVED'
  | 'TERMINAL_COMMAND_RUNNING_STARTED'
  | 'TERMINAL_COMMAND_RUNNING_ENDED'
  | 'EDITOR_CODE_CHANGED'
  | 'READY'
  | 'CONNECTED'
  | 'DISCONNECTED'

export interface Event {
  type: EventTypes
}

export interface EventWithPayload<T> extends Event {
  payload: T
}
