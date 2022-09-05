import { EventDispatcher } from '../../infrastructure-interfaces/events/EventDispatcher';
import { Event } from '../../domain/other/base/Event';
import { EventHandlerProvider } from '../../infrastructure-interfaces/events/EventHandlerProvider';

export class EventDispatcherImpl implements EventDispatcher {
  constructor(private readonly eventHandlerProvider: EventHandlerProvider) {}

  async dispatch<T extends Event>(...events: T[]): Promise<void> {
    await Promise.all(events.map((event) => this.eventHandlerProvider.get(event).handle(event)));
  }
}
