import { StudentId } from '../domain/core/student/Student.entity';
import { TeacherId } from '../domain/core/teacher/Teacher.entity';
import { AddStudentToTeacherService } from '../domain/services/AddStudentToTeacher/AddStudentToTeacherService';

export interface AddStudentToTeacherServiceRepository {
  getModel(teacherId: TeacherId, studentId: StudentId): Promise<AddStudentToTeacherService>;
}
