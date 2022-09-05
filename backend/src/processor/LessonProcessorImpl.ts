import { LessonRepository } from '../repository-interfaces/LessonRepository';
import { EventDispatcher } from '../infrastructure-interfaces/events/EventDispatcher';
import { LessonProcessor } from '../processor-interfaces/LessonProcessor';
import { WordSetId } from '../domain/other/word/WordSet.entity';
import { LessonId } from '../domain/core/lesson/Lesson.entity';
import { CreateLessonServiceRepository } from '../repository-interfaces/CreateLessonServiceRepository';
import { StudentId } from '../domain/core/student/Student.entity';
import { TeacherId } from '../domain/core/teacher/Teacher.entity';
import { Maybe } from '../domain/other/base/Maybe';

export class LessonProcessorImpl implements LessonProcessor {
  constructor(
    private readonly repository: LessonRepository,
    private readonly createLessonServiceRepository: CreateLessonServiceRepository,
    private readonly eventDispatcher: EventDispatcher,
  ) {}

  async process<RESULT>(id, fun: (item) => RESULT): Promise<RESULT> {
    const lesson = await this.repository.getModel(id);
    const result = fun(lesson);
    await this.eventDispatcher.dispatch(...lesson.getEvents());
    return result;
  }

  async startNewLesson(studentId: StudentId, teacherId: Maybe<TeacherId>, wordSetId: WordSetId): Promise<LessonId> {
    const createLessonService = await this.createLessonServiceRepository.getModel(studentId, teacherId, wordSetId);
    const lessonId = createLessonService.createLesson();
    await this.eventDispatcher.dispatch(...createLessonService.getEvents());
    return lessonId;
  }
}
