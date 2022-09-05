import { LessonWasCreatedEvent } from '../../../domain/services/CreateNewLesson/events/LessonWasCreatedEvent';
import { EventHandler } from '../../../infrastructure-interfaces/events/handlers/EventHandler';
import { LessonDao } from '../../../infrastructure-interfaces/dao/LessonDao';
import { LessonDto } from '../../../infrastructure-interfaces/dao/dto/LessonDto';

export class LessonWasCreatedEventHandler implements EventHandler<LessonWasCreatedEvent> {
  private readonly lessonDao: LessonDao;

  constructor(lessonDao: LessonDao) {
    this.lessonDao = lessonDao;
  }

  async handle(event: LessonWasCreatedEvent): Promise<void> {
    await this.lessonDao.save(
      new LessonDto(event.lessonId.value, event.student.id.value, event.teacher?.id?.value, event.wordSet.id.value),
    );
  }
}
