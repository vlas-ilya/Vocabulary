import { TrainingDao } from '../../infrastructure-interfaces/dao/TrainingDao';
import { TrainingDto } from '../../infrastructure-interfaces/dao/dto/TrainingDto';
import { Optional } from '../../utils/Optional';

export class TrainingDaoImpl implements TrainingDao {
  data = {} as {
    [key: string]: TrainingDto;
  };

  async findById(id: String): Promise<Optional<TrainingDto>> {
    return new Optional(this.data['' + id]);
  }

  async list(): Promise<TrainingDto[]> {
    return Object.values(this.data);
  }

  async save(object: TrainingDto): Promise<void> {
    this.data['' + object.id] = object;
  }
}
