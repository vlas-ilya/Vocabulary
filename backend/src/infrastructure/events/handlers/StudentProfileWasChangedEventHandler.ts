import { EventHandler } from '../../../infrastructure-interfaces/events/handlers/EventHandler';
import { StudentProfileWasChangedEvent } from '../../../domain/core/student/events/StudentProfileWasChanged.event';
import { UserDao } from '../../../infrastructure-interfaces/dao/UserDao';
import { EntityNotFoundById } from '../../../repository-interfaces/errors/EntityNotFoundById';
import { ConvertingError } from '../../../repository-interfaces/errors/ConvertingError';
import { ProfileDto } from '../../../infrastructure-interfaces/dao/dto/ProfileDto';

export class StudentProfileWasChangedEventHandler implements EventHandler<StudentProfileWasChangedEvent> {
  constructor(private readonly userDao: UserDao) {}

  async handle(event: StudentProfileWasChangedEvent): Promise<void> {
    const userDto = (await this.userDao.findById(event.studentId.value)).orThrow(
      new EntityNotFoundById('Student', event.studentId),
    );
    if (userDto.type != 'Student') {
      throw new ConvertingError('entityHasIncorrectType', 'Student', event.studentId);
    }
    userDto.profile = new ProfileDto(event.profile.name.value, event.profile.gender.value, event.profile.age.value);
    await this.userDao.save(userDto);
  }
}
