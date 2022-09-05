import { DomainService } from '../../other/base/DomainService';
import { LessonId } from '../../core/lesson/Lesson.entity';
import { RandomIdGenerator } from '../../../utils/RandomIdGenerator';
import { WordSet } from '../../other/word/WordSet.entity';
import { LessonWasCreatedEvent } from './events/LessonWasCreatedEvent';
import { StudentForLesson } from '../../core/lesson/entities/StudentForLesson.entity';
import { TeacherForLesson } from '../../core/lesson/entities/TeacherForLesson.entity';
import { WordSetWasClonedEvent } from '../../other/word/events/WordSetWasCloned.event';
import { WordSetWasCreatedEvent } from '../../other/word/events/WordSetWasCreated.event';
import { Maybe } from '../../other/base/Maybe';

export class CreateNewLessonService extends DomainService {
  constructor(
    private readonly student: StudentForLesson,
    private readonly teacher: Maybe<TeacherForLesson>,
    private readonly wordSet: WordSet,
    private readonly randomIdGenerator: RandomIdGenerator,
  ) {
    super();
  }

  createLesson(): LessonId {
    const lessonId = new LessonId(this.randomIdGenerator.random());
    const wordSet = this.wordSet.clone(this.randomIdGenerator);

    this.addEvent(
      ...this.wordSet.getEvents(),
      new WordSetWasCreatedEvent(wordSet),
      new LessonWasCreatedEvent(lessonId, this.student, this.teacher, wordSet),
    );

    return lessonId;
  }
}
