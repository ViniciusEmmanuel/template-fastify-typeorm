import events from 'events';

class EventsEmiter {
  constructor(private eventEmiter = new events.EventEmitter()) {}

  public on(event: string, functionAfterLister: (...args: any[]) => void) {
    this.eventEmiter.on(event, functionAfterLister);
  }

  public once(event: string, functionAfterLister: (...args: any[]) => void) {
    this.eventEmiter.once(event, functionAfterLister);
  }

  public emit(event: string, data: any = {}) {
    this.eventEmiter.emit(event, data);
  }
}

export const Event = new EventsEmiter();
