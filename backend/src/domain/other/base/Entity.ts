import { Id } from './Id';
import { Event } from './Event';

export abstract class Entity<T extends Id> {
  private events: Event[] = [];

  constructor(public id: T) {}

  protected addEvent(...event: Event[]) {
    this.events.push(...event);
  }

  getEvents(): Event[] {
    const events = [...this.events];
    this.events = [];
    return events;
  }

  equals(entityOrId: Entity<T> | T): boolean {
    if (!entityOrId) {
      return false;
    }
    if ('id' in entityOrId) {
      return this.id && this.id.equals(entityOrId.id as T);
    }
    return this.id && this.id.equals(entityOrId);
  }
}
