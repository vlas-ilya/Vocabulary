import { WordSetId } from '../domain/other/word/WordSet.entity';
import { CreateNewLessonService } from '../domain/services/CreateNewLesson/CreateNewLessonService';
import { StudentId } from '../domain/core/student/Student.entity';
import { TeacherId } from '../domain/core/teacher/Teacher.entity';
import { Maybe } from '../domain/other/base/Maybe';

export interface CreateLessonServiceRepository {
  getModel(studentId: StudentId, teacherId: Maybe<TeacherId>, wordSetId: WordSetId): Promise<CreateNewLessonService>;
}
