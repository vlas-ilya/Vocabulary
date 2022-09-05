import { CreateLessonServiceRepository } from '../repository-interfaces/CreateLessonServiceRepository';
import { WordSetId } from '../domain/other/word/WordSet.entity';
import { RandomIdGenerator } from '../utils/RandomIdGenerator';
import { CreateNewLessonService } from '../domain/services/CreateNewLesson/CreateNewLessonService';
import { StudentId } from '../domain/core/student/Student.entity';
import { TeacherId } from '../domain/core/teacher/Teacher.entity';
import { WordSetDao } from '../infrastructure-interfaces/dao/WordSetDao';
import { UserDao } from '../infrastructure-interfaces/dao/UserDao';
import { EntityNotFoundById } from '../repository-interfaces/errors/EntityNotFoundById';
import { StudentForLesson } from '../domain/core/lesson/entities/StudentForLesson.entity';
import { TeacherForLesson } from '../domain/core/lesson/entities/TeacherForLesson.entity';
import { UserDto } from '../infrastructure-interfaces/dao/dto/UserDto';
import { WordSetDto } from '../infrastructure-interfaces/dao/dto/WordSetDto';
import { Maybe } from '../domain/other/base/Maybe';

export class CreateLessonServiceRepositoryImpl implements CreateLessonServiceRepository {
  constructor(
    private readonly userDao: UserDao,
    private readonly wordDao: WordSetDao,
    private readonly randomIdGenerator: RandomIdGenerator,
  ) {}

  async getModel(
    studentId: StudentId,
    teacherId: Maybe<TeacherId>,
    wordSetId: WordSetId,
  ): Promise<CreateNewLessonService> {
    let student = await this.getStudent(studentId);
    let teacher = await this.getTeacher(teacherId);
    let wordSet = await this.getWordSet(wordSetId);

    return new CreateNewLessonService(student, teacher, wordSet, this.randomIdGenerator);
  }

  private async getStudent(id: StudentId): Promise<StudentForLesson> {
    return (await this.userDao.findById(id.value))
      .map(UserDto.convertToStudentForLesson)
      .orThrow(new EntityNotFoundById('Student', id));
  }

  private async getTeacher(id: Maybe<TeacherId>): Promise<TeacherForLesson | undefined> {
    if (!id) {
      return undefined;
    }
    return (await this.userDao.findById(id.value))
      .map(UserDto.convertToTeacherForLesson)
      .orThrow(new EntityNotFoundById('Teacher', id));
  }

  private async getWordSet(id: WordSetId) {
    return (await this.wordDao.findById(id.value))
      .map(WordSetDto.convertToEntity)
      .orThrow(new EntityNotFoundById('WordSet', id));
  }
}
