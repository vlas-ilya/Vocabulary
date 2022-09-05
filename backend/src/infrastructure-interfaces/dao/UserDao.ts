import { Dao } from './common/Dao';
import { UserDto } from './dto/UserDto';

export interface UserDao extends Dao<UserDto> {}
