export * from './message'
export * from './workspace'

export type EventTypes =
  | 'WORKSPACE_CREATED'
  | 'WORKSPACE_DELETED'
  | 'WORKSPACE_CHANGED'
  | 'MESSAGE_RECEIVED'

export interface Event<T> {
  type: EventTypes
  payload: T
}
