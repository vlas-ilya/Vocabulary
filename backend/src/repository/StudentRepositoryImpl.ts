import { StudentRepository } from '../repository-interfaces/StudentRepository';
import { UserDao } from '../infrastructure-interfaces/dao/UserDao';
import { Student, StudentId } from '../domain/core/student/Student.entity';
import { WordSetDao } from '../infrastructure-interfaces/dao/WordSetDao';
import { UserDto } from '../infrastructure-interfaces/dao/dto/UserDto';
import { EntityNotFoundById } from '../repository-interfaces/errors/EntityNotFoundById';
import { RandomIdGenerator } from '../utils/RandomIdGenerator';

export class StudentRepositoryImpl implements StudentRepository {
  constructor(
    private readonly userDao: UserDao,
    private readonly wordDao: WordSetDao,
    private readonly randomIdGenerator: RandomIdGenerator,
  ) {}

  async getModel(id: StudentId): Promise<Student> {
    const studentDto = (await this.userDao.findById(id.value)).orThrow(new EntityNotFoundById('Student', id));

    const wordSetsDto = await Promise.all(
      studentDto.wordSetIds.map((id) =>
        this.wordDao.findById(id).then((item) => item.orThrow(new EntityNotFoundById('WordSet', id))),
      ),
    );

    return await UserDto.convertToStudent(studentDto, wordSetsDto, this.randomIdGenerator);
  }
}
