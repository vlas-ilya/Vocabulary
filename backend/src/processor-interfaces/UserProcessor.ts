import { Processor } from './common/Processor';
import { User, UserId } from '../domain/core/user/User.entity';

export interface UserProcessor extends Processor<UserId, User> {}
