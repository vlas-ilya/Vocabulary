import { WordSetDao } from '../../infrastructure-interfaces/dao/WordSetDao';
import { WordSetDto } from '../../infrastructure-interfaces/dao/dto/WordSetDto';
import { Optional } from '../../utils/Optional';

export class WordSetDaoImpl implements WordSetDao {
  data = {} as {
    [key: string]: WordSetDto;
  };

  async findById(id: String): Promise<Optional<WordSetDto>> {
    return new Optional(this.data['' + id]);
  }

  async list(): Promise<WordSetDto[]> {
    return Object.values(this.data);
  }

  async save(object: WordSetDto): Promise<void> {
    this.data['' + object.id] = object;
  }
}
