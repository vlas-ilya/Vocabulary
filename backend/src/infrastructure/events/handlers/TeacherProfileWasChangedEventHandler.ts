import { EventHandler } from '../../../infrastructure-interfaces/events/handlers/EventHandler';
import { TeacherProfileWasChangedEvent } from '../../../domain/core/teacher/events/TeacherProfileWasChanged.event';
import { UserDao } from '../../../infrastructure-interfaces/dao/UserDao';
import { EntityNotFoundById } from '../../../repository-interfaces/errors/EntityNotFoundById';
import { ConvertingError } from '../../../repository-interfaces/errors/ConvertingError';
import { ProfileDto } from '../../../infrastructure-interfaces/dao/dto/ProfileDto';

export class TeacherProfileWasChangedEventHandler implements EventHandler<TeacherProfileWasChangedEvent> {
  constructor(private readonly userDao: UserDao) {}

  async handle(event: TeacherProfileWasChangedEvent): Promise<void> {
    const userDto = (await this.userDao.findById(event.teacherId.value)).orThrow(
      new EntityNotFoundById('Teacher', event.teacherId),
    );
    if (userDto.type != 'Student') {
      throw new ConvertingError('entityHasIncorrectType', 'Teacher', event.teacherId);
    }
    userDto.profile = new ProfileDto(event.profile.name.value, event.profile.gender.value, event.profile.age.value);
    await this.userDao.save(userDto);
  }
}
