import { EventHandler } from '../../../infrastructure-interfaces/events/handlers/EventHandler';
import { StudentListWasChangedEvent } from '../../../domain/core/teacher/events/StudentListWasChanged.event';
import { UserDao } from '../../../infrastructure-interfaces/dao/UserDao';
import { EntityNotFoundById } from '../../../repository-interfaces/errors/EntityNotFoundById';
import { ConvertingError } from '../../../repository-interfaces/errors/ConvertingError';
import { UserDto } from '../../../infrastructure-interfaces/dao/dto/UserDto';

export class StudentListWasChangedEventHandler implements EventHandler<StudentListWasChangedEvent> {
  constructor(private readonly userDao: UserDao) {}

  async handle(event: StudentListWasChangedEvent): Promise<void> {
    const teacherDto = (await this.userDao.findById(event.teacherId.value)).orThrow(
      new EntityNotFoundById('Teacher', event.teacherId),
    );

    await this.validateTeacher(teacherDto);
    await this.validateStudents(event);

    teacherDto.studentIds = event.students.map((student) => student.id.value);

    await this.userDao.save(teacherDto);
  }

  private validateTeacher(teacherDto: UserDto) {
    if (teacherDto.type != 'Teacher') {
      throw new ConvertingError('entityHasIncorrectType', 'Teacher', teacherDto.id);
    }
  }

  private async validateStudents(event: StudentListWasChangedEvent) {
    await Promise.all(
      event.students.map((student) =>
        this.userDao
          .findById(student.id.value)
          .then((userDto) => userDto.orThrow(new EntityNotFoundById('Student', student.id)))
          .then((userDto) => {
            if (userDto.type != 'Student') {
              throw new ConvertingError('entityHasIncorrectType', 'Student', student.id);
            }
            return userDto;
          }),
      ),
    );
  }
}
