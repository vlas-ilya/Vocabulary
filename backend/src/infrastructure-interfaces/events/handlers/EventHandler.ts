import { Event } from '../../../domain/other/base/Event';

export interface EventHandler<T extends Event> {
  handle(event: T): Promise<void>;
}
