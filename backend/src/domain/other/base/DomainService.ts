import { Event } from './Event';

export abstract class DomainService {
  private events: Event[] = [];

  protected addEvent(...event: Event[]) {
    this.events.push(...event);
  }

  getEvents(): Event[] {
    const events = [...this.events];
    this.events = [];
    return events;
  }
}
