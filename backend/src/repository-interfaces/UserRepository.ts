import { Repository } from './common/Repository';
import { User, UserId } from '../domain/core/user/User.entity';

export interface UserRepository extends Repository<UserId, User> {}
