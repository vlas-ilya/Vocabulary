import { UserProcessor } from '../processor-interfaces/UserProcessor';
import { User, UserId } from '../domain/core/user/User.entity';
import { EventDispatcher } from '../infrastructure-interfaces/events/EventDispatcher';
import { UserRepository } from '../repository-interfaces/UserRepository';

export class UserProcessorImpl implements UserProcessor {
  constructor(private readonly repository: UserRepository, private readonly eventDispatcher: EventDispatcher) {}

  async process<RESULT>(id: UserId, fun: (entity: User) => RESULT): Promise<RESULT> {
    const user = await this.repository.getModel(id);
    const result = fun(user);
    await this.eventDispatcher.dispatch(...user.getEvents());
    return result;
  }
}
