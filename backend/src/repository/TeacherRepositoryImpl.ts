import { TeacherRepository } from '../repository-interfaces/TeacherRepository';
import { UserDao } from '../infrastructure-interfaces/dao/UserDao';
import { Teacher, TeacherId } from '../domain/core/teacher/Teacher.entity';
import { WordSetDao } from '../infrastructure-interfaces/dao/WordSetDao';
import { UserDto } from '../infrastructure-interfaces/dao/dto/UserDto';
import { EntityNotFoundById } from '../repository-interfaces/errors/EntityNotFoundById';
import { RandomIdGenerator } from '../utils/RandomIdGenerator';

export class TeacherRepositoryImpl implements TeacherRepository {
  constructor(
    private readonly userDao: UserDao,
    private readonly wordDao: WordSetDao,
    private readonly randomIdGenerator: RandomIdGenerator,
  ) {}

  async getModel(id: TeacherId): Promise<Teacher | null> {
    const teacherDto = (await this.userDao.findById(id.value)).orThrow(new EntityNotFoundById('Teacher', id));

    const students = await Promise.all(
      teacherDto.studentIds.map((id) =>
        this.userDao.findById(id).then((item) => item.orThrow(new EntityNotFoundById('Student', id))),
      ),
    );

    const wordSets = await Promise.all(
      teacherDto.wordSetIds.map((id) =>
        this.wordDao.findById(id).then((item) => item.orThrow(new EntityNotFoundById('WordSet', id))),
      ),
    );

    return UserDto.convertToTeacher(teacherDto, students, wordSets, this.randomIdGenerator);
  }
}
