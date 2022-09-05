import { Repository } from './common/Repository';
import { Lesson, LessonId } from '../domain/core/lesson/Lesson.entity';

export interface LessonRepository extends Repository<LessonId, Lesson> {}
