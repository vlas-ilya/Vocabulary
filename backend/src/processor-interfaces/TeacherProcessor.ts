import { Processor } from './common/Processor';
import { Teacher, TeacherId } from '../domain/core/teacher/Teacher.entity';
import { StudentId } from '../domain/core/student/Student.entity';

export interface TeacherProcessor extends Processor<TeacherId, Teacher> {
  addStudent(teacherId: TeacherId, studentId: StudentId): Promise<void>;
}
