import { UserRepository } from '../repository-interfaces/UserRepository';
import { UserDao } from '../infrastructure-interfaces/dao/UserDao';
import { User, UserId } from '../domain/core/user/User.entity';
import { EntityNotFoundById } from '../repository-interfaces/errors/EntityNotFoundById';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDao: UserDao) {}

  async getModel(id: UserId): Promise<User> {
    const userDto = (await this.userDao.findById(id.value)).orThrow(new EntityNotFoundById('User', id));
    return new User(new UserId(userDto.id));
  }
}
