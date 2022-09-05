import { Event } from '../../domain/other/base/Event';
import { EventHandler } from './handlers/EventHandler';

export interface EventHandlerProvider {
  get<E extends Event>(event: E): EventHandler<E>;
}
