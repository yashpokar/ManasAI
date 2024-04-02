import { Event, EventWithPayload } from '@manasai/events'

export interface HandlerOptions {
  emit: (event: Event | EventWithPayload<unknown>) => void
}
