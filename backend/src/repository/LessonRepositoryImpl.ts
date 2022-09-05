import { Lesson, LessonId } from '../domain/core/lesson/Lesson.entity';
import { LessonRepository } from '../repository-interfaces/LessonRepository';
import { LessonDao } from '../infrastructure-interfaces/dao/LessonDao';
import { UserDao } from '../infrastructure-interfaces/dao/UserDao';
import { RandomIdGenerator } from '../utils/RandomIdGenerator';
import { WordSetDao } from '../infrastructure-interfaces/dao/WordSetDao';
import { EntityNotFoundById } from '../repository-interfaces/errors/EntityNotFoundById';
import { LessonDto } from '../infrastructure-interfaces/dao/dto/LessonDto';

export class LessonRepositoryImpl implements LessonRepository {
  constructor(
    private readonly lessonDao: LessonDao,
    private readonly userDao: UserDao,
    private readonly wordDao: WordSetDao,
    private readonly randomIdGenerator: RandomIdGenerator,
  ) {}

  async getModel(id: LessonId): Promise<Lesson> {
    const lessonDto = (await this.lessonDao.findById(id.value)).orThrow(new EntityNotFoundById('Lesson', id));

    const studentDto = (await this.userDao.findById(lessonDto.studentId)).orThrow(
      new EntityNotFoundById('Student', lessonDto.studentId),
    );

    const teacherDto = lessonDto.teacherId
      ? (await this.userDao.findById(lessonDto.teacherId)).orThrow(
          new EntityNotFoundById('Teacher', lessonDto.teacherId),
        )
      : null;

    const wordSetDto = (await this.wordDao.findById(lessonDto.wordSetId)).orThrow(
      new EntityNotFoundById('WordSet', lessonDto.wordSetId),
    );

    return LessonDto.convertToEntity(lessonDto, studentDto, teacherDto, wordSetDto, this.randomIdGenerator);
  }
}
