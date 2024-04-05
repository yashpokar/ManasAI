import { EventWithPayload } from './types'

export interface EditorCodeChangedEvent
  extends EventWithPayload<{
    code: string
  }> {
  type: 'EDITOR_CODE_CHANGED'
}
