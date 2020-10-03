import { Event } from '@provider/EventsEmiter';
import { User } from '@models/User';

export default new (class Events {
  constructor() {
    this.init();
  }

  public init() {
    Event.on('new:user', (user: User) => {
      console.log('Event::new:user', user);
    });
  }
})();
