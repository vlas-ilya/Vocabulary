import { Processor } from './common/Processor';
import { Student, StudentId } from '../domain/core/student/Student.entity';

export interface StudentProcessor extends Processor<StudentId, Student> {}
