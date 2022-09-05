import { Processor } from './common/Processor';
import { Lesson, LessonId } from '../domain/core/lesson/Lesson.entity';
import { WordSetId } from '../domain/other/word/WordSet.entity';
import { TeacherId } from '../domain/core/teacher/Teacher.entity';
import { StudentId } from '../domain/core/student/Student.entity';

export interface LessonProcessor extends Processor<LessonId, Lesson> {
  startNewLesson(studentId: StudentId, teacherId: TeacherId, wordSetId: WordSetId): Promise<LessonId>;
}
