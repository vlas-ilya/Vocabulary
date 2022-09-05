import { TrainingRepository } from '../repository-interfaces/TrainingRepository';
import { TrainingDao } from '../infrastructure-interfaces/dao/TrainingDao';
import { Training, TrainingId } from '../domain/core/training/Training.entity';
import { UserDao } from '../infrastructure-interfaces/dao/UserDao';
import { WordSetDao } from '../infrastructure-interfaces/dao/WordSetDao';
import { RandomIdGenerator } from '../utils/RandomIdGenerator';
import { EntityNotFoundById } from '../repository-interfaces/errors/EntityNotFoundById';
import { RandomSequenceGenerator } from '../domain/core/training/utils/RandomSequenceGenerator';
import { TrainingDto } from '../infrastructure-interfaces/dao/dto/TrainingDto';

export class TrainingRepositoryImpl implements TrainingRepository {
  constructor(
    private readonly trainingDao: TrainingDao,
    private readonly userDao: UserDao,
    private readonly wordDao: WordSetDao,
    private readonly randomIdGenerator: RandomIdGenerator,
    private readonly randomizer: RandomSequenceGenerator,
  ) {}

  async getModel(id: TrainingId): Promise<Training> {
    const trainingDto = (await this.trainingDao.findById(id.value)).orThrow(new EntityNotFoundById('Training', id));

    const studentDto = (await this.userDao.findById(trainingDto.studentId)).orThrow(
      new EntityNotFoundById('Student', trainingDto.studentId),
    );

    const teacherDto = trainingDto.teacherId
      ? (await this.userDao.findById(trainingDto.teacherId)).orThrow(
          new EntityNotFoundById('Teacher', trainingDto.teacherId),
        )
      : null;

    const wordSetDto = (await this.wordDao.findById(trainingDto.wordSetId)).orThrow(
      new EntityNotFoundById('WordSet', trainingDto.wordSetId),
    );

    return TrainingDto.convertToEntity(trainingDto, studentDto, teacherDto, wordSetDto, this.randomizer);
  }
}
