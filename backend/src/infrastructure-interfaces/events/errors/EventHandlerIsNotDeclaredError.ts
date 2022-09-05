import { Error } from '../../../utils/Error';
import { Event } from '../../../domain/other/base/Event';

export class EventHandlerIsNotDeclaredError extends Error {
  constructor(event: Event) {
    super();
  }
}
