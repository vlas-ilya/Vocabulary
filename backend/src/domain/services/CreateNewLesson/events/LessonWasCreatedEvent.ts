import { Event } from '../../../other/base/Event';
import { LessonId } from '../../../core/lesson/Lesson.entity';
import { WordSet } from '../../../other/word/WordSet.entity';
import { StudentForLesson } from '../../../core/lesson/entities/StudentForLesson.entity';
import { TeacherForLesson } from '../../../core/lesson/entities/TeacherForLesson.entity';
import { Maybe } from '../../../other/base/Maybe';

export class LessonWasCreatedEvent extends Event {
  constructor(
    public readonly lessonId: LessonId,
    public readonly student: StudentForLesson,
    public readonly teacher: Maybe<TeacherForLesson>,
    public readonly wordSet: WordSet,
  ) {
    super('LessonWasCreatedEvent');
  }
}
