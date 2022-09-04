import { BaseEvent } from '../base/BaseEvent';
import { BaseEntity } from '../base/BaseEntity';
import { BaseId } from '../base/BaseId.vo';
import { Student } from './Student.e';
import { Teacher } from './Teacher.e';
import { Word } from './Word.e';

export class Lesson extends BaseEntity<LessonId> {
  private readonly student: Student;
  private readonly teacher?: Teacher;
  private readonly words: Word[];
  private readonly owner: 'Student' | 'Teacher';
}

export class LessonId extends BaseId {}
