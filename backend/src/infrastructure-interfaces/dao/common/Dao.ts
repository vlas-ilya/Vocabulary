import { Dto } from './Dto';
import { Optional } from '../../../utils/Optional';

export interface Dao<T extends Dto> {
  save(object: T): Promise<void>;
  findById(id: String): Promise<Optional<T>>;
  list(): Promise<T[]>;
}
