import { Event, EventWithPayload } from '@manasai/events'

export interface Socket {
  emit: (event: Event | EventWithPayload<unknown>) => void
}
