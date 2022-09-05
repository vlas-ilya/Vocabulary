import { AddStudentToTeacherServiceRepository } from '../repository-interfaces/AddStudentToTeacherServiceRepository';
import { StudentId } from '../domain/core/student/Student.entity';
import { TeacherId } from '../domain/core/teacher/Teacher.entity';
import { AddStudentToTeacherService } from '../domain/services/AddStudentToTeacher/AddStudentToTeacherService';
import { UserDao } from '../infrastructure-interfaces/dao/UserDao';
import { UserDto } from '../infrastructure-interfaces/dao/dto/UserDto';
import { EntityNotFoundById } from '../repository-interfaces/errors/EntityNotFoundById';
import { WordSetDao } from '../infrastructure-interfaces/dao/WordSetDao';
import { RandomIdGenerator } from '../utils/RandomIdGenerator';

export class AddStudentToTeacherServiceRepositoryImpl implements AddStudentToTeacherServiceRepository {
  constructor(
    private readonly userDao: UserDao,
    private readonly wordSetDao: WordSetDao,
    private readonly randomIdGenerator: RandomIdGenerator,
  ) {}

  async getModel(teacherId: TeacherId, studentId: StudentId): Promise<AddStudentToTeacherService> {
    const teacherDto = (await this.userDao.findById(teacherId.value)).orThrow(
      new EntityNotFoundById('Teacher', teacherId),
    );

    const teacherStudentsDto = await Promise.all(
      teacherDto.studentIds.map((studentId) =>
        this.userDao
          .findById(studentId)
          .then((student) => student.orThrow(new EntityNotFoundById('Student', studentId))),
      ),
    );

    const teacherWordSetsDto = await Promise.all(
      teacherDto.wordSetIds.map((wordSetId) =>
        this.wordSetDao
          .findById(wordSetId)
          .then((wordSet) => wordSet.orThrow(new EntityNotFoundById('WordSet', wordSetId))),
      ),
    );

    const teacher = UserDto.convertToTeacher(
      teacherDto,
      teacherStudentsDto,
      teacherWordSetsDto,
      this.randomIdGenerator,
    );

    const student = (await this.userDao.findById(studentId.value))
      .map(UserDto.convertToStudentForTeacher)
      .orThrow(new EntityNotFoundById('Student', studentId));

    return new AddStudentToTeacherService(teacher, student);
  }
}
