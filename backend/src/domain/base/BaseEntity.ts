import { BaseId } from './BaseId.vo';
import { BaseEvent } from './BaseEvent';

export class BaseEntity<T extends BaseId> {
  public id: T;

  constructor(id: T) {
    this.id = id;
  }

  private events: BaseEvent[] = [];

  addEvent(event: BaseEvent) {
    this.events.push(event);
  }

  getEvents(): BaseEvent[] {
    const events = [...this.events];
    this.events = [];
    return events;
  }

  equals(entityOrId: BaseEntity<T> | T): boolean {
    if (!entityOrId) {
      return false;
    }
    if ('id' in entityOrId) {
      return this.id && this.id.equals(entityOrId.id as T);
    }
    return this.id && this.id.equals(entityOrId);
  }
}
