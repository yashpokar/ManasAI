import { Event, EventWithPayload } from '@manasai/common'

export interface Socket {
  emit: (event: Event | EventWithPayload<unknown>) => void
}
