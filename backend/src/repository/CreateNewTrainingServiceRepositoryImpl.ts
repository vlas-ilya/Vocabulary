import { CreateNewTrainingServiceRepository } from '../repository-interfaces/CreateNewTrainingServiceRepository';
import { CreateNewTrainingService } from '../domain/services/CreateNewTraining/CreateNewTrainingService';
import { UserDao } from '../infrastructure-interfaces/dao/UserDao';
import { WordSetDao } from '../infrastructure-interfaces/dao/WordSetDao';
import { RandomIdGenerator } from '../utils/RandomIdGenerator';
import { RandomSequenceGenerator } from '../domain/core/training/utils/RandomSequenceGenerator';
import { StudentId } from '../domain/core/student/Student.entity';
import { TeacherId } from '../domain/core/teacher/Teacher.entity';
import { WordSetId } from '../domain/other/word/WordSet.entity';
import { UserDto } from '../infrastructure-interfaces/dao/dto/UserDto';
import { EntityNotFoundById } from '../repository-interfaces/errors/EntityNotFoundById';
import { WordSetDto } from '../infrastructure-interfaces/dao/dto/WordSetDto';
import { TrainingType } from '../domain/core/training/entities/TrainingParameters.value';
import { Maybe } from '../domain/other/base/Maybe';

export class CreateNewTrainingServiceRepositoryImpl implements CreateNewTrainingServiceRepository {
  constructor(
    private readonly userDao: UserDao,
    private readonly wordSetDao: WordSetDao,
    private readonly randomIdGenerator: RandomIdGenerator,
    private readonly randomizer: RandomSequenceGenerator,
  ) {}

  async getModel(
    studentId: StudentId,
    teacherId: Maybe<TeacherId>,
    wordSetId: WordSetId,
    trainingType: TrainingType,
  ): Promise<CreateNewTrainingService> {
    const student = (await this.userDao.findById(studentId.value))
      .map(UserDto.convertToStudentForTraining)
      .orThrow(new EntityNotFoundById('Student', studentId));

    const teacher = teacherId
      ? (await this.userDao.findById(teacherId.value))
          .map(UserDto.convertToTeacherForTraining)
          .orThrow(new EntityNotFoundById('Teacher', teacherId))
      : null;

    const wordSet = (await this.wordSetDao.findById(wordSetId.value))
      .map(WordSetDto.convertToEntity)
      .orThrow(new EntityNotFoundById('WordSet', wordSetId));

    return new CreateNewTrainingService(
      student,
      teacher,
      wordSet,
      this.randomIdGenerator,
      this.randomizer,
      trainingType,
    );
  }
}
