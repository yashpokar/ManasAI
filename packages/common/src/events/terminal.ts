import { Event, EventWithPayload } from './types'
import { DeviceMetadata } from './workspace'

interface TerminalCommandRunningStartedPayload {
  command: string
}

interface TerminalCommandRunningEndedPayload {
  output: string
}

export interface TerminalCommandRunningStartedEvent
  extends EventWithPayload<TerminalCommandRunningStartedPayload> {
  type: 'TERMINAL_COMMAND_RUNNING_STARTED'
}

export interface TerminalCommandRunningEndedEvent
  extends EventWithPayload<TerminalCommandRunningEndedPayload> {
  type: 'TERMINAL_COMMAND_RUNNING_ENDED'
}
