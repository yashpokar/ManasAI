import { EventEmitter } from 'events'

export default (event: EventEmitter) => {
  import('./workspace').then(({ default: workspace }) => workspace(event))
  import('./message').then(({ default: message }) => message(event))
}
