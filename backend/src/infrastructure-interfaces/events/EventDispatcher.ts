import { Event } from '../../domain/other/base/Event';

export interface EventDispatcher {
  dispatch(...events: Event[]): Promise<void>;
}
