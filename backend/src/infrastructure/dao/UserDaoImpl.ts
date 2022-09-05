import { UserDao } from '../../infrastructure-interfaces/dao/UserDao';
import { UserDto } from '../../infrastructure-interfaces/dao/dto/UserDto';
import { Optional } from '../../utils/Optional';

export class UserDaoImpl implements UserDao {
  data = {} as {
    [key: string]: UserDto;
  };

  async findById(id: String): Promise<Optional<UserDto>> {
    return new Optional(this.data['' + id]);
  }

  async list(): Promise<UserDto[]> {
    return Object.values(this.data);
  }

  async save(object: UserDto): Promise<void> {
    this.data['' + object.id] = object;
  }
}
