import { LessonDao } from '../../infrastructure-interfaces/dao/LessonDao';
import { LessonDto } from '../../infrastructure-interfaces/dao/dto/LessonDto';
import { Optional } from '../../utils/Optional';

export class LessonDaoImpl implements LessonDao {
  data = {} as {
    [key: string]: LessonDto;
  };

  async findById(id: String): Promise<Optional<LessonDto>> {
    return new Optional(this.data['' + id]);
  }

  async list(): Promise<LessonDto[]> {
    return Object.values(this.data);
  }

  async save(object: LessonDto): Promise<void> {
    this.data['' + object.id] = object;
  }
}
